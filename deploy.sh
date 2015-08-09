#!/bin/bash

git add .
git commit -m "deploying"
git push origin master

##
git branch -D gh-pages
git checkout --orphan gh-pages

./build.py --full
mv simulator .tmp

rm -rf *
rm .gitignore

mv .tmp/* .
rm -r .tmp

##
git add .
git commit -m "build"

git push origin --delete gh-pages

git push origin gh-pages

##
git checkout master
