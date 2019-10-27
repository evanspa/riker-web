#!/bin/bash
sudo openssl req -new -sha256 -nodes -out ./ssl/server.csr -newkey rsa:2048 -keyout ./ssl/server.key -config server.csr.cnf
sudo openssl x509 -req -in ./ssl/server.csr -CA ./ssl/rootCA.pem -CAkey ./ssl/rootCA.key -CAcreateserial -out ./ssl/server.crt -days 500 -sha256 -extfile v3.ext
