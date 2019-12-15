def branch = '';

pipeline {
    agent { docker { image 'docker-registry.kabala.tech/alpine-terraform:latest' } }
    
    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
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
        stage ('DEPLOY') {
            steps {
                dir("terraform") {
                    script {
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            sh "terraform init"
                            sh "terraform plan -out deploy.plan -var=\"tag=latest" -var=\"subdomain=${SUBDOMAIN}\""
                            sh "terraform apply -auto-approve deploy.plan"
                        }
                    }
                }
            }
        }
    }
}
