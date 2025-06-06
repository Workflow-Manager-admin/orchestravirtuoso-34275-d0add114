#!/bin/bash
cd /home/kavia/workspace/code-generation/orchestravirtuoso-34275-d0add114/orchestra_virtuoso
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

