#! /bin/bash

for D in $DEPLOYS
do 
  rsync -r --delete dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:www/deploy${D}/root/htdocs"
done
