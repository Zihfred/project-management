import React, { useEffect } from "react";
import { Button } from "antd";
import { Link, useParams } from "react-router-dom";
import projectService from "../../services/projectService";
import styles from "./project.module.scss";
import { routes } from "../../App";
import TasksList from "../../components/tasks-list/tasks-list";
import CreateNewItem from "../../components/create-new-item/create-new-item";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = React.useState("");

  const fetchProject = async () => {
    const project = await projectService.getProjectById(id);
    setProject(project);
  };

  const onRemoveTask = async (task) => {
    const res = await projectService.deleteTask(project.id, task.id);
    setProject(res);
  };

  const onUpdateTask = async (task) => {
    const res = await projectService.updateTask(project.id, task);
    setProject(res);
  };

  const onAddNewTask = async (task) => {
    const res = await projectService.addTask(project.id, task);
    setProject(res);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.backButtonWrapper}>
        <Link to={routes.main} className={styles.backButton}>
          <Button type={"text"}>Back to projects</Button>
        </Link>
      </div>
      <div className={styles.tasksWrapper}>
        <h1>{project?.attributes?.name}</h1>
        <TasksList
          tasks={project?.tasks}
          onUpdate={onUpdateTask}
          onRemoveTask={onRemoveTask}
        />
        <div className={styles.addTaskWrapper}>
          <CreateNewItem title={"Add new task"} onSubmit={onAddNewTask} />
        </div>
      </div>
    </div>
  );
};

export default Project;
