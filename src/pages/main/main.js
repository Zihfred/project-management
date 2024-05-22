import React, { useEffect } from "react";
import CreateNewItem from "../../components/create-new-item/create-new-item";
import projectService from "../../services/projectService";
import styles from "./main.module.scss";
import ProjectList from "../../components/project-list/project-list";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = React.useState([]);
  const onAddProject = async (project) => {
    const res = await projectService.createProject(project);
    setProjects(res);
  };
  const fetchProjects = async () => {
    const projects = await projectService.getProjects();
    setProjects(projects);
  };

  const onUpdateProject = async (project) => {
    const res = await projectService.updateProject(project.id, project);
    setProjects(res);
  };

  const onRemoveProject = async (project) => {
    const res = await projectService.deleteProject(project.id);
    setProjects(res);
  };

  const onOpenProject = (project) => {
    navigate(`/project/${project.id}`);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <h1 className={styles.title}>Projects:</h1>
      <div className={styles.addProjectWrapper}></div>
      <div className={styles.projectsWrapper}>
        <ProjectList
          projects={projects}
          onUpdateProject={onUpdateProject}
          onRemoveProject={onRemoveProject}
          onOpenProject={onOpenProject}
        />
        <div className={styles.addButton}>
          <CreateNewItem title={"Add new project"} onSubmit={onAddProject} />
        </div>
      </div>
    </>
  );
};

export default Main;
