# Flight-Search
A simple fullstack web application which accesses an outside API to search for flights.

## System Requirements

- Node.js
- npm (comes with Node)
- Modern browser
- Internet connection

## Run

1. Clone the repository to your local machine.
1. `cd Flight-Search/`
1. `bash start.sh`
  - Installs npm packages
  - Starts server
  - Launches page on localhost:3000

## Todo's
- [ ] Make price matrix clickable. Clickable dates shows only flights for that date. Clickable airlines shows only that airlines. Generally sortable flights rather than just guessing that user wants the cheapest flight.
- [ ] Improving styling and account for edge cases in city suggestions. Sometimes, the input box is not large enough, sometimes locations do not have states.
- [ ] Shim jquery-ui and accompanying css into browserify.
- [ ] Find ways to optimize. Best case solution is currently quadratic time complexity.