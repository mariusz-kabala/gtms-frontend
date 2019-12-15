def branch = '';
def workspace = '';

pipeline {
    agent { docker { image 'docker-registry.kabala.tech/alpine-terraform:latest' } }
    
    environment {
        workspace = pwd()
        CI = 'true'
        GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
        TF_CLI_CONFIG_FILE = "${workspace}/terraform/.terraformrc"
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
                script {
                    ansiColor('xterm') {
                        def props = readJSON file: 'package.json'
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            sh "cd terraform && ls -la && terraform init && terraform plan -lock=false -out deploy.plan && terraform apply deploy.plan -auto-approve -lock=false"
                        }
                    }
                }
            }
        }
    }
}
