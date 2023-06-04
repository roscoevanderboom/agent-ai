import { useLocalStorage } from "@mantine/hooks";
import { TextInput, Box } from "@mantine/core";
import { FormEvent, useState } from "react";

function AssistantConfig() {
  const [description, setDescription] = useState<string>("");
  const [_, setSystem_config] = useLocalStorage<string>({
    key: "system_config",
    defaultValue: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSystem_config(description);
  };

  return (
    <Box
      pb={12}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 56px)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          value={description}
          placeholder="What is my purpose?"
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <button type="submit" style={{ display: "none" }} />
      </form>
    </Box>
  );
}

export default AssistantConfig;
