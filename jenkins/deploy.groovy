def branch = '';

pipeline {
    agent any
    
    environment {
        CI = 'true'
        GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
    }

    stages {
        stage ('Push the image') {
            agent any
            steps {
                script {
                    ansiColor('xterm') {
                        def props = readJSON file: 'package.json'
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            sh "terraform init"
                            sh "terraform plan"
                            sh "terraform apply -auto-approve"
                        }
                    }
                }
            }
        }
    }
}
