#!/bin/sh

# Make the script to abort if any command fails
set -e

# Print the commands as it is executed. Useful for debugging
set -x

sudo apt-get -qq update

# Print pre-installed dependencies version

node --version

npm --version

npx --version

npm install