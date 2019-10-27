#!/bin/bash

readonly BUILD_VERSION_URL="https://www.rikerapp.com/buildVersion"
readonly PREFIX_STR='<version>'
readonly PREFIX_STR_LEN=${#PREFIX_STR}
readonly POSTFIX_STR="</version>"

strindex() {
    x="${1%%$2*}"
    [[ $x = $1 ]] && echo -1 || echo ${#x}
}

echo "Proceeding to fetch riker-web current production build version..."
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" ${BUILD_VERSION_URL})
if [ "${STATUS_CODE}" == "200" ]; then
    echo "200 code returned."
    BUILD_VERSION_PAGE=$(curl -s ${BUILD_VERSION_URL})
    PREFIX_STR_IDX=$(strindex "${BUILD_VERSION_PAGE}" "${PREFIX_STR}")
    POSTFIX_STR_IDX=$(strindex "${BUILD_VERSION_PAGE}" "${POSTFIX_STR}")
    VERSION_START_IDX=$((PREFIX_STR_IDX+PREFIX_STR_LEN))
    BUILD_VERSION_STR_LEN=$((POSTFIX_STR_IDX-VERSION_START_IDX))
    echo "Riker-web current production version: [${BUILD_VERSION_PAGE:$VERSION_START_IDX:$BUILD_VERSION_STR_LEN}]"
else
    echo "ERROR!  Status code: [${STATUS_CODE}]"
fi
