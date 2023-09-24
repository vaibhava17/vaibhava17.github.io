import React from "react";

const Project = ({ params }: { params: { projectId: string } }) => {
  return <div>My Post: {params.projectId} </div>;
};

export default Project;
