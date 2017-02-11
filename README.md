# LoyaltyWebApp

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)

## Installation

* `git clone <repository-url>` this repository
* `cd loyalty-webapp`
* `npm install`
* `bower install`

## Running / Development

### Ember APP
* Within APP/, run the command: 
* `ember serve`
* Visit your APP at [http://localhost:4200](http://localhost:4200).

### Node API
* Within API/, run the command:
* npm start
* Visit your API at [http://localhost:3000](http://localhost:3000).

### Twitter Script
* To run the twitter script that scans a user's twitter account, you'll have to do a few things in API/twitter-test.js:
* You have to get credentials from here: https://apps.twitter.com/
* Enter these credentials: consumer_key, consumer_secret, access_token_key, and access_token_secret
* The global variable myTwitterID is hardcoded to be my personal twitter account.
* The customerID is hardcoded to be 11.
