#!/bin/bash

readonly VERSION="$1"
readonly TAG_LABEL=${VERSION}

echo "Proceeding to create and push git tag..."
git add .
git commit -m "release commit for version ${VERSION}"
git tag -f -a $TAG_LABEL -m "version ${VERSION}"
git push -f --tags --quiet

./copy-dist-to-server-and-restart.sh ${VERSION}
