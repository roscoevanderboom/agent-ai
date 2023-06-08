import { useDisclosure } from "@mantine/hooks";
import { Modal, ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { IconFolder, IconSettings } from "@tabler/icons-react";
import ThemeColorToggle from "../Buttons/ThemeColorToggle";
import { open as shell } from "@tauri-apps/api/shell";
import { models_folder } from "@/constants/paths";

function SettingsModel() {
  const [opened, { open, close }] = useDisclosure(false);


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
