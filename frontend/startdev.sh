#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Stop the existing container, if it exists.
docker stop qanda-frontend

# Build the container 
docker build -t qanda-frontend . -f Dockerfile.dev

# Run it. This will only work on Linux since it uses the host network. If running on OSX
# or Windows, change the QANDA_URL to http://host.docker.internal:9000 and remove the
# --network host parameter.
docker run --rm -d \
  --name qanda-frontend \
  -e "QANDA_URL=http://localhost:9000" \
  --network host \
  -v "$DIR/public:/usr/share/nginx/html" \
  qanda-frontend
