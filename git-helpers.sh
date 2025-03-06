#!/bin/bash

# Protocol Pro Git Helper Script

# Colors for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display help
show_help() {
  echo -e "${BLUE}Protocol Pro Git Helper Script${NC}"
  echo -e "${YELLOW}Usage:${NC}"
  echo -e "  ./git-helpers.sh [command]"
  echo -e ""
  echo -e "${YELLOW}Available commands:${NC}"
  echo -e "  ${GREEN}status${NC}        - Show Git status"
  echo -e "  ${GREEN}new-feature${NC}   - Create a new feature branch"
  echo -e "  ${GREEN}new-bugfix${NC}    - Create a new bugfix branch"
  echo -e "  ${GREEN}commit${NC}        - Add all changes and commit"
  echo -e "  ${GREEN}push${NC}          - Push current branch to remote"
  echo -e "  ${GREEN}pull${NC}          - Pull latest changes from remote"
  echo -e "  ${GREEN}main${NC}          - Switch to main branch and pull latest changes"
  echo -e "  ${GREEN}log${NC}           - Show commit history with graph"
  echo -e "  ${GREEN}help${NC}          - Show this help message"
}

# Function to create a new feature branch
new_feature() {
  if [ -z "$1" ]; then
    echo -e "${RED}Error: Feature name is required${NC}"
    echo -e "Usage: ./git-helpers.sh new-feature feature-name"
    exit 1
  fi
  
  echo -e "${BLUE}Creating new feature branch: feature/$1${NC}"
  git checkout -b "feature/$1"
  echo -e "${GREEN}Branch created successfully!${NC}"
}

# Function to create a new bugfix branch
new_bugfix() {
  if [ -z "$1" ]; then
    echo -e "${RED}Error: Bugfix name is required${NC}"
    echo -e "Usage: ./git-helpers.sh new-bugfix bugfix-name"
    exit 1
  fi
  
  echo -e "${BLUE}Creating new bugfix branch: bugfix/$1${NC}"
  git checkout -b "bugfix/$1"
  echo -e "${GREEN}Branch created successfully!${NC}"
}

# Function to add all changes and commit
commit() {
  if [ -z "$1" ]; then
    echo -e "${RED}Error: Commit message is required${NC}"
    echo -e "Usage: ./git-helpers.sh commit \"Your commit message\""
    exit 1
  fi
  
  echo -e "${BLUE}Adding all changes and committing...${NC}"
  git add .
  git commit -m "$1"
  echo -e "${GREEN}Changes committed successfully!${NC}"
}

# Function to push current branch to remote
push() {
  BRANCH=$(git symbolic-ref --short HEAD)
  echo -e "${BLUE}Pushing branch $BRANCH to remote...${NC}"
  git push origin "$BRANCH"
  echo -e "${GREEN}Branch pushed successfully!${NC}"
}

# Function to pull latest changes from remote
pull() {
  BRANCH=$(git symbolic-ref --short HEAD)
  echo -e "${BLUE}Pulling latest changes for branch $BRANCH...${NC}"
  git pull origin "$BRANCH"
  echo -e "${GREEN}Latest changes pulled successfully!${NC}"
}

# Function to switch to main branch and pull latest changes
main() {
  echo -e "${BLUE}Switching to main branch and pulling latest changes...${NC}"
  git checkout main
  git pull origin main
  echo -e "${GREEN}Now on main branch with latest changes!${NC}"
}

# Function to show commit history with graph
log() {
  echo -e "${BLUE}Showing commit history with graph...${NC}"
  git log --graph --oneline --decorate --all
}

# Main script logic
case "$1" in
  status)
    git status
    ;;
  new-feature)
    new_feature "$2"
    ;;
  new-bugfix)
    new_bugfix "$2"
    ;;
  commit)
    commit "$2"
    ;;
  push)
    push
    ;;
  pull)
    pull
    ;;
  main)
    main
    ;;
  log)
    log
    ;;
  help|*)
    show_help
    ;;
esac 