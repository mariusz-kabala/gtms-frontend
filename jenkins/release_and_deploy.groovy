def branch = '';

pipeline {
    agent { docker { image 'docker-registry.kabala.tech/node12-with-git:latest' } }
    
    environment {
        AWS_ACCESS_KEY_ID = credentials('SCALEWAY_S3_ACCESS_KEY')
        AWS_SECRET_ACCESS_KEY = credentials('SCALEWAY_S3_ACCESS_SECRET_KEY')
        CI = 'true'
        GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
    }

    stages {
        stage ('prepare') {
            steps {
                script {
                    try {
                        branch = env.GIT_LOCAL_BRANCH
                        branch = branch ?: env.GIT_BRANCH
                        if (branch == 'detached') {
                            branch = ''
                        }
                        branch = branch ?: env.ghprbActualCommit
                    } catch (e) {
                        println "GIT BRANCH not detected"
                    }

                    sh 'git config user.name "jenkins-kabala.tech"'
                    sh 'git config user.email "jenkins@kabala.tech"'

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

        stage ('Checkout') {
            steps {
                    checkout([
                            $class                           : 'GitSCM',
                            branches                         : [[name: "${branch}"]],
                            browser                          : [$class: 'GithubWeb', repoUrl: "https://github.com/mariusz-kabala/gtms-frontend"],
                            doGenerateSubmoduleConfigurations: false,
                            userRemoteConfigs                : [[
                                credentialsId: 'github',
                                refspec      : '+refs/pull/*:refs/remotes/origin/pr/*',
                                url          : "git@github.com:mariusz-kabala/gtms-frontend.git"
                            ]]
                    ])
            }
        }

        stage ('Install dependencies') {
            steps {
                script {
                    sh "npm i -g lerna"
                    sh "yarn"
                }
            }
        }

        stage ('Release') {
            steps {
                script {
                    sshagent(['jenkins-ssh-key']) {
                        sh "git checkout master"
                        sh "lerna version --no-commit-hooks"
                    }
                }
            }
        }

        stage ('Build app-andrew') {
            steps {
                script {
                    def props = readJSON file: "packages/app-andrew/package.json"
                    def currentApp = docker.build(props['name'].replace('@', '').replace('-', '').toLowerCase(), "-f packages/app-andrew/Dockerfile .")
                    docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                        currentApp.push("v${props['version']}")
                    }
                }
            }
        }

        // stage ('Deploy app-andrew') {
        //     steps {
        //         dir("packages/app-andrew/terraform") {
        //             script {
        //                 docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
        //                     sh "terraform init"
        //                     sh "terraform plan -out deploy.plan -var=\"tag=${version}\" -var=\"API_TOKEN=${DECONZ_API_TOKEN}\" -var=\"DOCKER_REGISTRY_USERNAME=${DOCKER_REGISTRY_USERNAME}\" -var=\"DOCKER_REGISTRY_PASSWORD=${DOCKER_REGISTRY_PASSWORD}\"" 
        //                     sh "terraform apply -auto-approve deploy.plan"
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}
