import { Box } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function DefaultBox({ children }: Props) {
  return (
    <Box
      pb={24}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 56px)",
      }}
    >
      {children}
    </Box>
  );
}

export default DefaultBox;
