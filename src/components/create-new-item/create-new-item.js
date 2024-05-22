import React from "react";
import { Button, Flex, Input } from "antd";
import styles from "./create-new-item.module.scss";

const CreateNewItem = ({ onSubmit, title = "Create new item" }) => {
  const [active, setActive] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Flex justify={"space-between"} align={"center"}>
      {!active && (
        <Button
          type={"primary"}
          onClick={() => {
            setActive(true);
          }}
        >
          {title}
        </Button>
      )}
      {active && (
        <Input
          autoFocus
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onPressEnter={() => {
            onSubmit(value);
            setValue("");
            setActive(false);
          }}
        />
      )}
    </Flex>
  );
};

export default CreateNewItem;
