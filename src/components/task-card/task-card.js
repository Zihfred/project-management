import React, { useEffect } from "react";
import { Button, Checkbox, Dropdown, Flex, Input } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import styles from "./task-card.module.scss";

const TaskCard = ({ task, onUpdate, onRemoveTask }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [innerTask, setInnerTask] = React.useState(task);

  useEffect(() => {
    setInnerTask(task);
  }, []);

  const onSave = () => {
    onUpdate(innerTask);
    setIsEditing(false);
  };

  const onCheckboxChange = () => {
    setInnerTask({
      ...innerTask,
      completed: !innerTask.completed,
    });
    onUpdate({
      ...innerTask,
      completed: !innerTask.completed,
    });
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
      onClick: () => onRemoveTask(task),
    },
  ];
  console.log(innerTask);
  return (
    <div
      data-id={"project"}
      className={styles.wrapper}
      onClick={(e) => {
        e.target.dataset.id === "project" && !isEditing && onRemoveTask(task);
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
            value={innerTask.name}
            onChange={(e) =>
              setInnerTask({
                ...innerTask,
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
          <Flex gap={10}>
            <Checkbox
              onChange={onCheckboxChange}
              checked={innerTask.completed}
            />
            <p data-id={"project"}>
              {innerTask?.completed ? (
                <del>{innerTask.name}</del>
              ) : (
                innerTask.name
              )}
            </p>
          </Flex>
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

export default TaskCard;
