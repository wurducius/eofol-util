export const spawnOptions = {
  encoding: "utf8",
  cwd: process.cwd(),
  env: process.env,
  shell: process.platform === "win32",
  stdio: "inherit",
};

export const execCmd = (cmd, args, handleClose) => {
  const executing = spawn(
      cmd,
      ((Array.isArray(args) ? [args] : args).filter(Boolean) as string[]),
      spawnOptions
  );
  executing.on("error", (data) => {
    error(data.message);
  });
  executing.on("close", () => {
    handleClose()
  });
}