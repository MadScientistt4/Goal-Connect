import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Adjust the URL as needed

function DiscussionForum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [activePostId, setActivePostId] = useState(null);

  const MAX_POSTS = 6; // Maximum number of posts allowed

  useEffect(() => {
    fetchPosts();

    socket.on("newPost", (post) => {
      setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts, post];
        return updatedPosts.length > MAX_POSTS
          ? updatedPosts.slice(1) // Remove the oldest post when exceeding limit
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
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    });

    return () => {
      socket.off("newPost");
      socket.off("newReply");
      socket.off("deletedPost");
    };
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:5000/api/posts");
    setPosts(response.data);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      if (posts.length >= MAX_POSTS) {
        const oldestPostId = posts[0]._id;
        await axios.delete(`http://localhost:5000/api/posts/${oldestPostId}`); // Delete the oldest post
      }
      await axios.post("http://localhost:5000/api/posts", { content: newPost });
      setNewPost("");
      fetchPosts(); // Refresh posts after submitting a new one
    }
  };

  const handleReplySubmit = async (postId) => {
    if (replyContent.trim()) {
      await axios.post(`http://localhost:5000/api/posts/${postId}/reply`, { content: replyContent });
      setReplyContent("");
      setActivePostId(null);
      fetchPosts(); // Refresh posts after submitting a reply
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-8 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Discussion Forum</h2>

      {/* Posts Section */}
      <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-gray-100 p-3 rounded-lg shadow">
            <p className="text-gray-800">{post.content}</p>
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
              {/* Replies Section */}
              {post.replies &&
                post.replies.map((reply, index) => (
                  <div key={index} className="bg-gray-200 p-2 rounded-md mt-2 ml-4">
                    <p>{reply.content}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
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
