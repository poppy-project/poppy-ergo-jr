# saving work just in case
git add .
git commit -m "deploying"
# pushing to remote master branch
git push origin master

# on the first run create the gh-pages branch (uncomment next line)
git branch gh-pages

# creating  local gh-pages branch (on the second and subsequent runs checkout and merge from master)
# git checkout gh-pages
# git merge master

# saving work on local branch
git add .
git commit -m "deploying"

# pushing (and creating if needed) to remote gh-pages branch
git push origin gh-pages

# coming back to master branch
git checkout master
