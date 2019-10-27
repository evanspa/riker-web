#!/bin/bash

readonly VERSION=$1
readonly USER="fprest"
readonly HOST="rikerapp"

readonly REMOTE_DEST_BASE_DIR="/home/${USER}/documents/rikerapp-web"
readonly REMOTE_DEST_VERSIONS_DIR="${REMOTE_DEST_BASE_DIR}/versions"
readonly DEST_DIR="${REMOTE_DEST_VERSIONS_DIR}/${VERSION}"

echo "Proceeding to stop existing node server..."
ssh ${HOST} "pm2 stop server && pm2 delete server"

echo "Proceeding to create links to new [$VERSION] dist files..."
ssh ${HOST} "cd ${REMOTE_DEST_BASE_DIR} && unlink dist && unlink node_modules && ln -s ${DEST_DIR}/dist && ln -s ${DEST_DIR}/node_modules"

echo "Proceeding to start new node service..."
ssh ${HOST} "cd ${REMOTE_DEST_BASE_DIR} && pm2 start dist/server/server.js && pm2 save"

echo "Proceeding to validate deployment..."
sleep 2 # give the server a chance to start up
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://www.rikerapp.com)
if [ "${STATUS_CODE}" == "200" ]; then
    echo "200 code returned."
    RESPONSE=$(curl -s https://www.rikerapp.com)
    if [[ $RESPONSE == *"${VERSION}"* ]]; then
        echo "Version: ${VERSION} found in response."
    else
        echo "Version: ${VERSION} NOT found in response."
    fi
else
    echo "ERROR!  Status code: [${STATUS_CODE}]"
fi

echo "Done."
