import React, { useState, useEffect } from "react";
import axios from "axios";

const Blog = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`
        );
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleClick = (id) => {
    const post = data.find((post) => post.id === id);
    setSelectedPost(post);
  };

  return (
    <div className="blog">
      <div className="ldiv">
        <h1>Maple Blogs</h1>

        <div className="main-blog">
          {!selectedPost ? (
            <h1>{data && data[0].title}</h1>
          ) : (
            <h1>{selectedPost?.title}</h1>
          )}
          {!selectedPost ? (
            <p>{data && data[0].body}</p>
          ) : (
            <p>{selectedPost?.body}</p>
          )}
        </div>
      </div>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem in fetching blog post - ${error}`}</div>
      )}

      <div className="rdiv">
        <h1>Other Posts</h1>
        <ul className="blog-lists">
          {data &&
            data.map(({ id, title, body }) => (
              <li key={id} onClick={() => handleClick(id)}>
                <h2>{title}</h2>
                <p>
                  {body.substring(0, 80)} &nbsp;
                  <span className="readmore">...Read More</span>
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
