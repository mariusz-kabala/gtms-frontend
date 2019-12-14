def branch = '';

pipeline {
    agent { docker { image 'docker-registry.kabala.tech/node12-with-git:latest' } }

    environment {
        // GH_TOKEN = credentials('github-api-token')
        CI = 'true'
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
        stage ('Install dependencies') {
            steps {
                script {
                    sh "npm i"
                }
            }
        }
        stage ('Prepare a release') {
            steps {
                script {
                    sh "npm run release -- --no-verify ${env.additionalParams}"
                }
            }
        }
        stage ('Publish the new release') {
            steps {
                script {
                    sshagent(['jenkins-ssh-key']) {
                        sh "git add -A"
                        sh "npm run release -- -a --no-verify"
                        sh "git push --follow-tags origin ${env.ghprbActualCommit}"
                    }
                }
            }
        }
    }
}
