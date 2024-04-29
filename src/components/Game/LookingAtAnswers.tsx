import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { socket } from '../../configs/socket'

export function LookingAtAnswers({ roomInformation }) {

    const currentQuestion = roomInformation.questions.find(question => question.id === roomInformation.voting[0]);

    function tallyUpVotes() {
        const votes = currentQuestion.votes;
        console.log(votes)
        if(!votes) return console.log("No votes yet");
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
                <Heading>Now Lets see the results for this question</Heading>

                <Text>Question: {currentQuestion.question} </Text>
                <Text>Current Vote Counts:</Text>
                {Object.entries(currentVoteCounts).map(([toWho, count]) => (
                    <Text key={toWho}>{toWho}: {count}</Text>
                ))}
                <Button
                    onClick={() => socket.emit("next vote", roomInformation.roomId)}
                    colorScheme="pink"
                >
                    next Question
                </Button>
            </Flex>
        </>
    )
}