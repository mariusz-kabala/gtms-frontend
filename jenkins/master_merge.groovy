def branch = '';

pipeline {
    agent { docker { image 'docker-registry.kabala.tech/node12-with-git:latest' } }

    environment {
        GITHUB_API_KEY = credentials('jenkins-github-accesstoken')
        CI = 'true'
        AWS_ACCESS_KEY_ID = credentials('SCALEWAY_S3_ACCESS_KEY')
        AWS_SECRET_ACCESS_KEY = credentials('SCALEWAY_S3_ACCESS_SECRET_KEY') 
    }

    stages {
        stage ('prepare') {
            steps {
                script {
                    sh "printenv"
                    try {
                        branch = env.GIT_LOCAL_BRANCH
                        branch = branch ?: env.GIT_BRANCH
                        if (branch == 'detached') {
                            branch = ''
                        }
                        branch = branch ?: env.ghprbSourceBranch
                    } catch (e) {
                        println "GIT BRANCH not detected"
                    }

                    if (!branch) {
                        error "GIT branch to process not found"
                    }

                    if (branch.startsWith('origin/')) {
                        branch = branch.replaceAll('origin/', '')
                    }

                    println "GIT branch to process: ${branch}"
                    manager.addShortText(branch, "white", "navy", "1px", "navy")
                }
            }
        }
        stage ('Install dependencies') {
            steps {
                script {
                    sh "yarn"
                }
            }
        }
        
        stage ('Run unit tests') {
            steps {
                script {

                    sh "yarn test --coverage"

                }
            }

            post {
                always {
                    configFileProvider([configFile(fileId: 'scaleway-s3-config', targetLocation: 'aws-config')]) {
                        sh "mkdir ~/.aws"
                        sh "mv aws-config ~/.aws/config"
                        sh "aws s3 cp coverage s3://unittest/master/ --recursive --acl public-read"
                    }

                    echo "https://unittest.s3.nl-ams.scw.cloud/master/index.html"
                }
            }
        }

        stage ('Build styleguide') {
            steps {
                script {
                    sh "yarn styleguide:build"

                    configFileProvider([configFile(fileId: 'scaleway-s3-config', targetLocation: 'aws-config')]) {
                        sh "mkdir ~/.aws"
                        sh "mv aws-config ~/.aws/config"
                        sh "aws s3 cp styleguide s3://styleguide/master/ --recursive --acl public-read"
                    }

                    echo "https://styleguide.s3.nl-ams.scw.cloud/master/index.html"
                }
            }
        }
    }
}
