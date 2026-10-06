pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'call npm ci || call npm install'
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
                if not exist "C:\\ProgramData\\Jenkins\\.jenkins\\userContent\\memorycard" (
                    mkdir "C:\\ProgramData\\Jenkins\\.jenkins\\userContent\\memorycard"
                )

                xcopy /E /I /Y "dist\\*" "C:\\ProgramData\\Jenkins\\.jenkins\\userContent\\memorycard\\"
                '''
            }
        }

        stage('Run Website') {
            steps {
                bat '''
                set JENKINS_NODE_COOKIE=dontKillMe
                start "" cmd /c "npx serve -s dist -l 8081"
                '''
            }
        }
    }

    post {
    success {
        echo 'Memory Card Game pipeline executed successfully!'
        echo '========================================'
        echo 'Memory Card Game URL:'
        echo 'http://localhost:8081'
        echo '========================================'
    }

    failure {
        echo 'Pipeline failed!'
    }
}
}
