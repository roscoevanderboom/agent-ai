import { Command } from "@tauri-apps/api/shell";
import { default as Surreal } from "surrealdb.js";

export async function surrealDB() {
  let db = new Surreal("http://127.0.0.1:8911/rpc");
  // Signin to a scope from the browser
  await db.signin({
    user: "root",
    pass: "root",
  });
  await db.use("agent-ai", "root");
  return db;
}

export async function surrealStart() {
  let command = new Command("surreal");
  command.on("close", () => {
    console.log("DB connection closed");
  });
  command.stderr.on("data", (data) => {
    console.log(data);
  });

  await command.spawn();
}
