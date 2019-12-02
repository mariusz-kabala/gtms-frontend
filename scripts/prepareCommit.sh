#!/bin/sh

GIT_DIR="$(git rev-parse --git-dir)"
DESC="$GIT_DIR/COMMIT_EDITMSG"
BRANCH_NAME=$(git symbolic-ref --short HEAD)
TRIMMED=$(echo "$BRANCH_NAME" | sed -e 's:^\([^-]*-[^-]*\)-.*:\1:' -e\ 'y/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/')

if [ -n "$BRANCH_NAME" ]
then
  if echo "$BRANCH_NAME" | grep -Eq '^(develop|master)$'
  then
    echo "$BRANCH_NAME: $(cat $DESC)" > "$DESC"
  elif echo "$BRANCH_NAME" | grep -Eq '[a-zA-Z0-9]{2,}\-[0-9]+'
  then
    echo "$TRIMMED: $(cat $DESC)" > "$DESC"
  else
    echo "★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆
    \nas your branch name is not in the right format, noting was prepend to your commit message
    \n★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆\n"
  fi
fi