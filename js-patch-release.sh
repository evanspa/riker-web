#!/bin/bash

readonly VERSION="$1"
readonly TAG_LABEL=${VERSION}

echo "Proceeding to create and push git tag..."
git tag -f -a $TAG_LABEL -m 'version $version'
git push -f --tags --quiet

./copy-js-to-server-and-restart.sh ${VERSION}
