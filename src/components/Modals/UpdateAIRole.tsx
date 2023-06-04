import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { Modal, ActionIcon, TextInput, Tooltip, Text } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useState, FormEvent } from "react";

function UpdateAIRole() {
  const [opened, { open, close }] = useDisclosure(false);
  const [description, setDescription] = useState<string>("");
  const [system, setSystem_config] = useLocalStorage<string>({
    key: "system_config",
    defaultValue: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSystem_config(description);
    close()
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="AI Role" centered>
        <Text mb={12}>{system}</Text>
        <form onSubmit={handleSubmit}>
          <TextInput
            value={description}
            placeholder="What the purpose of is AI?"
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <button type="submit" style={{ display: "none" }} />
        </form>
      </Modal>

      <ActionIcon onClick={open}>
        <Tooltip label="AI Role" withArrow position="bottom">
          <IconUser color="teal" />
        </Tooltip>
      </ActionIcon>
    </>
  );
}

export default UpdateAIRole;
