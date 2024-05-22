import React, { useEffect } from "react";
import { Button, Card, Checkbox, Flex, Input } from "antd";

const TaskCard = ({ task, onUpdate, onRemoveTask }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [innerTask, setInnerTask] = React.useState(task);

  useEffect(() => {
    setInnerTask(task);
  }, [task]);

  const onSave = () => {
    onUpdate(innerTask);
    setIsEditing(false);
  };

  const onCompleteChange = () => {
    onUpdate({
      ...innerTask,
      completed: !innerTask.completed,
    });
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
          style={{ height: "30px" }}
          justify={"space-between"}
          align={"center"}
          gap={10}
        >
          <Flex gap={10}>
            <Checkbox
              checked={innerTask.completed}
              onClick={onCompleteChange}
            />
            <p>
              {innerTask?.completed ? (
                <del>{innerTask?.name}</del>
              ) : (
                innerTask?.name
              )}
            </p>
          </Flex>
          <Flex gap={10}>
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
                onRemoveTask(task);
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

export default TaskCard;
