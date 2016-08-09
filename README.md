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

- [ ] Currently, the input form only takes airport codes. It would be best to allow users to type cities and suggest airport codes (using the /airports endpoint).
- [ ] Make price matrix clickable. Clickable dates shows only flights for that date. Clickable airlines shows only that airlines. Generally sortable flights rather than just guessing that user wants the cheapest flight.
