const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const apps = require('./playstore.js');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

app.use(cors());

app.get('/apps', (req, res) => {

    const { sort, genres } = req.query;

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of rating or app');
        }
    }

    let results = apps;
    if(genres){
        results = results.filter(item =>
            item
                .Genres
                .includes(genres)
        );
    }
        
    console.log(results);

    if (sort) {
        results = results.sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            });
    }


    res
        .json(results);
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});