# borrowed from https://gist.github.com/JamieMason/4761049

#!/bin/bash

# Functions ==============================================

# return 1 if global command line program installed, else 0
# example
# echo "node: $(program_is_installed node)"
function program_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# display a message in red with a cross by it
# example
# echo echo_fail "No"
function echo_fail {
  # echo first argument in red
  printf "\e[31m✘ ${1} \033[0m"
}

# display a message in green with a tick by it
# example
# echo echo_fail "Yes"
function echo_pass {
  # echo first argument in green then reset colors to normal
  printf "\e[32m✔ ${1} \033[0m"
}

# echo pass or fail
# example
# echo echo_if 1 "Passed"
# echo echo_if 0 "Failed"
function echo_if {
  if [ $1 == 1 ]; then
    echo_pass $2
  else
    echo_fail $2
  fi
}

echo
echo "Thanks for reviewing my code challenge!"
echo "Checking if necessary dev environment exists..."
echo

NODE_INSTALLED=$(program_is_installed node)
NPM_INSTALLED=$(program_is_installed npm)

echo "node $(echo_if $NODE_INSTALLED)"
echo "npm $(echo_if $NPM_INSTALLED)"

if [ "$NODE_INSTALLED" == 0 ]; then
  printf "\e[31mPlease install Node.js first."
  exit
fi

if [ "$NPM_INSTALLED" == 0 ]; then
  printf "\e[31mPlease install npm first. It's surprising you have Node.js installed, but not npm."
  exit
fi

echo
echo "Installing dependencies."
echo
npm install
echo

echo
echo "Bundling components and launching."
echo
node -e "require('grunt').tasks(['default']);"
echo

exit
