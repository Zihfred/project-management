import React from "react";
import TaskCard from "../task-card/task-card";
import { Flex } from "antd";

const TasksList = ({ tasks, onUpdate, onRemoveTask }) => {
  return (
    <Flex gap={10} vertical>
      {tasks
        ?.sort((a, b) => b.created_at - a.created_at)
        ?.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onRemoveTask={onRemoveTask}
          />
        ))}
    </Flex>
  );
};

export default TasksList;
