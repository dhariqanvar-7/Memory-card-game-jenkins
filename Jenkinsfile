pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'call npm ci || call npm install'
            }
        }

        stage('Run Development Server') {
            steps {
                bat 'call npm run dev'
            }
        }

        stage('Build Application') {
            steps {
                bat 'call npm run build'
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                if not exist "C:\\ProgramData\\Jenkins\\.jenkins\\userContent\\memorycard" mkdir "C:\\ProgramData\\Jenkins\\.jenkins\\userContent\\memorycard"

                xcopy /E /I /Y "dist\\*" "C:\\ProgramData\\Jenkins\\.jenkins\\userContent\\memorycard\\"
                '''
            }
        }
    }

    post {
        success {
            echo 'Memory Card Game pipeline executed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
