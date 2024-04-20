import { Outlet, ScrollRestoration } from "react-router-dom";
import { Container, chakra } from "@chakra-ui/react";



export function DefaultLayout() {
    return (
        <chakra.div width={"100%"}>
            <chakra.div minHeight={"100vh"} width={"100%"}>
                <chakra.main marginBottom={"2rem"}>
                    <Container maxW={"5xl"}>
                        <Outlet />
                    </Container>
                </chakra.main>
            </chakra.div>

            <ScrollRestoration />
        </chakra.div>
    );
}
