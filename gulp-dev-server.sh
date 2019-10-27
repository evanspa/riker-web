#!/bin/bash

rm -rf dist
gulp devServer --rikerVersion="0.0.1-SNAPSHOT" --useHashHistory=false
