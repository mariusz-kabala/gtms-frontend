def branch = '';

pipeline {
    agent { docker { image 'docker-registry.kabala.tech/alpine-terraform:latest' } }
    
    environment {
        AWS_ACCESS_KEY = credentials('AWS_ACCESS_KEY')
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
        stage ('Push the image') {
            steps {
                dir("terraform") {
                    script {
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            sh "terraform init"
                            sh "terraform plan -out deploy.plan -var='tag='${GIT_TAG}' -var='subdomain='${SUBDOMAIN}' -var='s3_access_key='${AWS_ACCESS_KEY}' -var='s3_secret_key='${AWS_SECRET_ACCESS_KEY}'"
                            sh "terraform apply -auto-approve deploy.plan"
                        }
                    }
                }
            }
        }
    }
}
