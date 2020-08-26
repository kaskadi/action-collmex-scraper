#!/bin/bash
BACKUP_PATH="$1"
echo "INFO: staging data file..."
git add $SATZARTEN_PATH
if [ $BACKUP_PATH ]
  then
    echo "INFO: staging data backup file..."
    git add $BACKUP_PATH
fi
echo "INFO: updating package version"
npm --no-git-tag-version version patch
git add package.json
git add package-lock.json
echo "INFO: commiting..."
GPG_SIGN="$(git config commit.gpgSign)"
if [ "$GPG_SIGN" ]
  then
    git commit -S -m "Updated Collmex API CSV mapping data"
  else
    git commit -m "Updated Collmex API CSV mapping data"
fi
echo "INFO: pushing to repo..."
git push