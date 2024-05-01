#! /bin/bash

# Exits the script if any command fails
set -e

# Setting the directory to the github
# repo that has to be backed up.
REPO_DIR=/home/ajim/Code/Test/test-repo
cd $REPO_DIR

# Verifying if github.com is reachable
echo "Testing internet connection..."
ping_result=$(ping -c 3 -q github.com)


# Generating a commit message from the
# current timestamp
timestamp=$(date +"%Y-%m-%d %H:%M:%S")
commit_msg="New backup at: $timestamp"

# Pushing changes to github
git add .
git commit -m "$commit_msg"
git push

# Logging backup to log file
if [ ! -d ~/logs ]; then
  mkdir ~/logs
fi
echo "$commit_msg" >> ~/logs/backup_history.txt

# Sending notifcation to desktop
export DISPLAY=:0
export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
/usr/bin/notify-send "Backup Notification" "$commit_msg"