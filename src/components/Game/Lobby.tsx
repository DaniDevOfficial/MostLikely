import React, { useEffect, useState } from 'react';
import { Box, Text, UnorderedList, ListItem, Image, Flex, useToast, Heading, chakra, Input, Button, useColorModeValue, useColorMode, color } from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router-dom';
import { GameSettings, Player, Room } from '../../types/Rooms';
import { socket } from '../../configs/socket';
import { ChangeSettingsPopover } from '../ChangeSettingPopover';


interface Props {
    roomInformation: Room;
}

export function Lobby({ roomInformation }: Props) {
    const [players, setPlayers] = useState<Player[]>([]);
    const [settings, setSettings] = useState<GameSettings>([]);
    const [thisPlayer, setThisPlayer] = useState<Player>([]);
    const params = useParams();
    const { toggleColorMode, colorMode } = useColorMode();
    const currentUrl = window.location.href;
    const toast = useToast();
    const tmpUser = {
        name: "User",
        profilePicture: "https://via.placeholder.com/50",
        role: "host",
        playerId: "12345"

    }


    useEffect(() => {
        if (roomInformation && roomInformation.players) {

            if (roomInformation.players.length <= 0) {
                setPlayers([tmpUser]);
            } else {
                const tmp: Player[] = roomInformation.players;
                setPlayers(tmp);
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


    function startGame() {
        socket.emit("start game", params.id);
    }

    function changeSingleSetting(setting: string, value: number) {
        const newSettings = settings;
        newSettings[setting] = value;
        console.log(newSettings)
        console.log(params.id)
        socket.emit("settings update", { newSettings: newSettings, roomId: params.id });
    }

    function copyToClipboard(thingToCopy: string | number, description: string) {
        navigator.clipboard.writeText(thingToCopy.toString()); // Convert thingToCopy to string
        toast({
            title: "Copied " + description + " to clipboard",
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    }

    function kickPlayer(playerId) {
        const kickedPlayer = players.find(player => player.playerId === playerId);
        const kickData = {
            roomId: params.id,
            playerId: playerId
        }
        socket.emit("kick player", kickData);
        console.log(`Player ${kickedPlayer.name} got kicked!`);
        console.log(kickedPlayer)
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
                <Box>

                    <Box
                        w={{ base: "100%", md: "450px" }}
                        bg={useColorModeValue("gray.100", "gray.700")}
                        px={10}
                        py={5}
                        display={"flex"}
                        flexDir={"column"}
                        borderRadius={"20px"}
                        alignItems={{ base: "center", md: "baseline" }}
                        boxShadow="md"
                    >
                        <Text fontSize="2xl" fontWeight="bold" my={5}>Game Settings</Text>
                        <Text fontSize={"x-small"}> Only the Lobby Host can change the Settings</Text>
                        <chakra.div my={3}>
                            Time For Writing Questions: <chakra.a fontWeight={"bold"}>{settings.QuestionWriteTime} Seconds</chakra.a> {thisPlayer?.role === "host" && <chakra.a> <ChangeSettingsPopover whichSetting={"QuestionWriteTime"} onUpadate={changeSingleSetting} description={"the Time for Writing Questions (in seconds)"} /> </chakra.a>}
                        </chakra.div>
                        <chakra.div my={3}>
                            Vote time: <chakra.a fontWeight={"bold"}>{settings.VoteTime} Seconds</chakra.a> {thisPlayer?.role === "host" && <chakra.a> <ChangeSettingsPopover whichSetting={"VoteTime"} onUpadate={changeSingleSetting} description={"the Time for Voting (in seconds)"} /> </chakra.a>}
                        </chakra.div>
                        <chakra.div my={3}>
                            Amount of Questions per Player: <chakra.a fontWeight={"bold"}>{settings.AmountOfQuestionsPerPlayer}</chakra.a> {thisPlayer?.role === "host" && <chakra.a> <ChangeSettingsPopover whichSetting={"AmountOfQuestionsPerPlayer"} onUpadate={changeSingleSetting} description={"the Amount of Questions a User can Write (recommended to be a max of 5)"} /> </chakra.a>}
                        </chakra.div>
                    </Box>

                    {thisPlayer?.role === "host" && <Button colorScheme='pink' mt={5} w="100%" onClick={startGame}>Start the Game when everyone is Ready 🚀🚀</Button>}
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
                                boxShadow="md"
                            />
                            <Text textAlign={"center"}>{player.name}</Text>
                            {player === thisPlayer && <Text>This is You!</Text>}
                            {player.role &&
                                <Text
                                    bg={colorMode === "light" ? "blue.400" : "blue.600"}
                                    p={1}
                                    px={3}
                                    fontSize={"sm"}
                                    borderRadius={"100px"}
                                >
                                    {player.role}
                                </Text>
                            }

                            {thisPlayer?.role === "host" && player !== thisPlayer && (
                                <Text
                                    bg={colorMode === "light" ? "red.400" : "red.600"}
                                    p={1}
                                    px={3}
                                    fontSize={"sm"}
                                    color={"white"}
                                    borderRadius={"100px"}
                                    onClick={() => kickPlayer(player.playerId)}
                                    style={{ cursor: "pointer" }}
                                >
                                    Kick this Player
                                </Text>
                            )}

                        </Flex>
                    ))}
                </Flex>


            </Flex>
        </>
    );
}

