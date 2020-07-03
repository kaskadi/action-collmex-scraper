#!/bin/bash
BACKUP_PATH="$1"
echo "INFO: setting up GitHub user..."
git config --global user.name $USER_NAME
git config --global user.email $USER_EMAIL
echo "INFO: staging data file..."
git add $SATZARTEN_PATH
if [ $BACKUP_PATH ]
  then
    echo "INFO: staging data backup file..."
    git add $BACKUP_PATH
fi
echo "INFO: commiting..."
git commit -m "Updated Collmex API CSV mapping data"
echo "INFO: pushing to repo..."
git push