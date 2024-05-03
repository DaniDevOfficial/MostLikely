import { Box, Heading, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'

interface TitleBoxWithSubProps {
    title: string;
    subtitle: string;
    subSubTitle?: string;
}

export function TitleBoxWithSub({ title, subtitle, subSubTitle }: TitleBoxWithSubProps) {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <>
            <Box my={8} p={4} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="md" boxShadow="md" w="80%" textAlign="center">
                <Heading as="h2" size="lg" mb={2}>{title}</Heading>
                <Text fontSize="lg" fontWeight="bold" mb={4}>{subtitle}</Text>
                <Text mt={2} fontSize="sm" color={colorMode === "light" ? "gray.600" : "gray.400"}>{subSubTitle}</Text>
            </Box>
        </>
    )
}