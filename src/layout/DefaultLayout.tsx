import AppDrawer from "@/components/Drawer/AppDrawer";
import AppHeader from "@/components/Headers/AppHeader";
import { Container } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function DefaultLayout({ children }: Props) {
  return (
    <>
      <AppHeader />
      <AppDrawer />
      <Container sx={{ height: "calc(100vh - 56px)" }}>{children}</Container>
    </>
  );
}

export default DefaultLayout;
