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
                docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                    shell('''#!/bin/bash -e
                        cd terraform
                        [ -d .terraform ] && rm -rvf .terraform
                        terraform init
                        terraform plan -out deploy.plan -var="version=\\"${GIT_TAG}\\" -var="subdomain=\\"${SUBDOMAIN}\\"" -var="s3_access_key=\\"${AWS_ACCESS_KEY}\\" -var="s3_secret_key=\\"${AWS_SECRET_ACCESS_KEY}\\""
                        terraform apply -auto-approve deploy.plan
                    ''')
                }
            }
        }
    }
}
