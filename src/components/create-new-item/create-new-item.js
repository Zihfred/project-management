import React from "react";
import { Button, Flex, Input } from "antd";
import styles from "./create-new-item.module.scss";

const CreateNewItem = ({ onSubmit, title = "Create new item" }) => {
  const [value, setValue] = React.useState("");

  return (
    <Flex justify={"space-between"} align={"center"}>
      {title}
      <Input
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        disabled={!value.length}
        onClick={() => {
          onSubmit(value);
          setValue("");
        }}
      >
        Create
      </Button>
    </Flex>
  );
};

export default CreateNewItem;
