import { Box, Button, Flex, Text, useColorMode } from '@chakra-ui/react'
import { socket } from '../../configs/socket'
import { Question, Vote } from '../../types/Rooms';
import { TitleBoxWithSub } from '../TitleBoxWithSub';
import { ScoreBoard } from '../ScoreBoard';

export function EndScreen({ roomInformation }) {


    const { toggleColorMode, colorMode } = useColorMode();


    const thisPlayer = roomInformation.players.find((player) => player.playerId === socket.id);

    // Example usage:
    /* 
    const questions = [
        {
            id: 0,
            question: 'Who is the most likely to have a panic attack?',
            author: 'sIVTh3lJss5vQM8PAAAN',

        },
        {
            id: 1,
            question: "Who is the most likely to feel like they're not living up to their potential?",
            author: 'sIVTh3lJss5vQM8PAAAN',
            votes: [
                { toWho: 'asdf', fromWhoId: 'sIVTh3lJss5vQM8PAAAN' },
                { toWho: 'jkl', fromWhoId: 'anotherUserId' },
                { toWho: 'jkl', fromWhoId: 'anotherUserId' },
                { toWho: 'qwerty', fromWhoId: 'fourthUserId' }
            ]
        }
    ];
    */
    function getAuthorName(authorId: string) {
        const author = roomInformation.players.find(player => player.playerId === authorId);
        return author?.name || "Unknown";
    }
    const questions = roomInformation.questions;

    return (
        <>
            <Flex
                direction="column"
                alignItems="center"
                textAlign={"center"}
            >

                <TitleBoxWithSub title="You finished this Game 😱!!" subtitle="Here are the results of the game in an overview!" />
                {thisPlayer?.role === "host" && (
                    <Button colorScheme='pink' onClick={() => socket.emit("reset game", roomInformation.roomId)}>Play another Round</Button>
                )}
                {questions.map(question => (
                    <Flex
                        w={"100%"}
                        direction="column"
                        alignItems="center"
                        my={7}
                        gap={4}
                    >
                        <Box w={{ base: "80%", md: "60%" }} bg={colorMode === "light" ? "gray.100" : "gray.700"} p={4} boxShadow="md" borderRadius="md">
                            <Text>
                                {question.question}
                            </Text>
                            <Text mt={2} fontSize="sm" color={colorMode === "light" ? "gray.600" : "gray.400"}>{`Author: ${getAuthorName(question.author)}`}</Text>

                        </Box>
                        <ScoreBoard question={question} />
                    </Flex>
                ))}
            </Flex>
        </>
    )
}