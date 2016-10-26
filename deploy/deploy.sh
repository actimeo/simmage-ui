#! /bin/bash
openssl aes-256-cbc -K $encrypted_b52bebe2eeaf_key -iv $encrypted_b52bebe2eeaf_iv -in deploy_rsa.enc -out deploy_rsa -d

rsync -r --delete dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:simmage-ui-dist"
ssh deploy@maya.elol.fr ./deploy-ui.sh
