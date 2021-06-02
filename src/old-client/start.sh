#!/bin/bash

rm -rf ../../public/*
elm make pages/HomePage.elm --output ../../public/elm.js
cp index.html ../../public/.
tsc workers/cypher.ts --module es6 --target es5 --lib "webworker","es5","scripthost" --outDir ../../public
http-server ../../public
