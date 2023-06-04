import { homeDir, join } from "@tauri-apps/api/path";

export const models_folder = async () => {
  const documentDirPath = await homeDir();
  return await join(documentDirPath, "models");
};
