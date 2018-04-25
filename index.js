// Require modules
const app = require('express')();
const assert = require('assert');
const validUrl = require('valid-url');
const URL = require('./schemas/URL');

// Assign port number
let PORT = process.env.PORT || 3000;

var PORT = process.env.PORT || 3000;

// Listen for requests
app.listen(PORT, () => {
    console.log('(sankshipt): Listening on port', PORT);
});