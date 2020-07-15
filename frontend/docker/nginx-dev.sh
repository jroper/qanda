#!/bin/sh

echo "Environment dump:"
env
echo

if [[ -n "${QANDA_URL}" ]]
then
    sed --in-place "s!{{QANDA_URL}}!${QANDA_URL}!" /etc/nginx/nginx.conf
fi

echo "Starting with nginx config:"
cat /etc/nginx/nginx.conf
echo


echo "Starting nginx..."
exec nginx -g 'daemon off;'
