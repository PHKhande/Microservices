const app = require('express')();
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

app.use(bodyParser.json());
const posts = {};

app.get('/posts', (req, res, next) => {
    res.send(posts);
});

app.post('/posts', (req, res, next) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {id, title};
    res.status(201).send(posts[id]);
});

app.listen(4000);