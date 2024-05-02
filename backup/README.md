# Backup Script

This script backs-up any local git repository to GitHub.

> NB: The local git repo has to be linked with the remote repo before hand, preferably with `SSH` and not `HTTPS`. HTTPS usually ask for your GitHub username and password before pushing, which isn't ideal for scripting purposes.

Also note that this script might only be be compatible on linux based system. It is written and tested on **Ubuntu 23.10**.

## How It works
First thing to do is to modify the github directory to be backed-up(in the script) and configure the script to run as a cron job.

When the script runs, it first of all verifies if your pc is connected to internet, and exits if it isn't. Then it verifies if there are any changes to backup. If there are, it automatically generates a git commit message with the current date and time then pushes the changes to github. Once it has been pushed, it sends a notification to your desktop about the backup and also logs it to a file located in your user directory at `~/logs/backup_history.txt`.

## Setup
1. You can start by downloading the [script file](./backup.sh) and storing in any directory of your choice. I personally store my scripts in `/home/[username]/Scripts` ( provide your username where it says [username]).

1. Secondly you have to modify [the script](./backup.sh), and update the variable `REPO_DIR` (on line 8) with the link to the github directory you wish to backup periodically.

1. The next step will be setting up a crontab(cron job) specifying the time in which you want the script to be run. Here how to do so:
    - Run the command `crontab -e` to create a new cron job. If this is your first time, you will be prompted to select your text editor of choice. You can simple go with nona(first option) if you have no preference.
    - Scroll to the bottom of the page and add the following line `0 * * * * /path/to/your/script.sh`. Make sure you update it with the path to you script. This declares that the script should be run everyday after every hour. These are some other examples:
        - `0 6,18 * * * /path/to/your/script.sh` : runs the script at 6am and 6pm every day.
        - `0 */2 * * * /path/to/your/script.sh` : runs the script everyday, after every 2 hours.
        - `0 18-20 * * * /path/to/your/script.sh` runs the script at 6pm, 7pm and 8pm every day. Or 6 - 8 pm every day. And so on...
    - You can now save the changes then exit, and everything should work just fine if you configured it properly.

1. This last step is optional, but if you need a command that will enable you to view the history of all your logs, run this command in your terminal.

```bash
echo "alias show-backup-logs='cat ~/logs/backup_history.txt'" >> ~/.bashrc
```
Anytime you need to view your backup history, you can just run the command `show-backup-logs` and you'll be able to see the list of all backups that occurred.
