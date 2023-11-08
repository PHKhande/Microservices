const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

app.use(cors());
app.use(bodyParser.json());
const commentsByPostsId = {};

app.get("/posts/:id/comments", (req, res, next) => {
  res.send(commentsByPostsId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res, next) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostsId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostsId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: req.params.id },
  });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("EVENT RECIEVED: ", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
