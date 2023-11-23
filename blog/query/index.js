const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    res.send({});
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    posts[postId].comments.push({ id, content });
    res.send({});
  }
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
