#!/bin/bash

mongoimport -h localhost:27017 -d Arts -c artworks --drop --jsonArray ./db/artworks.json
mongoimport -h localhost:27017 -d Arts -c artists --drop --jsonArray ./db/artists.json