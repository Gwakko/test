ARG IMAGE

FROM ${IMAGE}

ENTRYPOINT sh /cron/add-jobs.sh

CMD ["crond", "-f", "-l", "8"]