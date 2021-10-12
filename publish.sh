#!/bin/bash

declare -a pilets=("team-blue" "team-green" "team-red" "team-yellow" "team-black")

for pilet in "${pilets[@]}";
do
    echo ${pilet};
    cd ${pilet};
    npm run upload;
    rm *.tgz
    cd ..
done
