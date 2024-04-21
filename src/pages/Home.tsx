import { Box } from "@chakra-ui/react";
import { Landing } from "../components/Home/Landing";
export function HomePage() {

    return (
        <>
            <Box textAlign={"center"} mt={10}>
                <Landing />
            </Box>
        </>
    )
}