#!/bin/bash

readonly VERSION=$1
readonly USER="fprest"
readonly HOST="rikerapp"

readonly REMOTE_DEST_BASE_DIR="/home/${USER}/documents/riker-web"
readonly REMOTE_DEST_VERSIONS_DIR="${REMOTE_DEST_BASE_DIR}/versions"
readonly CSS_BUNDLE_DIR="dist/client/css"

echo "Proceeding to build and compress local Riker CSS files..."
gulp bundleCss > /dev/null

echo "Proceeding to upload local CSS bundle file..."
scp ${CSS_BUNDLE_DIR}/bundle.css ${USER}@${HOST}:${REMOTE_DEST_VERSIONS_DIR}/${VERSION}/${CSS_BUNDLE_DIR}

echo "Done."
