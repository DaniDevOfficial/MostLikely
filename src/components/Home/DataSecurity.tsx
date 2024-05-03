import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

export function DataSeciroty() {
    return (
        <Box p={4} borderRadius="md" boxShadow="md" bg={useColorModeValue("gray.100", "gray.700")} maxW="600px" mx="auto" mt={10}>
            <Heading as="h2" size="lg" mb={4}>Data Collection and Logging</Heading>
            <Text>
                Your privacy and data security are important to us. Here's what data the app collects and how it's handled:
            </Text>
            <Text mt={2}>
                When using the app, certain basic information such as your username, game preferences, and game activity may be collected. However, the app makes every effort to minimize data collection and only collects what is necessary for the game's functionality.
            </Text>
            <Text mt={2}>
                It's important to note that the app does not store any personally identifiable information (PII) beyond what is necessary for the game experience. Please do not share sensitive information during gameplay 😱😱.
            </Text>
            <Text mt={2}>
                Additionally, while the app strives to delete all game-related data after the session ends, please be aware that logging technology is utilized for monitoring and improving app performance.
            </Text>
        </Box>
    );
}
