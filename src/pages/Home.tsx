import { Box } from "@chakra-ui/react";
import { Landing } from "../components/Home/Landing";
import { HowToPlay } from "../components/Home/HowToPlay";
import { WhereCode } from "../components/Home/WhereCode";
import { DataSeciroty } from "../components/Home/DataSecurity";
export function HomePage() {

    return (
        <>
            <Box textAlign={"center"} mt={10}>
                <Landing />
                <HowToPlay />
                <WhereCode />
                <DataSeciroty />
            </Box>
        </>
    )
}