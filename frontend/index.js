const express = require('express');
const app = new express();
const path = require('path');

app.get('/', function(request, response){
    response.sendFile('index.html', { root: __dirname });
});

app.use(express.static(path.join(__dirname)));
app.listen(5555);