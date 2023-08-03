const express = require("express");
const cors = require("cors");
const multer = require("multer");
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const serviceAccount = require("./post-it-up-firebase-adminsdk-87mxa-90d8299cd5.json");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

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

//route to fetch all posts
app.get("/api/posts", (req, res) => {
  db.ref("posts")
    .once("value")
    .then((snapshot) => {
      const posts = snapshot.val();
      if (posts) {
        for (let key in posts) {
          posts[key].comments = posts[key].comments
            ? Object.values(posts[key].comments)
            : [];
          for (let com of posts[key].comments) {
            com.replies = Object.values(com.replies);
          }
        }
        res.json(Object.values(posts));
      } else {
        res.json(null);
      }
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
      const post = snapshot.val();
      post.comments = post.comments ? Object.values(post.comments) : [];
      res.json(post);
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

    const id = uuidv4();

    // Create a new post object with image URL
    const newPost = {
      id,
      title,
      description,
      imageUrl: imageUrl, // Get the first URL from the array
      comments: "",
    };

    await db.ref("posts").child(id).set(newPost);
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
      const oldComments = post.comments || {};

      const id = uuidv4();
      const newComment = {
        id,
        text,
        rating,
        replies: "",
        likes: 0,
      };

      const updatedComments = [...Object.values(oldComments), newComment];
      if (post) {
        db.ref(`posts/${postId}/comments/`)
          .child(id)
          .set(newComment)
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

//route to delete the comment
app.delete("/api/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;

  db.ref(`posts/${postId}/comments/`)
    .child(commentId)
    .remove()
    .then(() => {
      db.ref("posts")
        .child(postId)
        .once("value")
        .then((snapshot) => {
          const post = snapshot.val();
          res.json(post.comments ? Object.values(post.comments) : []);
        })
        .catch((error) => {
          res.status(500).json({ error: "Error deleting comment" });
        });
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
      const commentReplies = comment.replies || {};

      const id = uuidv4();
      const replyData = {
        id,
        text,
      };

      const updatedReplies = [...Object.values(commentReplies), replyData];
      console.log(updatedReplies);

      db.ref(`posts/${postId}/comments/${commentId}/replies`)
        .child(id)
        .set(replyData)
        .then(() => res.json(updatedReplies))
        .catch((err) =>
          res.status(500).json({ error: "Error repling comment" })
        );
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
