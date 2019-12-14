def branch = '';

pipeline {
    agent { docker { image 'docker-registry.kabala.tech/alpine-terraform:latest' } }
    
    environment {
        CI = 'true'
        GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
    }

    stages {
        stage ('Push the image') {
            steps {
                script {
                    ansiColor('xterm') {
                        def props = readJSON file: 'package.json'
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            sh "cd terraform && ls -la && terraform init && terraform plan && terraform apply -auto-approve"
                        }
                    }
                }
            }
        }
    }
}
