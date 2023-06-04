import { useAppContext } from "@/App";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconHandStop } from "@tabler/icons-react";
import { invoke } from "@tauri-apps/api";

function StopChildProcess() {
  const { isServerRunning, toggleLoading } = useAppContext();

  const handleStopProcess = () => {
    toggleLoading(true);
    invoke("kill_child_processes");
  };

  return (
    <ActionIcon onClick={handleStopProcess}>
      <Tooltip label="Stop server" withArrow position="bottom">
        <IconHandStop color={isServerRunning ? "green" : "red"} />
      </Tooltip>
    </ActionIcon>
  );
}

export default StopChildProcess;
