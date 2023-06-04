import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  ActionIcon,
  Box,
  Text,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import { useAppContext } from "@/App";
import { IconDeviceDesktop } from "@tabler/icons-react";

function ConsoleModal() {
  const { serverOutput } = useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Server logs" centered>
        <Box p={12} sx={{ height: "calc(100vh - 130px)", display: "flex" }}>
          <ScrollArea
            sx={{
              flexGrow: 1,
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column-reverse",
            }}
          >
            {serverOutput.map((text, i) => (
              <Text key={i.toString()}>{text}</Text>
            ))}
          </ScrollArea>
        </Box>
      </Modal>

      <ActionIcon onClick={open}>
        <Tooltip label="Console logs" withArrow position="bottom">
          <IconDeviceDesktop color="cyan" />
        </Tooltip>
      </ActionIcon>
    </>
  );
}

export default ConsoleModal;
