#!/bin/bash

tower-cli config host $ANSIBLE_TOWER_SERVER && \
tower-cli config username $ANSIBLE_TOWER_USER && \
tower-cli config password $ANSIBLE_TOWER_PASS

tower-cli job launch --job-template=$ANSIBLE_TOWER_JOB_TEMPLATE_ID