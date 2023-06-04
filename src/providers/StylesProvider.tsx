import { DeepPartial } from "@/interfaces";
import { ColorScheme, MantineProvider } from "@mantine/core";
import { ReactNode } from "react";

function StylesProvider({
  children,
  colorScheme,
}: {
  children: ReactNode;
  colorScheme: DeepPartial<ColorScheme> | undefined;
}) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: colorScheme,
      }}
    >
      {children}
    </MantineProvider>
  );
}

export default StylesProvider;
