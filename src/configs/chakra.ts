import { type ToastProviderProps, extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({});

export const toastOptions: ToastProviderProps = {
  defaultOptions: {
    duration: 3000,
    isClosable: true,
    position: "top-right",
  },
};
