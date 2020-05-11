def branch = '';

pipeline {
    agent { 
        docker { image 'docker-registry.kabala.tech/node12-with-git:latest' } 
    }

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
        stage ('PR-title') {
            when {
                allOf {
                    expression {
                        env.ghprbPullTitle
                    }
                    not { environment name: 'ghprbPullAuthorLogin', value: 'dependabot-preview[bot]' }
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
            post {
                unsuccessful {
                    rocketSend channel: "pull-requests-checks", message: "[${BUILD_DISPLAY_NAME}] :sob: Checks have been failed (_Conventional PR title error_) - ${env.JOB_NAME} ${env.BUILD_NUMBER} *${ghprbPullTitle}*  (<${env.ghprbPullLink}|Open>)", rawMessage: true
                }
            }
        }
        stage ('Install dependencies') {
            steps {
                script {
                    sh "yarn"
                    sh "yarn workspaces run setup:ts"
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

                    sh "curl -s -X POST -d '${statusJson}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"

                    sh "yarn check:ts"
                }
            }
            post {
                success {
                    script {
                        def statusJsonSuccess = groovy.json.JsonOutput.toJson([
                            state: "success",
                            context: "TypeScript",
                            description: "OK",
                            target_url: "${BUILD_URL}console"
                        ])

                        sh "curl -s -X POST -d '${statusJsonSuccess}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"
                    }
                }

                unsuccessful {
                    script {
                        def statusJsonFailed = groovy.json.JsonOutput.toJson([
                            state: "failure",
                            context: "TypeScript",
                            description: "Failed",
                            target_url: "${BUILD_URL}console"
                        ])

                        sh "curl -s -X POST -d '${statusJsonFailed}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"
                        rocketSend channel: "pull-requests-checks", message: "[${BUILD_DISPLAY_NAME}] :sob: Checks have been failed (_TypeScript Checks_) - ${env.JOB_NAME} ${env.BUILD_NUMBER} *${ghprbPullTitle}*  (<${env.ghprbPullLink}|Open>)", rawMessage: true
                    }
                }
            }
        }

        stage ('Check Eslint') {
            steps {
                script {
                    def statusJson = groovy.json.JsonOutput.toJson([
                        state: "pending",
                        context: "Eslint",
                        description: "checking...",
                        target_url: "${BUILD_URL}console"
                    ])

                    sh "curl -s -X POST -d '${statusJson}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"

                    sh "yarn eslint"
                }
            }
            post {
                success {
                    script {
                        def statusJsonSuccess = groovy.json.JsonOutput.toJson([
                            state: "success",
                            context: "Eslint",
                            description: "OK",
                            target_url: "${BUILD_URL}console"
                        ])

                        sh "curl -s -X POST -d '${statusJsonSuccess}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"
                    }
                }

                unsuccessful {
                    script {
                        def statusJsonFailed = groovy.json.JsonOutput.toJson([
                            state: "failure",
                            context: "Eslint",
                            description: "Failed",
                            target_url: "${BUILD_URL}console"
                        ])

                        sh "curl -s -X POST -d '${statusJsonFailed}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"

                        rocketSend channel: "pull-requests-checks", message: "[${BUILD_DISPLAY_NAME}] :sob: Checks have been failed (_Eslint Checks_) - ${env.JOB_NAME} ${env.BUILD_NUMBER} *${ghprbPullTitle}*  (<${env.ghprbPullLink}|Open>)", rawMessage: true
                    }
                }
            }
        }

        stage ('Run unit tests') {
            steps {
                script {
                    def statusJson = groovy.json.JsonOutput.toJson([
                        state: "pending",
                        context: "UnitTests",
                        description: "checking...",
                        target_url: "${BUILD_URL}console"
                    ])

                    sh "curl -s -X POST -d '${statusJson}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"

                    //sh "yarn test:coverage"
                    sh "yarn test"
                }
            }

            post {
                // always {
                //     publishHTML target: [
                //         allowMissing         : false,
                //         alwaysLinkToLastBuild: false,
                //         keepAll              : true,
                //         reportDir            : 'coverage',
                //         reportFiles          : 'index.html',
                //         reportName           : 'TestReport'
                //     ]
                // }
                success {
                    script {
                        def statusJsonSuccess = groovy.json.JsonOutput.toJson([
                            state: "success",
                            context: "UnitTests",
                            description: "OK",
                            target_url: "${BUILD_URL}TestReport"
                        ])

                        sh "curl -s -X POST -d '${statusJsonSuccess}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"
                    }
                }
                unsuccessful {
                    script {
                        def statusJsonFailed = groovy.json.JsonOutput.toJson([
                            state: "failure",
                            context: "UnitTests",
                            description: "Failed",
                            target_url: "${BUILD_URL}TestReport"
                        ])

                        sh "curl -s -X POST -d '${statusJsonFailed}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"

                        rocketSend channel: "pull-requests-checks", message: "[${BUILD_DISPLAY_NAME}] :sob: Checks have been failed (_Unit tests_) - ${env.JOB_NAME} ${env.BUILD_NUMBER} *${ghprbPullTitle}*  (<${env.ghprbPullLink}|Open>)", rawMessage: true
                    }
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

                    sh "curl -s -X POST -d '${statusJson}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"
                    sh "yarn workspaces run build"
                }
            }
            post {
                success {
                    script {
                        def statusJsonSuccess = groovy.json.JsonOutput.toJson([
                            state: "success",
                            context: "Build",
                            description: "OK",
                            target_url: "${BUILD_URL}console"
                        ])

                        sh "curl -s -X POST -d '${statusJsonSuccess}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"
                    }
                }
                unsuccessful {
                    script {
                        def statusJsonFailed = groovy.json.JsonOutput.toJson([
                            state: "failure",
                            context: "Build",
                            description: "Failed",
                            target_url: "${BUILD_URL}console"
                        ])

                        sh "curl -s -X POST -d '${statusJsonFailed}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"

                        rocketSend channel: "pull-requests-checks", message: "[${BUILD_DISPLAY_NAME}] :sob: Checks have been failed (_Build_) - ${env.JOB_NAME} ${env.BUILD_NUMBER} *${ghprbPullTitle}*  (<${env.ghprbPullLink}|Open>)", rawMessage: true
                    }
                }
            }
        }

        stage ('Build styleguide') {
            steps {
                script {
                    def statusJson = groovy.json.JsonOutput.toJson([
                        state: "pending",
                        context: "Styleguide",
                        description: "building...",
                        target_url: "${BUILD_URL}console"
                    ])

                    sh "curl -s -X POST -d '${statusJson}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"
                    sh "yarn styleguide:build"

                    configFileProvider([configFile(fileId: 'scaleway-s3-config', targetLocation: 'aws-config')]) {
                        sh "mkdir ~/.aws"
                        sh "mv aws-config ~/.aws/config"
                        sh "aws s3 cp styleguide s3://styleguide/${branch}/ --recursive --acl public-read"
                    }
                }
            }
            post {
                success {
                    script {
                        def statusUpdatedJson = groovy.json.JsonOutput.toJson([
                            state: "success",
                            context: "styleGuide",
                            description: "https://styleguide.s3.nl-ams.scw.cloud/${branch}/index.html",
                            target_url: "https://styleguide.s3.nl-ams.scw.cloud/${branch}/index.html"
                        ])

                        sh "curl -s -X POST -d '${statusUpdatedJson}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"

                        echo "https://styleguide.s3.nl-ams.scw.cloud/${branch}/index.html"
                    }
                }

                unsuccessful {
                    script {
                        def statusUpdatedJson = groovy.json.JsonOutput.toJson([
                            state: "failure",
                            context: "styleGuide",
                            description: "Failed",
                            target_url: "${BUILD_URL}console"
                        ])

                        sh "curl -s -X POST -d '${statusUpdatedJson}' https://api.github.com/repos/gtms-org/gtms-frontend/statuses/${env.ghprbActualCommit}?access_token=${GITHUB_API_KEY}"

                        rocketSend channel: "pull-requests-checks", message: "[${BUILD_DISPLAY_NAME}] :sob: Checks have been failed (_Styleguide build_) - ${env.JOB_NAME} ${env.BUILD_NUMBER} *${ghprbPullTitle}*  (<${env.ghprbPullLink}|Open>)", rawMessage: true
                    }
                }
            }
        }
    }
}
