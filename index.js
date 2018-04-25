const app = require('express')();
const validUrl = require('valid-url');

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('(sankshipt): Listening on port', PORT);
});