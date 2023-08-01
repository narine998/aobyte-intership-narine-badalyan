const express = require("express");
const cors = require("cors");
const multer = require("multer");
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const serviceAccount = require("./post-it-up-firebase-adminsdk-87mxa-90d8299cd5.json");
const dotenv = require("dotenv");

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
  storageBucket: "gs://post-it-up.appspot.com/",
});

const db = admin.database();
const app = express();
const PORT = process.env.PORT;

const storage = new Storage({
  projectId: "post-it-up",
  keyFilename: "./post-it-up-firebase-adminsdk-87mxa-90d8299cd5.json",
});

const bucket = storage.bucket("gs://post-it-up.appspot.com/");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

app.use(express.json());
app.use(cors());

app.get("/api/posts", (req, res) => {
  db.ref("posts")
    .once("value")
    .then((snapshot) => {
      res.json(snapshot.val());
    })
    .catch((error) => {
      res.status(500).json({ error: "Error fetching posts" });
    });
});

// Route to get a single post
app.get("/api/posts/:postId", (req, res) => {
  const { postId } = req.params;
  db.ref("posts")
    .child(postId)
    .once("value")
    .then((snapshot) => {
      res.json(snapshot.val());
    })
    .catch((error) => {
      res.status(500).json({ error: `Error fetching post with ${postId} id` });
    });
});

//Route to add a new post
app.post("/api/posts", upload.single("image"), async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!title || !file || !description) {
    return res.status(400).json({ error: "Title and image are required." });
  }

  try {
    const fileRef = bucket.file(`images/${file.originalname}`);
    await fileRef.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
        cacheControl: "public, max-age=31536000",
      },
    });

    // Get the publicly accessible URL of the uploaded image
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;

    const postsSnapshot = await db.ref("posts").once("value");
    const posts = postsSnapshot.val() || [];

    const index = Object.keys(posts).length;

    // Create a new post object with image URL
    const newPost = {
      id: index.toString(),
      title,
      description,
      imageUrl: imageUrl, // Get the first URL from the array
      comments: "",
    };

    await db.ref("posts").child(index).set(newPost);
    res.json(newPost);
  } catch (error) {
    console.error("Error adding post with image:", error);
    res.status(500).json({ error: "Error adding post with image" });
  }
});

// route to add new comment
app.post("/api/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const { text, rating } = req.body;

  db.ref("posts")
    .child(postId)
    .once("value")
    .then((snapshot) => {
      const post = snapshot.val();
      const oldComments = post.comments || [];
      const newComment = {
        id: oldComments.length,
        text,
        rating,
        replies: "",
        likes: 0,
      };
      const updatedComments = [...oldComments, newComment];
      if (post) {
        db.ref("posts")
          .child(postId)
          .update({ comments: updatedComments })
          .then(() => {
            res.json(updatedComments);
          })
          .catch((error) => {
            res.status(500).json({ error: "Error adding comment" });
          });
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    });
});

// route to reply to the comment
app.post("/api/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const { text } = req.body;

  db.ref(`posts/${postId}/comments/`)
    .child(commentId)
    .once("value")
    .then((snapshot) => {
      const comment = snapshot.val();
      const commentReplies = comment.replies || [];

      const replyData = {
        id: commentReplies.length,
        text,
      };

      const updatedReplies = [...commentReplies, replyData];

      db.ref(`posts/${postId}/comments/`)
        .child(commentId)
        .update({ replies: updatedReplies })
        .then(() => res.json(updatedReplies))
        .catch((err) =>
          res.status(500).json({ error: "Error repling comment" })
        );
    });
});

//route to delete the comment
app.delete("/api/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  db.ref("posts")
    .child(postId)
    .once("value")
    .then((snapshot) => {
      const post = snapshot.val();
      const filteredComments = post.comments.filter((comment) => {
        return comment.id != commentId;
      });
      if (post) {
        db.ref("posts")
          .child(postId)
          .update({ comments: filteredComments.length ? filteredComments : "" })
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

//route to like the comment
app.patch("api/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const { likes } = req.body;
  console.log(likes);

  db.ref(`posts/${postId}/comments/${commentId}/`)
    .update({ likes })
    .then(() => res.json({ likes }))
    .catch(res.status(500).json({ error: "Error liking comment" }));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
