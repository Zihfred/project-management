import React from "react";
import ProjectCard from "../project-card/project-card";
import { Flex } from "antd";

const ProjectList = ({
  projects,
  onUpdateProject,
  onRemoveProject,
  onOpenProject,
}) => {
  console.log(projects);
  return (
    <Flex gap={10} vertical>
      {projects?.length > 0 &&
        projects
          .sort((a, b) => a.created_at - b.created_at)
          .map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onUpdate={onUpdateProject}
              onRemoveProject={onRemoveProject}
              onOpenProject={onOpenProject}
            />
          ))}
    </Flex>
  );
};

export default ProjectList;
