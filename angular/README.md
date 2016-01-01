# AngularJS Blog version

This is the AngularJS implementation of the Blog
 
## Installation

To install all node dependencies: 

    npm install
    npm install gulp -g
    npm install casperjs -g
    npm install phantomjs -g

## Running

To start a development server 

    gulp serve

Open [http://localhost:3000](http://localhost:3000)

## Tests

To run tests

    gulp test:specs
    gulp test:e2e

To run CSS regression tests

    gulp serve &
    
    cd ./node_modules/backstopjs/
    gulp test
    
