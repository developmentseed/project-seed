#!/usr/bin/env bash
set -e # halt script on error
# If deploying, don't balk on lint errors
if [ $TRAVIS_PULL_REQUEST = "false" ] && [ $TRAVIS_BRANCH = ${DEPLOY_BRANCH} ]; then
  yarn run lint || true
else
  yarn run lint
fi
