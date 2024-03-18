#! /bin/bash

# Exits the script if a command 
# fails
set -e

REPO_DIR=/home/ajim/Documents/blog
cd $REPO_DIR

# Verifying if github.com is reachable
echo "Testing internet connection..."
ping_result=$(ping -c 3 -q github.com)

echo -n "Enter commit message: "
read commit_msg

if [ -z "$commit_msg" ]; then
    echo "ERROR: No commit message provided"
    exit 1
fi

git add .

git commit -m "$commit_msg"
git push

# Getting the timestamp and commit ID
timestamp=$(date +"%Y-%m-%d %H:%M:%S")
commit_id=$(git rev-parse HEAD)

# Logging commit to log file
LOGS_DIR=/home/ajim/Scripts/blog
cd $LOGS_DIR
echo "$timestamp,COMMIT_ID:$commit_id,MESSAGE:"\"$commit_msg\""">> logs.txt

cat << EOF
-----------
Successfully committed and pushed to github 🚀
-----------
EOF