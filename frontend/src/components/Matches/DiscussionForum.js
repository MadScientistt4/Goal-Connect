import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function DiscussionForum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [activePostId, setActivePostId] = useState(null);
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false); // Track if username is set

  const MAX_POSTS = 6;

  useEffect(() => {
    if (isUsernameSet) {
      fetchPosts();
      socket.on("newPost", (post) => {
        setPosts((prevPosts) => {
          const updatedPosts = [...prevPosts, post];
          return updatedPosts.length > MAX_POSTS
            ? updatedPosts.slice(1)
            : updatedPosts;
        });
      });

      socket.on("newReply", (updatedPost) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          )
        );
      });

      socket.on("deletedPost", (postId) => {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      });

      return () => {
        socket.off("newPost");
        socket.off("newReply");
        socket.off("deletedPost");
      };
    }
  }, [isUsernameSet]);

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:5000/api/posts");
    setPosts(response.data);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim() && username.trim()) {
      // Ensure that the post count is within limits
      if (posts.length >= MAX_POSTS) {
        const oldestPostId = posts[0]._id;
        await axios.delete(`http://localhost:5000/api/posts/${oldestPostId}`)
          .catch((error) => console.error("Error deleting oldest post:", error));
      }
      await axios.post("http://localhost:5000/api/posts", {
        content: newPost,
        username,
      })
      .then(() => fetchPosts())
      .catch((error) => console.error("Error posting new post:", error));
      setNewPost("");
    }
  };
  

  const handleReplySubmit = async (postId) => {
    if (replyContent.trim() && username.trim()) {
      await axios.post(`http://localhost:5000/api/posts/${postId}/reply`, {
        content: replyContent,
        username, // Include the username when replying
      });
      setReplyContent("");
      setActivePostId(null);
      fetchPosts();
    }
  };

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setIsUsernameSet(true); // Set username and allow access to the forum
    }
  };

  if (!isUsernameSet) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">Enter a Username</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="border border-gray-300 rounded-md px-2 py-1 mt-2 text-black"
        />
        <button
          onClick={handleUsernameSubmit}
          className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-8 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Discussion Forum</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-gray-100 p-3 rounded-lg shadow">
            <p className="text-gray-800">
              <strong>{post.username}</strong>: {post.content}
            </p>
            <div>
              <button
                onClick={() =>
                  setActivePostId(post._id === activePostId ? null : post._id)
                }
                className="text-blue-500 underline mt-2"
              >
                Reply
              </button>
              {activePostId === post._id && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleReplySubmit(post._id);
                  }}
                  className="mt-2"
                >
                  <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write your reply..."
                    className="border border-gray-300 rounded-md px-2 py-1 w-full text-black"
                  />
                  <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white rounded-md px-2 py-1"
                  >
                    Post Reply
                  </button>
                </form>
              )}
              {post.replies &&
                post.replies.map((reply, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 p-2 rounded-md mt-2 ml-4"
                  >
                    <p className="text-black">
                      <strong>{reply.username}</strong>: {reply.content}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handlePostSubmit} className="mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write your post..."
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md resize-none text-black"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default DiscussionForum;
