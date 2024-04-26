import { Flex, Heading, Button, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { socket } from '../../configs/socket'
import { PlayerVoteForm } from '../PlayerVoteForm'

export function SendYourVote({ roomInformation, userState, setUserState }) {

    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const currentQuestion = roomInformation.questions.find(question => question.id === roomInformation.voting[0]);
    const amoutOfPlayers = roomInformation.players.length || 0;
    const amountFinishedWriting = (currentQuestion.votes && currentQuestion.votes.length) || 0;
    const allPlayers = roomInformation.players;
    useEffect(() => {
        setUserState("questionVoteTime");
    }, []);
    function handleVote() {
        // Check if a player is selected
        if (selectedPlayer) {
            console.log(`Voted for ${selectedPlayer}`);
            const vote = {
                toWho: selectedPlayer,
                fromWhoId: socket.id
            };

            console.log(vote);
            socket.emit("vote", { vote, roomId: roomInformation.roomId, questionId: currentQuestion.id });
            setUserState("questionVoteDone");
        } else {
            // Handle case when no player is selected
            console.log("Please select a player to vote for.");
        }
    }

    return (
        <>
            <Flex
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <Heading>Voting Phase</Heading>
                <Heading>{currentQuestion.question}</Heading>
                <Text>  {amountFinishedWriting}/{amoutOfPlayers} Players are finished With Writing </Text>

                {userState === "questionVoteTime" && (
                    <>
                        <PlayerVoteForm
                            allPlayers={allPlayers}
                            handlePlayerSelect={setSelectedPlayer}
                        />

                        <Button colorScheme='pink' onClick={handleVote}>Done Voting</Button>
                    </>
                )}
                {userState === "questionVoteDone" && (
                    <>
                        <Text fontSize={"lg"} mt={3}>You have voted for: {selectedPlayer}</Text>
                        <Text fontSize={"lg"} mt={3}>Now wait for the other players to finish or until the timer runs out.</Text>
                    </>
                )
                }
                <Button onClick={() => socket.emit("next vote", roomInformation.roomId)}>next vote</Button>
            </Flex>
        </>
    )
}