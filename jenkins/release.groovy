def branch = '';

pipeline {
    agent { docker { image 'docker-registry.kabala.tech/node12-with-git:latest' } }

    environment {
        app = ''
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
                    sh "npm i"
                }
            }
        }
        stage ('Release') {
            steps {
                script {
                    sshagent(['jenkins-ssh-key']) {
                        sh "git checkout ${branch}"
                        sh "npm run release -- --no-verify ${env.additionalParams}"
                        sh "git push --follow-tags origin HEAD"
                    }
                }
            }
        }
        stage ('Build Container') {
            agent any
             steps {
                script {
                    ansiColor('xterm') {
                        app = docker.build("gtms-frontend")
                    }
                }
            }
        }
        stage ('Push the image') {
            agent any
            steps {
                script {
                    ansiColor('xterm') {
                        def props = readJSON file: 'package.json'
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            app.push("${props['version']}")
                            app.push("latest")
                        }
                    }
                }
            }
        }
    }
}
