import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { socket } from '../../configs/socket'
import { Question, Vote } from '../../types/Rooms';

export function EndScreen({ roomInformation }) {



    function tallyVotes(questions: Question[]): Question[] {
        questions.forEach((question: Question) => {
            const tally: { [key: string]: number } = {};
            if (question.votes) {
                question.votes.forEach((vote: Vote) => {
                    const toWho: string = vote.toWho;
                    tally[toWho] = (tally[toWho] || 0) + 1;
                });
            }
            question.tally = []; 
            for (const person in tally) {
                question.tally.push({ toWho: person, amountOfVotes: tally[person] });
            }
            if (Object.keys(tally).length === 0) {
                question.tally.push({ toWho: 'nobody voted', amountOfVotes: 0 });
            }
            question.tally.sort((a, b) => b.amountOfVotes - a.amountOfVotes);
        });
        return questions;
    }



    // Example usage:
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


    const questionsWithTally = tallyVotes(questions);
    console.log(questionsWithTally);
    return (
        <>
            <Box>
                <h1>Game Over</h1>
                <ul>
                    {roomInformation.players.map(player => (
                        <li key={player.id}>
                            <p>{player.name}</p>
                        </li>
                    ))}
                </ul>
                <Button onClick={() => socket.emit("reset game", roomInformation.roomId)}>Restart Game</Button>
            </Box>
        </>
    )
}