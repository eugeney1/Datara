"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "/app/globals.css";

export default function HomePage() {
  const [sectionStates, setSectionStates] = useState({
    communities: true,
    recent: true,
    resources: true,
    createPost: false, // Track the state for creating a post
  });

  const [posts, setPosts] = useState({
    joinedPosts: {},
    postTimes: [],
    postDetails: [], // Ensure postDetails is always an empty array by default
  });

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image: null, // Store the image as a file object
  });

  useEffect(() => {
    const initialPostTimes = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6)); // Random minutes between 0 and 5
    setPosts((prevPosts) => ({
      ...prevPosts,
      postTimes: initialPostTimes,
    }));

    const interval = setInterval(() => {
      setPosts((prevPosts) => ({
        ...prevPosts,
        postTimes: prevPosts.postTimes.map((time) => time + 1), // Increment each post time by 1 minute
      }));
    }, 60000); // Update every minute (1 minute = 60000ms)

    // Retrieve stored posts from localStorage on component mount
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }

    return () => clearInterval(interval);
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost((prevPost) => ({
        ...prevPost,
        image: URL.createObjectURL(file), // Create a URL for the selected file to preview it
      }));
    }
  };

  const handleCreatePost = () => {
    setPosts((prevPosts) => ({
      ...prevPosts,
      postDetails: [
        ...prevPosts.postDetails,
        {
          title: newPost.title,
          content: newPost.content,
          image: newPost.image, // Save the image URL in the post details
          likes: 0,
          comments: [], // Initialize an empty comments array
        },
      ],
      postTimes: [0, ...prevPosts.postTimes], // New post created now (0 minutes ago)
    }));

    setNewPost({
      title: '',
      content: '',
      image: null, // Reset the image after submission
    });

    setSectionStates((prevState) => ({ ...prevState, createPost: false }));
  };

  const toggleSection = (section) => {
    setSectionStates((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const toggleJoin = (postId) => {
    setPosts((prevPosts) => ({
      ...prevPosts,
      joinedPosts: {
        ...prevPosts.joinedPosts,
        [postId]: !prevPosts.joinedPosts[postId],
      },
    }));
  };

  const formatTime = (timeInMinutes) => {
    return `${timeInMinutes} minute${timeInMinutes === 1 ? "" : "s"} ago`;
  };

  const handleLike = (index) => {
    const updatedPosts = [...posts.postDetails];
    updatedPosts[index].likes += 1;
    setPosts((prevPosts) => ({
      ...prevPosts,
      postDetails: updatedPosts,
    }));
  };

  const handleCommentChange = (e, index) => {
    const { value } = e.target;
    const updatedPosts = [...posts.postDetails];
    updatedPosts[index].newComment = value;
    setPosts((prevPosts) => ({
      ...prevPosts,
      postDetails: updatedPosts,
    }));
  };

  const handleSubmitComment = (index) => {
    const updatedPosts = [...posts.postDetails];
    if (updatedPosts[index].newComment.trim()) {
      updatedPosts[index].comments.push({
        text: updatedPosts[index].newComment,
        replies: [], // Initialize replies array for the comment
      });
      updatedPosts[index].newComment = '';
      setPosts((prevPosts) => ({
        ...prevPosts,
        postDetails: updatedPosts,
      }));
    }
  };

  const handleReplyChange = (e, postIndex, commentIndex) => {
    const { value } = e.target;
    const updatedPosts = [...posts.postDetails];
    updatedPosts[postIndex].comments[commentIndex].newReply = value;
    setPosts((prevPosts) => ({
      ...prevPosts,
      postDetails: updatedPosts,
    }));
  };

  const handleSubmitReply = (postIndex, commentIndex) => {
    const updatedPosts = [...posts.postDetails];
    if (updatedPosts[postIndex].comments[commentIndex].newReply.trim()) {
      updatedPosts[postIndex].comments[commentIndex].replies.push(
        updatedPosts[postIndex].comments[commentIndex].newReply
      );
      updatedPosts[postIndex].comments[commentIndex].newReply = '';
      setPosts((prevPosts) => ({
        ...prevPosts,
        postDetails: updatedPosts,
      }));
    }
  };

  return (
    <main className="bg-[#121212] text-[#D1D1D1] min-h-screen font-sans">
      {/* Fixed Top Bar */}
      <header className="flex items-center justify-between bg-[#0D0D0D] p-6 shadow-2xl border-b-2 border-[#00FFAB] fixed w-full top-0 z-10">
        <div className="flex items-center space-x-6">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <img
              className="object-scale-down h-14 w-14 rounded-lg cursor-pointer transform hover:scale-110 transition duration-300"
              src="/images/Screenshot%202024-11-26%20122532.png"
              alt="Datara Logo"
            />
          </a>
        </div>

        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search the future..."
            className="w-full px-6 py-3 bg-[#1B1B1B] text-white rounded-full focus:outline-none placeholder-gray-500 transition-all duration-300 transform hover:scale-105"
          />
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-white hover:text-[#00FFAB] transition duration-200">Chat</button>
          <button className="text-white hover:text-[#00FFAB] transition duration-200">Notifications</button>
          <Link href="/profile">
            <button className="text-white hover:text-[#00FFAB] transition duration-200">Profile</button>
          </Link>
          <Link href="/signin">
            <button className="text-white hover:text-[#00FFAB] transition duration-200">Sign In</button>
          </Link>
          <button
            onClick={() => setSectionStates((prevState) => ({ ...prevState, createPost: !prevState.createPost }))}
            className="bg-[#00FFAB] text-black px-6 py-2 rounded-full hover:bg-[#00CC8B] transition duration-300 transform hover:scale-110"
          >
            Create Post
          </button>
        </div>
      </header>

{/* Main Layout */}
<div className="flex flex-grow pt-24">
  {/* Sidebar Navigation */}
  <aside className="w-1/5 bg-[#1A1A1A] p-8 flex flex-col space-y-8 shadow-lg border-r border-[#00FFAB] fixed top-24 left-0 h-[calc(100vh-6rem)] overflow-y-auto">
    <img
      src="/images/Screenshot%202024-11-26%20122532.png"
      alt="Datara Logo"
      className="h-32 w-32 object-scale-down rounded-full mx-auto border-4 border-[#00FFAB] transform hover:rotate-180 transition duration-500"
    />
    <nav className="space-y-6">
      {["homepage", "Popular", "Explore", "All"].map((tab) => (
        <Link
          key={tab}
          href={`/${tab}`}
          className="block px-6 py-3 rounded-md text-lg font-semibold transition-all duration-300 transform hover:bg-[#00FFAB] hover:text-black"
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </Link>
      ))}
    </nav>

    <div className="space-y-6">
      {/* RECENT Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer group"
          onClick={() => toggleSection("recent")}
        >
          <h3 className="text-lg font-bold group-hover:text-[#00FFAB]">RECENT</h3>
          <span className="text-[#00FFAB]">{sectionStates.recent ? "↑" : "↓"}</span>
        </div>
        {sectionStates.recent && (
          <ul className="space-y-2 mt-2">
            <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
              Recent Community 1
            </li>
            <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
              Recent Community 2
            </li>
          </ul>
        )}
      </div>

      {/* Divider */}
      <hr className="my-4 border-[#00FFAB]" />

      {/* COMMUNITIES Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer group"
          onClick={() => toggleSection("communities")}
        >
          <h3 className="text-lg font-bold group-hover:text-[#00FFAB]">COMMUNITIES</h3>
          <span className="text-[#00FFAB]">{sectionStates.communities ? "↑" : "↓"}</span>
        </div>
        {sectionStates.communities && (
          <ul className="space-y-2 mt-2">
            <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
              d/YourCommunity1
            </li>
            <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
              d/YourCommunity2
            </li>
          </ul>
        )}
      </div>

      {/* Divider */}
      <hr className="my-4 border-[#00FFAB]" />

      {/* RESOURCES Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer group"
          onClick={() => toggleSection("resources")}
        >
          <h3 className="text-lg font-bold group-hover:text-[#00FFAB]">RESOURCES</h3>
          <span className="text-[#00FFAB]">{sectionStates.resources ? "↑" : "↓"}</span>
        </div>
        {sectionStates.resources && (
          <ul className="space-y-2 mt-2">
            <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
              About Datara
            </li>
            <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
              Content Policy
            </li>
            <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
              Privacy Policy
            </li>
            <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
              User Agreement
            </li>
          </ul>
        )}
      </div>
    </div>
  </aside>

        {/* Main Content Area */}
        <div className="flex-1 p-8 space-y-8 bg-[#1B1B1B] ml-[20%] overflow-y-auto">
          <h1 className="text-5xl font-bold mb-6 text-center text-[#00FFAB] transform hover:scale-110">
            For you
          </h1>

          {/* Create Post Form */}
          {sectionStates.createPost && (
            <div className="bg-[#333333] p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
              <h2 className="text-xl font-bold text-[#00FFAB] mb-4">Create a Post</h2>
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                placeholder="Post Title"
                className="w-full p-3 mb-4 rounded-lg bg-[#1A1A1A] text-[#D1D1D1] border-none focus:outline-none"
              />
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                placeholder="Post Content"
                className="w-full p-3 mb-4 rounded-lg bg-[#1A1A1A] text-[#D1D1D1] border-none focus:outline-none"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full mb-4 text-[#D1D1D1] bg-[#1A1A1A] p-3 rounded-lg border-none"
              />
              {newPost.image && <img src={newPost.image} alt="Preview" className="w-full mb-4 rounded-lg" />}
              <button
                onClick={handleCreatePost}
                className="bg-[#00FFAB] text-black px-6 py-2 rounded-full hover:bg-[#00CC8B] transition duration-300 transform hover:scale-110"
              >
                Create Post
              </button>
            </div>
          )}

          {/* Posts Section */}
          {posts.postDetails && posts.postDetails.length > 0 && (
            <div className="space-y-8">
              {posts.postDetails.map((post, index) => (
                <div key={index} className="bg-[#2A2A2A] p-6 rounded-xl shadow-lg max-w-lg mx-auto">
                  <div className="text-xl font-semibold text-[#00FFAB] mb-4">{post.title}</div>
                  <div className="text-lg text-[#D1D1D1] mb-4">{post.content}</div>
                  {post.image && <img src={post.image} alt="Post" className="mb-4 rounded-lg" />}
                  <div className="text-sm text-[#888888] mb-4">
                    Posted {formatTime(posts.postTimes[index])}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(index)}
                      className="flex items-center space-x-2 text-[#00FFAB] transition duration-200 transform hover:scale-105"
                    >
                      <span>Like</span>
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => toggleJoin(index)}
                      className="flex items-center space-x-2 text-[#00FFAB] transition duration-200 transform hover:scale-105"
                    >
                      <span>{posts.joinedPosts[index] ? "Joined" : "Join"}</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-4">
                    {post.comments.length > 0 && (
                      <div className="space-y-4">
                        {post.comments.map((comment, commentIdx) => (
                          <div key={commentIdx} className="bg-[#333333] p-4 rounded-lg">
                            <span className="text-sm text-[#D1D1D1]">{comment.text}</span>

                            {/* Replies */}
                            <div className="space-y-2 mt-2">
                              {comment.replies.map((reply, replyIdx) => (
                                <div key={replyIdx} className="bg-[#444444] p-2 rounded-lg">
                                  <span className="text-sm text-[#D1D1D1]">{reply}</span>
                                </div>
                              ))}
                              <textarea
                                value={comment.newReply || ""}
                                onChange={(e) => handleReplyChange(e, index, commentIdx)}
                                placeholder="Reply to this comment..."
                                className="w-full p-3 mt-2 rounded-lg bg-[#1A1A1A] text-[#D1D1D1] border-none focus:outline-none"
                              />
                              <button
                                onClick={() => handleSubmitReply(index, commentIdx)}
                                className="bg-[#00FFAB] text-black px-6 py-2 mt-2 rounded-full hover:bg-[#00CC8B] transition duration-300 transform hover:scale-110"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <textarea
                      value={post.newComment || ""}
                      onChange={(e) => handleCommentChange(e, index)}
                      placeholder="Add a comment..."
                      className="w-full p-3 mt-4 rounded-lg bg-[#1A1A1A] text-[#D1D1D1] border-none focus:outline-none"
                    />
                    <button
                      onClick={() => handleSubmitComment(index)}
                      className="bg-[#00FFAB] text-black px-6 py-2 mt-2 rounded-full hover:bg-[#00CC8B] transition duration-300 transform hover:scale-110"
                    >
                      Submit Comment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
