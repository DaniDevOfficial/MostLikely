import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

interface TitleBoxWithSubProps {
    title: string;
    subtitle: string;
}

export function TitleBoxWithSub({ title, subtitle }: TitleBoxWithSubProps) {

    return (
        <>
            <Box my={8} p={4} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="md" boxShadow="md" w="80%" textAlign="center">
                <Heading as="h2" size="lg" mb={2}>{title}</Heading>
                <Text fontSize="lg" fontWeight="bold" mb={4}>{subtitle}</Text>
            </Box>
        </>
    )
}