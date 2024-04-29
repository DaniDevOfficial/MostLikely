import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { socket } from '../../configs/socket'
import { TitleBoxWithSub } from '../TitleBoxWithSub';

export function LookingAtAnswers({ roomInformation }) {

    //  const currentQuestion = roomInformation.questions.find(question => question.id === roomInformation.voting[0]);
    const tmpUser = {
        name: "User",
        profilePicture: "https://via.placeholder.com/50",
        role: "host",
        playerId: "12345"
    }
    const [players, setPlayers] = React.useState([]);
    const [thisPlayer, setThisPlayer] = React.useState(null);
    useEffect(() => {
        if (roomInformation && roomInformation.players) {

            if (roomInformation.players.length <= 0) {
                setPlayers([tmpUser]);
            } else {
                const tmp: Player[] = roomInformation.players;
                tmp[0].role = "host";
                setPlayers(tmp);
            }
        }
        if (roomInformation && roomInformation.players) {
            setThisPlayer(roomInformation.players.find((player) => player.playerId === socket.id));
        }
    }, [roomInformation]);

    const currentQuestion = {
        question: "Who is the best player?",
        votes: [
            { toWho: "Player A" },
            { toWho: "Player B" },
            { toWho: "Player A" },
            { toWho: "Player C" },
            { toWho: "Player D" },
            { toWho: "Player C" },
            { toWho: "Player B" },
            { toWho: "Player A" },
            { toWho: "Player B" },
        ]
    };
    function tallyUpVotes() {
        const votes = currentQuestion.votes;
        console.log(votes)
        if (!votes) return console.log("No votes yet");
        const voteCount = votes.reduce((acc, vote) => {
            if (acc[vote?.toWho]) {
                acc[vote?.toWho] += 1;
            } else {
                acc[vote?.toWho] = 1;
            }
            return acc;
        }, {});

        return voteCount;
    }

    const currentVoteCounts = tallyUpVotes();
    return (
        <>
            <Flex
                direction="column"
                alignItems="center"
                textAlign={"center"}

            >
                <TitleBoxWithSub title="Voting Results" subtitle={currentQuestion.question} />

                {Object.entries(currentVoteCounts).map(([toWho, count], index) => {
                    let circleColor;
                    if (index === 0) {
                        circleColor = "goldenrod";
                    } else if (index === 1) {
                        circleColor = "silver";
                    } else if (index === 2) {
                        circleColor = "#cd7f32"; // Bronze color
                    } else {
                        circleColor = "gray";
                    }

                    return (
                        <Flex
                            key={toWho}
                            justifyContent="space-between"
                            alignItems="center"
                            gap={8}
                            outline={`1px solid ${circleColor}`}
                            p={4}
                            my={2}
                            w={{ base: "80%", md: "60%" }}
                            borderRadius={"md"}
                        >
                            <Flex alignItems="center">
                                <Flex
                                    justifyContent="center"
                                    alignItems="center"
                                    bg={circleColor}
                                    borderRadius="full"
                                    w="36px"
                                    h="36px"
                                >
                                    <Text color="white" fontSize="xl" fontWeight="bold">
                                        {index + 1}
                                    </Text>
                                </Flex>
                                <Text ml={4}>{toWho}</Text>
                            </Flex>
                            <Flex alignItems="center">
                                <Text fontSize="lg">Votes:</Text>
                                <Text ml={2}>{count}</Text>
                            </Flex>
                        </Flex>
                    );
                })}

                {thisPlayer?.role === "host" && (

                    <Button
                        onClick={() => socket.emit("next vote", roomInformation.roomId)}
                        colorScheme="pink"
                    >
                        next Question
                    </Button>
                )}
            </Flex>
        </>
    )
}