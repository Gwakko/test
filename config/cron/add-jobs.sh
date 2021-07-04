#!/usr/bin/env bash

markBegin="JOBS-BEGIN"
markEnd="JOBS-END"

# Path to your crontabs file
crontabsFile="/etc/crontabs/root"
tempCrontabsFile="/cron/jobs"

# Loading project hosts, add custom domains
#readarray jobs < "$tempCrontabsFile"

sed -ie "/$markBegin/,/$markEnd/d" "$crontabsFile"

printf "# %s\n" "$markBegin" >> "$crontabsFile"

cat "$tempCrontabsFile" >> "$crontabsFile"
#for job in "${jobs[@]}"; do
#  if [[ ! -z $job ]]; then
#    printf "%s\n" "$job" >> "$crontabsFile"
#  fi
#done

printf "# %s\n" "$markEnd" >> "$crontabsFile"

"$@"