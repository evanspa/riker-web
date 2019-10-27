#!/bin/bash

readonly VERSION=$1
readonly USER="fprest"
readonly HOST="rikerapp"

readonly REMOTE_DEST_BASE_DIR="/home/${USER}/documents/riker-web"
readonly REMOTE_DEST_VERSIONS_DIR="${REMOTE_DEST_BASE_DIR}/versions"
readonly CLIENT_SCRIPTS_DIR="dist/client/scripts"
readonly SERVER_SCRIPTS_DIR="dist/server"

readonly CLIENTJS_ARCHIVE="scripts.js.tar.gz"
readonly SERVERJS_ARCHIVE="server.js.tar.gz"

readonly VERIFICATION_SEARCH_TEXT="All rights reserved"

echo "Proceeding to build and compress local JS files..."
rm -rf dist
gulp bundleAndCompressClientJs --rikerVersion=$VERSION --useHashHistory=false > /dev/null
gulp bundleServerJs --rikerVersion=$VERSION --useHashHistory=false > /dev/null

echo "Proceeding to tar up local JS files..."
tar -czf ${CLIENTJS_ARCHIVE} ${CLIENT_SCRIPTS_DIR}/bundle.js
tar -czf ${SERVERJS_ARCHIVE} ${SERVER_SCRIPTS_DIR}/riker-server.js

echo "Proceeding to upload local JS files..."
scp ${CLIENTJS_ARCHIVE} ${USER}@${HOST}:${REMOTE_DEST_VERSIONS_DIR}/${VERSION}
scp ${SERVERJS_ARCHIVE} ${USER}@${HOST}:${REMOTE_DEST_VERSIONS_DIR}/${VERSION}

echo "Proceeding to un-tar and overwrite remote JS files..."
ssh ${HOST} "cd ${REMOTE_DEST_VERSIONS_DIR}/${VERSION} && tar xf ${CLIENTJS_ARCHIVE} && tar xf ${SERVERJS_ARCHIVE} && rm ${CLIENTJS_ARCHIVE} && rm ${SERVERJS_ARCHIVE}"

echo "Proceeding to restart node service..."
ssh ${HOST} "pm2 restart server"

readonly CLOUDFLARE_EMAIL="cloudflare@rikerapp.com"
readonly CLOUDFLARE_ZONE_ID="9fb9226d03bea6e5f87059e63a95d6c0"
readonly CLOUDFLARE_API_KEY="f47f2b02b16b63d87047c8a61e119f159a3e1"

echo "Proceeding to clear CloudFlare cache"
curl -X DELETE "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
     -H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" \
     -H "X-Auth-Key: ${CLOUDFLARE_API_KEY}" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'

echo "Proceeding to validate deployment..."
sleep 5 # give the server a chance to start up
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://www.rikerapp.com)
if [ "${STATUS_CODE}" == "200" ]; then
    echo "200 code returned."
    RESPONSE=$(curl -s https://www.rikerapp.com)
    if [[ $RESPONSE == *"${VERIFICATION_SEARCH_TEXT}"* ]]; then
        echo "Verification text: [${VERIFICATION_SEARCH_TEXT}] found in response."
    else
        echo "Verification text: [${VERIFICATION_SEARCH_TEXT}] NOT found in response."
    fi
else
    echo "ERROR!  Status code: [${STATUS_CODE}]"
fi

echo "Proceeding to delete local JS tar.gz files..."
#rm ${CLIENTJS_ARCHIVE}
#rm ${SERVERJS_ARCHIVE}
#rm -rf dist

echo "Done."
