#!/bin/bash

rm -rf ../../public/*
elm make pages/HomePage.elm --output ../../public/elm.js
cp index.html ../../public/.
cp elm.js ../../public/.
tsc workers/cypher.ts --module umd --target es5 --outDir ../../public
http-server ../../public
