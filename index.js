// Require modules
const app = require('express')();
const assert = require('assert');
const validUrl = require('valid-url');
const URL = require('./schemas/URL');

// Assign port number
let PORT = process.env.PORT || 3000;

// GET method for /
app.get('/', (req, res) => {
    // Redirect to GitHub repo
    res.redirect('https://github.com/abhaykv04/sankshipt');
});

// GET method for /:id
app.get('/:id', (req, res) => {
    // Invalid ID provided
    if (isNaN(req.params.id)) {
        return res.status(400).send('400: Bad Request: ID must be a number');
    }

    // Valid ID provided, find relevant doc
    URL.findOne({ _id: Number(req.params.id) }, (err, doc) => {
        // Check for error
        assert.equal(err, null);

        // Doc not found
        if (!doc) {
            res.status(404).send('404: ID Not Found');
        } else {
            // Doc found, redirect to original_url
            res.redirect(doc.original_url);
        }
    });
});

// GET method for /new/*
app.get('/new/*', (req, res) => {
    // Extract original_url from params
    let original_url = req.params[0];

    // Check for duplicacy
    URL.findOne({ original_url: original_url }, (err, doc) => {
        // Check for error
        assert.equal(err, null);

        // No duplicate found
        if (!doc) {
            // Validate provided URL
            if (validUrl.isUri(original_url)) {
                // URL is valid, find last doc
                URL.findOne().sort({ _id: -1 }).exec((err, doc) => {
                    // Check for error
                    assert.equal(err, null);

                    // Prepare json
                    let json = {};
                    json._id = doc._id + 1;
                    json.original_url = original_url;
                    json.short_url = 'https://sankshipt.herokuapp.com/' + json._id;

                    // Save json in db
                    URL.create(json, (err, doc) => {
                        // Check for error
                        assert.equal(err, null);
                        // Log doc, send back as json
                        console.log(doc);
                        res.json(doc);
                    });
                });
            } else res.status(400).send('400: Bad Request: Invalid URL'); // Invalid URL
        } else res.json(doc); // URL already in db
    });
});

// Default middleware/method
app.use((req, res) => {
    res.status(404).send('404: Not Found');
});

// Listen for requests
app.listen(PORT, () => {
    console.log('(sankshipt): Listening on port', PORT);
});
