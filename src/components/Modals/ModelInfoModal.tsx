import { useDisclosure, useSetState } from "@mantine/hooks";
import { Modal, ActionIcon, Text, Tooltip, ScrollArea } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useAppContext } from "@/App";
import { useEffect } from "react";
import buildParamsObject from "@/utils/buildParamsObject";

function ModelInfoModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const { serverOutput, isServerRunning } = useAppContext();
  const [params, setParams] = useSetState<{ keys: string[]; values: string[] }>(
    { keys: [], values: [] }
  );

  useEffect(() => {
    if (serverOutput.length > 0 && isServerRunning) {
      const params = buildParamsObject(serverOutput);
      setParams({ keys: Object.keys(params) });
      setParams({ values: Object.values(params) });
    } else {
      setParams({ keys: [], values: [] });
    }
  }, [serverOutput]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Model params" centered>
        <ScrollArea>
          {params.keys.map((key, i) => (
            <Text key={i.toString()}>
              {key}: {params.values[i]}{" "}
            </Text>
          ))}
        </ScrollArea>
      </Modal>

      <ActionIcon onClick={open}>
        <Tooltip label="Model info" withArrow position="bottom">
          <IconInfoCircle color="yellow" />
        </Tooltip>
      </ActionIcon>
    </>
  );
}

export default ModelInfoModal;
