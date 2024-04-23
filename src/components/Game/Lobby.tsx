import React, { useEffect, useState } from 'react';
import { Box, Text, UnorderedList, ListItem, Image, Flex, useToast, Heading, chakra } from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router-dom';
import { GameSettings, Player, Room } from '../../types/Rooms';
import { socket } from '../../configs/socket';


interface Props {
    roomInformation: Room;
}

export function Lobby({ roomInformation }: Props) {
    const [players, setPlayers] = useState<Player[]>([]);
    const [settings, setSettings] = useState<GameSettings>([]);
    const [thisPlayer, setThisPlayer] = useState<Player>([]);

    const tmpUser = {
        name: "User",
        profilePicture: "https://via.placeholder.com/50",
        role: "host",
        playerId: "12345"
    
    }


    useEffect(() => {
        if (roomInformation && roomInformation.players) {
            if (roomInformation.players.length > 0) {
                const tmp: Player[] = roomInformation.players;
                tmp[0].role = "host"; 
                setPlayers(tmp);
            } else {
                setPlayers([tmpUser]);
            }
        }
        if (roomInformation && roomInformation.game && roomInformation.game.settings) {
            setSettings(roomInformation.game.settings);
        }
        if (roomInformation && roomInformation.players) {
            console.log(socket.id)
            setThisPlayer(roomInformation.players.find((player) => player.playerId === socket.id));
        }
    }, [roomInformation]);


    const currentUrl = window.location.href;
    const params = useParams();
    const toast = useToast();
    function copyToClipboard(thingToCopy: string | number, description: string) {
        navigator.clipboard.writeText(thingToCopy.toString()); // Convert thingToCopy to string
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
                flexDir={{ base: "column", md: "row-reverse" }}
                justifyContent={{ base: "center", md: "space-between" }}
                alignItems={{ base: "center", md: "flex-start" }}
                gap={10}
                mt={10}
            >
                <Box
                    w={{ base: "90%", md: "400px" }}
                    bg={"gray.100"}
                    px={10}
                    py={5}
                    display={"flex"}
                    flexDir={"column"}
                    borderRadius={"20px"}
                    alignItems={{ base: "center", md: "baseline" }}

                >
                    <Text fontSize="2xl" fontWeight="bold" my={5}>Game settings</Text>
                    <Text my={3}>Time For Writing Questions: <chakra.a fontWeight={"bold"}>{settings.QuestionWriteTime} Seconds</chakra.a></Text>
                    {thisPlayer?.role === "host" && <Text my={3}>You are the host</Text>}
                    <Text my={3}>Vote time: <chakra.a fontWeight={"bold"}>{settings.VoteTime} Seconds</chakra.a></Text>
                    <Text my={3}>Amount of Questions Per Player: <chakra.a fontWeight={"bold"}>{settings.AmountOfQuestionsPerPlayer}</chakra.a> </Text>
                </Box>
                <Flex
                    gap={50}
                    flexWrap={"wrap"}
                    justifyContent={"center"}
                >
                    {players.map((player) => (
                        <Flex
                            key={player.playerId}
                            flexDir={"column"}
                            alignItems={"center"}
                        >
                            <Image
                                borderRadius={"full"}
                                boxSize={"100px"}
                                src={player.profilePicture}
                                alt={player.name}
                                fallbackSrc="https://via.placeholder.com/50"
                            />
                            <Text textAlign={"center"}>{player.name}</Text>
                            {player.role &&
                                <Text
                                    bg={"gray.200"}
                                    p={1}
                                    px={3}
                                    fontSize={"sm"}
                                    borderRadius={"100px"}
                                >
                                    {player.role}
                                </Text>
                            }
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </>
    );
}

