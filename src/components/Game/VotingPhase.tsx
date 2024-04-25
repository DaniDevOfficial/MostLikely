import { Button, Flex, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PlayerVoteForm } from '../PlayerVoteForm';

export function VotingPhase({ roomInformation, userState, setUserState }) {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const currentQuestion = roomInformation.questions.find(question => question.id === roomInformation.voting[0]);
    const allPlayers = roomInformation.players;

    function handleVote() {
        // Check if a player is selected
        if (selectedPlayer) {
            console.log(`Voted for ${selectedPlayer}`);

            setSelectedPlayer(null);
        } else {
            // Handle case when no player is selected
            console.log("Please select a player to vote for.");
        }
    }

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            <Heading>Voting Phase</Heading>
            <Heading>{currentQuestion.question}</Heading>

            {/* Render PlayerVoteForm component */}
            <PlayerVoteForm
                allPlayers={allPlayers}
                handlePlayerSelect={setSelectedPlayer}
            />

            <Button colorScheme='pink' onClick={handleVote}>Done Voting</Button>
        </Flex>
    );
}
