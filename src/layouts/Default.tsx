import { Outlet, ScrollRestoration } from "react-router-dom";
import { Container, IconButton, chakra, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa"



export function DefaultLayout() {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <chakra.div width={"100%"}>
            <chakra.div minHeight={"100vh"} width={"100%"}>
                <chakra.main marginBottom={"2rem"}>
                    <Container maxW={"5xl"}>
                        <Outlet />
                    </Container>
                </chakra.main>
            </chakra.div>
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
            <ScrollRestoration />
        </chakra.div>
    );
}
