// Import required modules
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const admin = require("firebase-admin");
const cors = require("cors");
const serviceAccount = require("./post-it-up-firebase-adminsdk-87mxa-90d8299cd5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://post-it-up-default-rtdb.firebaseio.com",
});

const db = admin.database();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/api/posts", (req, res) => {
  db.ref("posts")
    .once("value")
    .then((snapshot) => {
      const posts = snapshot.val();
      res.json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error fetching posts" });
    });
});

// Route to add a new post
app.post("/api/posts", (req, res) => {
  const { id, title } = req.body;

  const newPost = {
    title,
    comments: [],
  };

  db.ref("posts")
    .child(id)
    .set(newPost)
    .then(() => {
      res.json(newPost);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error adding post" });
    });
});

app.post("/api/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const { text, rating } = req.body;

  const newComment = {
    id: `${Date.now()}`,
    text,
    rating,
  };
  // Retrieve the posts data
  db.ref("posts")
    .child(postId)
    .once("value")
    .then((snapshot) => {
      const post = snapshot.val();
      const changedComments = [...post.comments, newComment] || [newComment];
      if (post) {
        db.ref("posts")
          .child(postId)
          .update({ comments: changedComments })
          .then(() => {
            res.json(changedComments);
          })
          .catch((error) => {
            res.status(500).json({ error: "Error adding comment" });
          });
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    });
});

app.delete("/api/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  db.ref("posts")
    .child(postId)
    .once("value")
    .then((snapshot) => {
      const post = snapshot.val();
      const filteredComments = post.comments.filter((comment) => {
        return comment.id !== commentId;
      });
      if (post) {
        db.ref("posts")
          .child(postId)
          .update({ comments: filteredComments })
          .then(() => {
            res.json(filteredComments);
          })
          .catch((error) => {
            res.status(500).json({ error: "Error adding comment" });
          });
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
