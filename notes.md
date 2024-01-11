# CS 260 Notes
## Lesson 1: Git & GitHub
Git provides 2 things:
1. Version tracking in a repository
2. The ability to clone a copy of the repository to a different location

The following are useful git commands:
 - git clone <link>: This clones a repo to your pwd
 - git add <filename>: This stages a file so it is ready to be committed
 - git commit -am "message": This commits all of your changes.  Remove the a if you just want your previously staged files committed
 - git pull: Pulls the repository's latest changes from GitHub
 - git push: Pushes your changes that you've committed locally to GitHub
 - git fetch: Retrieves the latest information about the changes on GitHub without changing your local repository
 - git status: When run after git fetch it will show us the differences between our local repo and the one on GitHub
