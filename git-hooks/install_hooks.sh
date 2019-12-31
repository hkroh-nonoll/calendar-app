#!/usr/bin/env bash
# get git directory
ROOT=$(git rev-parse --show-toplevel)

# prepare-commit-msg
if [ -f "$ROOT"/.git/hooks/prepare-commit-msg ];then
  echo "WARNING: File .git/hooks/prepare-commit-msg already exists! Overwriting previous version..."
  cp "$ROOT"/git-hooks/prepare-commit-msg "$ROOT"/.git/hooks/prepare-commit-msg
  chmod +x "$ROOT"/.git/hooks/prepare-commit-msg
else
  cp "$ROOT"/git-hooks/prepare-commit-msg "$ROOT"/.git/hooks/prepare-commit-msg
  chmod +x "$ROOT"/.git/hooks/prepare-commit-msg
  echo "SUCCESS: File .git/hooks/prepare-commit-msg"
fi
