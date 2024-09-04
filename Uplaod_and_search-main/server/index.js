const express = require("express");
const cors = require("cors");
const {
  getPosts,
  likePost,
  unlikePost,
  commentOnPost,
  deleteCommentOnPost,
  addPosts,
} = require("./functions");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.0.103:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/posts", getPosts);
app.post("/posts/add", addPosts);
app.post("/posts/like/:id", likePost);
app.post("/posts/unlike/:id", unlikePost);
app.post("/posts/comment/:id", commentOnPost);
app.post("/posts/uncomment/:id", deleteCommentOnPost);

app.listen(8000, () => {
  console.log("running on port 8000");
});
