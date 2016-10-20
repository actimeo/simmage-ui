#! /bin/bash

rsync -r --delete dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:simmage-ui-dist"
ssh deploy@maya.elol.fr ./deploy-ui.sh
