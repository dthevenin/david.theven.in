#!/bin/sh

python -m SimpleHTTPServer 8880 &
mypid=$!
sleep 1
open -a Safari http://localhost:8888/index.html
wait $mypid
