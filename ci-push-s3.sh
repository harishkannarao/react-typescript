#!/bin/sh

# Make the script to abort if any command fails
set -e

# Print the commands as it is executed. Useful for debugging
set -x

aws --version

rm -rf out

npm run build

npm run export

aws s3 sync out/ s3://${BUCKET_NAME}/