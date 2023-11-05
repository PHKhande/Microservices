const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");

app.use(cors());
app.use(bodyParser.json());
const commentsByPostsId = {};

app.get("/posts/:id/comments", (req, res, next) => {
  res.send(commentsByPostsId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res, next) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostsId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostsId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(4001);
