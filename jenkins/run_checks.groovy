def branch = '';

pipeline {
    agent { docker { image 'node:12.13-alpine' } }

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

                    if (env.BUILD_USER_ID && env.BUILD_USER_EMAIL) {
                        wrap([$class: 'BuildUser']) {
                            sh "git config user.name '${BUILD_USER_ID}'"
                            sh "git config user.email '${BUILD_USER_EMAIL}'"
                        }
                    } else {
                        sh 'git config user.name "kabala.tech-jenkins"'
                        sh 'git config user.email "jenkins@kabala.tech"'
                    }
                }
            }
        }
        stage ('PR-title') {
            when {
                expression {
                    env.ghprbPullTitle
                }
            }
            steps {
                script {
                    def conventionalPrefixes = [
                        'build',
                        'fix',
                        'ci',
                        'perf',
                        'feat',
                        'chore',
                        'revert',
                        'test',
                        'style',
                        'refactor',
                        'docs',
                        'improvement',
                    ]

                    def rxp = '^('+conventionalPrefixes.join('|')+')[!: ]{1,3}[a-z]{1,5}[0-9]?-[0-9]+([: ]{1,2}).*$'

                    println "env.ghprbPullTitle = ${env.ghprbPullTitle}"
                    if (!env.ghprbPullTitle.toLowerCase().trim().matches(rxp)) {
                        manager.addShortText('PR title', "white", "red", "1px", "red")
                        error "Conventional PR title error"
                    }
                }
            }
        }
        stage ('build') {
            steps {
                script {
                    sh "npm i"
                    sh "git status"
                }
            }
        }
        stage ('TestsAndChecks') {
            when {
                expression {
                    branch != 'master'
                }
            }
            steps {
                script {
                    sh "npm run preversion"
                }
            }
        }
    }
}
