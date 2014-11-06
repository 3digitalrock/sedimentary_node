#!/bin/bash

tower-cli job launch \
    --job-template $ANSIBLE_TOWER_JOB_TEMPLATE_ID \
    --username $ANSIBLE_TOWER_USER  \
    --password $ANSIBLE_TOWER_PASS  \
    --host $ANSIBLE_TOWER_SERVER