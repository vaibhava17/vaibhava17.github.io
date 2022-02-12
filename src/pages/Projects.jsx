import React from "react";
import { useLocation } from "react-router-dom";
import AppCarousel from "../components/Carousel/Carousel";
import { ProjectsData } from "../data/projects";

const Projects = () => {
  const location = useLocation();
  return (
    <div className="section d-flex position-relative" id="projects">
      <div className="my-auto p-md-5 p-3 me-md-5 w-100">
        {location.pathname === "/projects" ? null : (
          <i className="fas fa-code-branch position-absolute bg-projects" />
        )}
        <h3 className="text-light text-md-start text-center">Projects</h3>
        <div className="mt-md-5 mt-3 projects">
          <AppCarousel data={ProjectsData} />
        </div>
      </div>
    </div>
  );
};

export default Projects;
