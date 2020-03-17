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
        stage ('Prepare') {
            steps {
                script {
                    sh "printenv"
                }
            }
        }

        stage ('Release') {
            steps {
                script {
                    sshagent(['jenkins-ssh-key']) {
                        sh "git checkout ${branch}"
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
