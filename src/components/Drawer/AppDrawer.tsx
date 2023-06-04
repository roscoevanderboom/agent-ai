import { useAppContext } from "@/App";
import { Drawer, NavLink } from "@mantine/core";
import { FileEntry, readDir } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";
import useServer from "@/hooks/useServer";
import { models_folder } from "@/constants/paths";

export default function AppDrawer() {
  const { drawer, toggleDrawer, isServerRunning } = useAppContext();
  const { startServer } = useServer();
  const [models, setModels] = useState<FileEntry[]>([]);
  const [activeModel, setActiveModel] = useState<string>("");

  const getModels = async () => {
    const contents: FileEntry[] = await readDir(await models_folder());
    if (contents) {
      setModels(contents.filter((m) => m.name?.includes(".bin")));
    }
  };

  const handleSelectModel = async (name: string | undefined) => {
    if (name && !isServerRunning) {
      startServer(name);
      setActiveModel(name);
    } else {
      window.alert("Stop the current server before loading a new model.");
    }
  };

  useEffect(() => {
    getModels();
  }, [drawer]);

  useEffect(() => {
    if (!isServerRunning) {
      setActiveModel("");
    }
  }, [isServerRunning]);

  return (
    <>
      <Drawer.Root size="xs" opened={drawer} onClose={() => toggleDrawer()}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header mb={8}>
            <Drawer.Title>Models</Drawer.Title>
            <Drawer.CloseButton color="dark" />
          </Drawer.Header>
          {models.map((model, i) => (
            <Drawer.Body key={i.toString()}>
              <NavLink
                active={activeModel === model.name}
                label={model.name}
                onClick={() => handleSelectModel(model.name)}
              />
            </Drawer.Body>
          ))}
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
}
