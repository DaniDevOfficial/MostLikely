import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { FaGithub } from "react-icons/fa";

export function WhereCode() {

    const repositories = [
        {
            name: "Frontend",
            url: "https://github.com/DaniDevOfficial/WhoWouldDoIt"
        },
        {
            name: "Backend",
            url: "https://github.com/DaniDevOfficial/WhoWouldDoItBackend"
        }
    ];

    return (
        <Box mt={10}>
            <Heading as="h2" size="lg" mb={4}>SOURCE????????</Heading>
            <Text>
                Do you want to see the code for this project? Or maybe you want to contribute to it?
            </Text>
            <Text mt={2}>
                Below are the repositories where you can find the code for the frontend and backend of this project:
            </Text>
            <Flex mt={4} flexDirection="row" gap={16} justifyContent={"center"} wrap={"wrap"}>
                {repositories.map((repo, index) => (
                    <Box key={index} as="a" href={repo.url} p={2} target="_blank" rel="noopener noreferrer" _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
                        transition={"transform 0.2s ease-in-out"} >
                        <Icon
                            as={FaGithub}
                            boxSize={16}
                        />
                        <Text>{repo.name}</Text>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
}
