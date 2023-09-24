import React from "react";

const Blog = ({ params }: { params: { blogId: string } }) => {
  return <div>My Post: {params.blogId} </div>;
};

export default Blog;
