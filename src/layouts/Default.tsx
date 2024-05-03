import { Outlet, ScrollRestoration } from "react-router-dom";
import { Container, IconButton, chakra, useColorMode, Tooltip } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa"
import { WarningIcon } from "@chakra-ui/icons";

export function DefaultLayout() {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <chakra.div width={"100%"}>
            <chakra.div minHeight={"100vh"} width={"100%"}>
                <chakra.main marginBottom={"2rem"}>
                    <Tooltip label="If you either get randomly disconnected, get a lot of Popups or have some other issue, a reload helps often." placement="left">
                        <IconButton
                            aria-label="reload page"
                            borderRadius={"10px"}
                            size="md"
                            position="fixed"
                            top={4}
                            backgroundColor={colorMode === "dark" ? "red.700" : "red.400"}
                            color={colorMode === "dark" ? "gray.200" : "gray.100"}
                            _hover={{ backgroundColor: colorMode === "dark" ? "red.800" : "red.300" }}
                            right={4}
                            onClick={() => window.location.reload()}
                            icon={<WarningIcon />}
                        />
                    </Tooltip>
                    <Container maxW={"6xl"} color={colorMode === "dark" ? "gray.400" : "gray.700" }>
                        <Outlet />
                    </Container>
                </chakra.main>
            </chakra.div>
            <Tooltip label={colorMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"} placement="right">
                <IconButton
                    aria-label="toggle theme"
                    rounded="full"
                    size="xs"
                    position="fixed"
                    bottom={4}
                    left={4}
                    onClick={toggleColorMode}
                    icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
                />
            </Tooltip>
            <ScrollRestoration />
        </chakra.div>
    );
}
