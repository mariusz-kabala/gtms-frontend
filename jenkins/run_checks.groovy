def branch = '';

pipeline {
    agent { docker { image 'docker-registry.kabala.tech/node12-with-git:latest' } }

    environment {
        GITHUB_API_KEY = credentials('jenkins-github-accesstoken')
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
        stage ('Install dependencies') {
            steps {
                script {
                    sh "yarn"
                }
            }
        }
        stage ('Check TypeScript') {
            when {
                expression {
                    branch != 'master'
                }
            }
            steps {
                script {
                    def statusJson = groovy.json.JsonOutput.toJson([
                        state: "pending",
                        context: "TypeScript",
                        description: "checking...",
                        target_url: "${BUILD_URL}console"
                    ])

                    sh "curl -s -X POST -d '${statusJson}' https://api.github.com/repos/mariusz-kabala/gtms-frontend/statuses/${env.GIT_COMMIT}?access_token=${GITHUB_API_KEY}"

                    sh "yarn check:ts"

                    def statusJsonSuccess = groovy.json.JsonOutput.toJson([
                        state: "success",
                        context: "TypeScript",
                        description: "OK",
                        target_url: "${BUILD_URL}console"
                    ])

                    sh "curl -s -X POST -d '${statusJsonSuccess}' https://api.github.com/repos/mariusz-kabala/gtms-frontend/statuses/${env.GIT_COMMIT}?access_token=${GITHUB_API_KEY}"
                }
            }
        }

        stage ('Check Eslint') {
            when {
                expression {
                    branch != 'master'
                }
            }
            steps {
                script {
                    def statusJson = groovy.json.JsonOutput.toJson([
                        state: "pending",
                        context: "Eslint",
                        description: "checking...",
                        target_url: "${BUILD_URL}console"
                    ])

                    sh "curl -s -X POST -d '${statusJson}' https://api.github.com/repos/mariusz-kabala/gtms-frontend/statuses/${env.GIT_COMMIT}?access_token=${GITHUB_API_KEY}"

                    sh "yarn eslint"

                    def statusJsonSuccess = groovy.json.JsonOutput.toJson([
                        state: "success",
                        context: "Eslint",
                        description: "OK",
                        target_url: "${BUILD_URL}console"
                    ])

                    sh "curl -s -X POST -d '${statusJsonSuccess}' https://api.github.com/repos/mariusz-kabala/gtms-frontend/statuses/${env.GIT_COMMIT}?access_token=${GITHUB_API_KEY}"
                }
            }
        }

        stage ('Run unit tests') {
            when {
                expression {
                    branch != 'master'
                }
            }
            steps {
                script {
                    def statusJson = groovy.json.JsonOutput.toJson([
                        state: "pending",
                        context: "UnitTests",
                        description: "checking...",
                        target_url: "${BUILD_URL}console"
                    ])

                    sh "curl -s -X POST -d '${statusJson}' https://api.github.com/repos/mariusz-kabala/gtms-frontend/statuses/${env.GIT_COMMIT}?access_token=${GITHUB_API_KEY}"

                    sh "yarn test:coverage"

                    def statusJsonSuccess = groovy.json.JsonOutput.toJson([
                        state: "success",
                        context: "UnitTests",
                        description: "OK",
                        target_url: "${BUILD_URL}console"
                    ])

                    sh "curl -s -X POST -d '${statusJsonSuccess}' https://api.github.com/repos/mariusz-kabala/gtms-frontend/statuses/${env.GIT_COMMIT}?access_token=${GITHUB_API_KEY}"
                }
            }
        }

        stage ('Build project') {
            steps {
                script {
                    def statusJson = groovy.json.JsonOutput.toJson([
                        state: "pending",
                        context: "Build",
                        description: "building...",
                        target_url: "${BUILD_URL}console"
                    ])

                    sh "curl -s -X POST -d '${statusJson}' https://api.github.com/repos/mariusz-kabala/gtms-frontend/statuses/${env.GIT_COMMIT}?access_token=${GITHUB_API_KEY}"
                    sh "yarn workspaces run build"

                    def statusJsonSuccess = groovy.json.JsonOutput.toJson([
                        state: "success",
                        context: "Build",
                        description: "OK",
                        target_url: "${BUILD_URL}console"
                    ])

                    sh "curl -s -X POST -d '${statusJsonSuccess}' https://api.github.com/repos/mariusz-kabala/gtms-frontend/statuses/${env.GIT_COMMIT}?access_token=${GITHUB_API_KEY}"
                }
            }
        }
    }
}
