import { Flex, Heading, Button, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { socket } from '../../configs/socket'
import { PlayerVoteForm } from '../PlayerVoteForm'
import { TitleBoxWithSub } from '../TitleBoxWithSub';

export function SendYourVote({ roomInformation, userState, setUserState }) {

    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const currentQuestion = roomInformation.questions.find(question => question.id === roomInformation.voting[0]);
    const amountOfPlayers = roomInformation.players.length || 0;
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
                <TitleBoxWithSub title="Vote for a Person" subtitle={currentQuestion.question} />
                <Text>
                    {amountFinishedWriting} out of {amountOfPlayers} Players {amountFinishedWriting === 1 ? "is" : "are"} Finished with Answering

                </Text>

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
                        <Text fontSize={"lg"} mt={3}>You have Voted for: {selectedPlayer}</Text>
                        <Text fontSize={"lg"} mt={3}>Now Wait for the other Players to Finish or until the Timer runs out.</Text>
                    </>
                )
                }
            </Flex>
        </>
    )
}