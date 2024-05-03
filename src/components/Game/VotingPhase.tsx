import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PlayerVoteForm } from '../PlayerVoteForm';
import { socket } from '../../configs/socket';
import { SendYourVote } from './SendYourVote';
import { LookingAtAnswers } from './LookingAtAnswers';

export function VotingPhase({ roomInformation, userState, setUserState }) {

    const currentVotePhase = roomInformation.voting[1];



    return (
        <Box>
            {currentVotePhase === "voting" ? (
                <SendYourVote roomInformation={roomInformation} userState={userState} setUserState={setUserState} />
            ) : (
                <>
                    <LookingAtAnswers roomInformation={roomInformation} />
                </>
            )}




        </Box>

    );
}
