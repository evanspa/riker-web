#!/bin/bash

rm -rf dist
gulp devReload --version=0.0.1-SNAPSHOT --useHashHistory=true
