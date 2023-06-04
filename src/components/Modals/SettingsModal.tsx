import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { Modal, ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { IconFolder, IconSettings, IconTrashX } from "@tabler/icons-react";
import ThemeColorToggle from "../Buttons/ThemeColorToggle";
import { MessageProps } from "@/interfaces";
import { open as shell } from "@tauri-apps/api/shell";
import { ask } from "@tauri-apps/api/dialog";
import { models_folder } from "@/constants/paths";

function SettingsModel() {
  const [opened, { open, close }] = useDisclosure(false);
  const [_h, setHistory] = useLocalStorage<MessageProps[]>({
    key: "chat_history",
    defaultValue: [],
  });
  const [_s, setSystem] = useLocalStorage<string>({
    key: "system_config",
    defaultValue: "",
  });

  const clearHistory = async () => {
    let res = await ask("Are you sure?");
    if (res) {
      setHistory([]);
      setSystem("");
    }
  };

  const handleOpenModelsDir = async () => {
    await shell(await models_folder());
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="App settings" centered>
        <Group position="apart" my="md">
          <Text>Set theme</Text>
          <ThemeColorToggle />
        </Group>
        <Group position="apart" my="md">
          <Text>Clear current conversation</Text>
          <ActionIcon onClick={clearHistory}>
            <IconTrashX color="red" />
          </ActionIcon>
        </Group>
        <Group position="apart" my="md">
          <Text>Open models folder</Text>
          <ActionIcon onClick={handleOpenModelsDir}>
            <IconFolder color="cyan" />
          </ActionIcon>
        </Group>
      </Modal>

      <ActionIcon onClick={open}>
        <Tooltip label="Settings" withArrow position="bottom">
          <IconSettings />
        </Tooltip>
      </ActionIcon>
    </>
  );
}

export default SettingsModel;
