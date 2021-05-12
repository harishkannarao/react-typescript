#!/bin/sh

# Make the script to abort if any command fails
set -e

# Print the commands as it is executed. Useful for debugging
set -x

if ls ./cypress-report/mochawesome-report/*.json 1> /dev/null 2>&1; then
    npm run mochawesome-merge
    npm run marge
fi

