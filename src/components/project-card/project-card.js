import React, { useEffect } from "react";
import { Button, Dropdown, Flex, Input } from "antd";
import styles from "./project-card.module.scss";
import { MoreOutlined } from "@ant-design/icons";

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

  const items = [
    {
      key: "1",
      label: "Edit",
      onClick: () => {
        setIsEditing(true);
      },
    },
    {
      key: "2",
      label: "Delete",
      onClick: () => onRemoveProject(project),
    },
  ];

  return (
    <div
      data-id={"project"}
      className={styles.wrapper}
      onClick={(e) => {
        e.target.dataset.id === "project" &&
          !isEditing &&
          onOpenProject(project);
      }}
    >
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
          data-id={"project"}
          style={{ height: "30px" }}
          justify={"space-between"}
          align={"center"}
          gap={10}
        >
          <p data-id={"project"}>{project?.name}</p>
          <div className={styles.contextMenu}>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
              arrow
            >
              <Button type={"text"} icon={<MoreOutlined />}></Button>
            </Dropdown>
          </div>
        </Flex>
      )}
    </div>
  );
};

export default ProjectCard;
