import React, { useEffect } from "react";
import { Button, Card, Flex, Input } from "antd";

const ProjectCard = ({ project, onUpdate, onRemoveProject, onOpenProject }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [innerProject, setInnerProject] = React.useState(project);

  useEffect(() => {
    setInnerProject(project);
  }, []);

  const onSave = () => {
    onUpdate(innerProject);
    setIsEditing(false);
  };
  return (
    <Card style={{ height: "80px" }}>
      {isEditing && (
        <Flex
          style={{ height: "30px" }}
          justify={"space-between"}
          align={"center"}
          gap={10}
        >
          <Input
            autoFocus
            value={innerProject.name}
            onChange={(e) =>
              setInnerProject({
                ...innerProject,
                name: e.target.value,
              })
            }
          />
          <Button
            onClick={() => {
              onSave();
              setIsEditing(false);
            }}
          >
            Save
          </Button>
        </Flex>
      )}
      {!isEditing && (
        <Flex
          style={{ height: "30px" }}
          justify={"space-between"}
          align={"center"}
          gap={10}
        >
          <p>{project?.name}</p>
          <Flex gap={10}>
            <Button
              onClick={() => {
                onOpenProject(project);
              }}
            >
              Open
            </Button>
            <Button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Edit
            </Button>
            <Button
              danger
              onClick={() => {
                onRemoveProject(project);
              }}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      )}
    </Card>
  );
};

export default ProjectCard;
