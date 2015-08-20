#!/bin/sh

python -m SimpleHTTPServer 8888 &
mypid=$!
sleep 1
open -a Safari http://localhost:8888/index.html
wait $mypid
