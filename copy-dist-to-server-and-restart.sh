#!/bin/bash

readonly VERSION=$1
readonly USER="fprest"
readonly HOST="rikerapp"

readonly RIKER_NODE_SERVER_FILE="dist/server/riker-server.js"
readonly RIKER_NODE_SERVER_NAME="riker-server" # i.e., the name of src/riker-server.js (with ext excluded)
readonly REMOTE_DEST_BASE_DIR="/home/${USER}/documents/riker-web"
readonly REMOTE_DEST_VERSIONS_DIR="${REMOTE_DEST_BASE_DIR}/versions"
readonly DEST_DIR="${REMOTE_DEST_VERSIONS_DIR}/${VERSION}"
readonly WEB_LOCAL_URL="http://localhost:3004"
readonly WEB_LOCAL_BUILD_VERSION_URL="http://localhost:3004/buildVersion"
readonly VERIFICATION_SEARCH_TEXT="All rights reserved"
readonly DIST_ARCHIVE="dist.tar.gz"
readonly NODE_MODULES_ARCHIVE="node_modules.tar.gz"

readonly PREFIX_STR='<version>'
readonly PREFIX_STR_LEN=${#PREFIX_STR}
readonly POSTFIX_STR="</version>"

strindex() {
    x="${1%%$2*}"
    [[ $x = $1 ]] && echo -1 || echo ${#x}
}

echo "Proceeding to build and compress local dist files..."
rm -rf dist
gulp buildAndCompress --rikerVersion=$VERSION --useHashHistory=false > /dev/null

echo "Proceeding to tar up local dist files..."
tar -czf ${DIST_ARCHIVE} dist
tar -czf ${NODE_MODULES_ARCHIVE} node_modules

echo "Proceeding to upload local dist files to server..."
ssh ${HOST} "mkdir -p ${DEST_DIR} && rm -rf ${DEST_DIR}/*"
scp -r ${DIST_ARCHIVE} ${USER}@${HOST}:${DEST_DIR}
scp -r ${NODE_MODULES_ARCHIVE} ${USER}@${HOST}:${DEST_DIR}

echo "Proceeding to stop existing node server..."
ssh ${HOST} "mkdir -p ${DEST_DIR} && pm2 stop ${RIKER_NODE_SERVER_NAME}"
ssh ${HOST} "pm2 delete ${RIKER_NODE_SERVER_NAME}"

echo "Proceeding to un-tar and create links to new [$VERSION] dist files..."
ssh ${HOST} "cd ${DEST_DIR} && tar xf ${DIST_ARCHIVE} > /dev/null 2>&1 && tar xf ${NODE_MODULES_ARCHIVE} > /dev/null 2>&1 && rm ${DIST_ARCHIVE} && rm ${NODE_MODULES_ARCHIVE}"
ssh ${HOST} "cd ${REMOTE_DEST_BASE_DIR} && unlink dist > /dev/null 2>&1"
ssh ${HOST} "cd ${REMOTE_DEST_BASE_DIR} && unlink node_modules > /dev/null 2>&1"
ssh ${HOST} "cd ${REMOTE_DEST_BASE_DIR} && ln -s ${DEST_DIR}/dist && ln -s ${DEST_DIR}/node_modules"

echo "Proceeding to start new node service..."
ssh ${HOST} "cd ${REMOTE_DEST_BASE_DIR} && pm2 start ${RIKER_NODE_SERVER_FILE} && pm2 save"

echo "Proceeding to delete local dist files..."
rm ${DIST_ARCHIVE}
rm ${NODE_MODULES_ARCHIVE}
rm -rf dist

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
STATUS_CODE=$(ssh ${HOST} -t "curl -s -o /dev/null -w '%{http_code}' ${WEB_LOCAL_URL}")
if [ "${STATUS_CODE}" == "200" ]; then
    echo "Good.  200 code returned from Riker home page (using local url)."
    RESPONSE=$(ssh ${HOST} -t "curl -s ${WEB_LOCAL_URL}")
    if [[ $RESPONSE == *"${VERIFICATION_SEARCH_TEXT}"* ]]; then
        echo "Good.  Verification text: [${VERIFICATION_SEARCH_TEXT}] found in response."
        echo "Proceeding to validate correct build version actually deployed..."
        BUILD_VERSION_PAGE=$(ssh ${HOST} -t "curl -s ${WEB_LOCAL_BUILD_VERSION_URL}")
        PREFIX_STR_IDX=$(strindex "${BUILD_VERSION_PAGE}" "${PREFIX_STR}")
        POSTFIX_STR_IDX=$(strindex "${BUILD_VERSION_PAGE}" "${POSTFIX_STR}")
        VERSION_START_IDX=$((PREFIX_STR_IDX+PREFIX_STR_LEN))
        BUILD_VERSION_STR_LEN=$((POSTFIX_STR_IDX-VERSION_START_IDX))
        VERSION_DEPLOYED=${BUILD_VERSION_PAGE:$VERSION_START_IDX:$BUILD_VERSION_STR_LEN}
        if [[ ${VERSION_DEPLOYED} == *"${VERSION}"* ]]; then
            echo "Good.  Version: ${VERSION_DEPLOYED} returned from build version page.  Deployment fully validated."
        else
            echo "Oops.  Version: ${VERSION} NOT returned from build version page.  Deployment NOT validated.  Version currently returned: ${VERSION_DEPLOYED}"
        fi
    else
        echo "Oops.  Verification text: [${VERIFICATION_SEARCH_TEXT}] NOT found in response."
    fi
else
    echo "Oops.  Status code: [${STATUS_CODE}] returned from Riker home page (using local url)."
fi

echo "Done."
