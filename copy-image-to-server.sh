#!/bin/bash

readonly VERSION=$1
readonly IMAGE=$2
readonly USER="fprest"
readonly HOST="rikerapp"

readonly REMOTE_DEST_BASE_DIR="/home/${USER}/documents/riker-web"
readonly REMOTE_DEST_VERSIONS_DIR="${REMOTE_DEST_BASE_DIR}/versions"

echo "Proceeding to upload image file..."
scp src/images/$2 ${USER}@${HOST}:${REMOTE_DEST_VERSIONS_DIR}/${VERSION}/dist/client/images

echo "Done."
