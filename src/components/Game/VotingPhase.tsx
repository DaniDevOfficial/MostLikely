import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PlayerVoteForm } from '../PlayerVoteForm';
import { socket } from '../../configs/socket';
import { SendYourVote } from './SendYourVote';

export function VotingPhase({ roomInformation, userState, setUserState }) {

    const currentVotePhase = roomInformation.voting[1];
    console.log(currentVotePhase)
    console.log(roomInformation)


    return (
        <Box>
            {currentVotePhase === "voting" ? (
                <SendYourVote roomInformation={roomInformation} userState={userState} setUserState={setUserState} />
            ) : (
                <>
                    <p>Done voting</p>
                    <Button onClick={() => socket.emit("next vote", roomInformation.roomId)}>next Question</Button>
                </>
            )}




        </Box>

    );
}
