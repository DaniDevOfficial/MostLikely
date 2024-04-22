import React from 'react';
import { Box, Text, UnorderedList, ListItem, Image, Flex, useToast } from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router-dom';

export function Lobby({ users }) {

    const currentUrl = window.location.href;
    const params = useParams();
    const toast = useToast();
    function copyToClipboard(thingToCopy, description) {
        navigator.clipboard.writeText(currentUrl);
        toast({
            title: "Copied " + description + " to clipboard",
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    }

    return (
        <>
            <Box textAlign="center">
                <Text fontSize="3xl" fontWeight="bold" my={5}>Invite other to join</Text>
                <Box>
                    <Flex
                        justifyContent={"center"}
                        gap={2}
                        onClick={() => copyToClipboard(currentUrl, " game link")}
                        cursor={"pointer"}
                    >
                        <Text>Url: </Text>
                        <Text fontWeight={"bold"}>{currentUrl.replace("http://", "").replace("https://", "")}</Text>
                    </Flex>
                    <Flex
                        justifyContent={"center"}
                        gap={2}
                        onClick={() => copyToClipboard(params.id, "the game code")}
                        cursor={"pointer"}
                    >
                        <Text>Game Code: </Text>
                        <Text fontWeight={"bold"}>{params.id}</Text>
                    </Flex>

                </Box>
            </Box>
            <Flex
                gap={"100px"}
                mt={10}
                flexWrap={"wrap"}
                justifyContent={"center"}
            >
                {users.map((user) => (
                    <>
                        <Flex
                            flexDir={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Image
                                borderRadius={"full"}
                                boxSize={"100px"}
                                src={user.profilePicture}
                                alt={user.name}
                                fallbackSrc="https://via.placeholder.com/50"
                            />
                            <Text>{user.name}</Text>
                        </Flex>
                    </>
                ))}
            </Flex>
        </>
    );
}
