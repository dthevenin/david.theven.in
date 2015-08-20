#!/bin/sh

node server.js &
mypid=$!
sleep 1
open -a Safari http://localhost:8888/index.html
wait $mypid