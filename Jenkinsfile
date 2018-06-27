pipeline {
  agent any

  environment {
    FREE_PORT = sh (
      script: "curl https://gist.githubusercontent.com/jimlambie/6a2a6a89481e8e5b518d7c84caf7bfc5/raw/d8cd9afcc4ecf8557d1cf80d02946013c0dbdc68/freeport.sh | sh",
      returnStdout: true
    ).trim()
    
    IMAGE_TAG = sh (
      script: "echo '${env.JOB_NAME.toLowerCase()}' | tr '/' '-' | sed 's/%2f/-/g'",
      returnStdout: true
    ).trim()
  }

  stages {
    stage('Build') {    
      steps {
        echo "Building...${IMAGE_TAG}"

        sh "docker build -t ${IMAGE_TAG} ."
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying...'

        echo 'Running on local port ${FREE_PORT}'

        sh "docker run -v /var/run/docker.sock:/var/run/docker.sock -d --restart=always --network=james_default --name '${IMAGE_TAG}' -e NODE_ENV=test -e VIRTUAL_HOST=${IMAGE_TAG}.mustdash.es -p ${FREE_PORT}:3001 ${IMAGE_TAG}"

        slackSend color: "good", message: "${env.JOB_NAME} deployed. Test it here: http://${IMAGE_TAG}.mustdash.es. Approve it here: ${RUN_DISPLAY_URL}."

        input message: ' > Finished testing? (Click "Proceed" to continue)'
        sh "docker ps -f name=${IMAGE_TAG} -q | xargs --no-run-if-empty docker container stop"
        sh "docker container ls -a -fname=${IMAGE_TAG} -q | xargs -r docker container rm"
      }
    }
  }
}
