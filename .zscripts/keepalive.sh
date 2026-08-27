#!/bin/bash
cd /home/z/my-project
while true; do
  npx next start -p 3000 -H :: 2>&1 &
  PID=$!
  echo $PID > .zscripts/dev.pid
  echo "Started Next.js with PID $PID"
  # Wait for process to exit
  wait $PID 2>/dev/null
  EXIT=$?
  echo "Next.js exited with code $EXIT, restarting in 2s..."
  sleep 2
done
