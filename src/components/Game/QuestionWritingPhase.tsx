import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text, Button, Input } from '@chakra-ui/react'; // Import Chakra UI components or replace them with your UI library
import { Room, Question } from '../../types/Rooms';

interface Props {
    roomInformation: Room;
    userState: string;
    setUserState: any;
    gameState: string;
}

export function QuestionWritingPhase({ roomInformation, userState, setUserState, gameState }: Props) {
    const [timeLeft, setTimeLeft] = useState(roomInformation.game?.settings.QuestionWriteTime || 0);
    const amountOfQuestions = roomInformation.game?.settings.AmountOfQuestionsPerPlayer;
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        setUserState("questionWriteTime");
    }, []);

    useEffect(() => {
        if (timeLeft === 0) return;

        const timer = setTimeout(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleQuestionChange = (index: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            question: value
        };
        setQuestions(updatedQuestions);
    };

    function renderInputFields() {
        const inputFields = [];
        for (let i = 0; i < amountOfQuestions; i++) {
            inputFields.push(
                <Input
                    my={3}
                    key={i}
                    placeholder={`Question ${i + 1}`}
                    value={questions[i]?.question || ''}
                    onChange={e => handleQuestionChange(i, e.target.value)}
                />
            );
        }
        return inputFields;
    };
    function finishedWritingQuestions() {
        const isEmpty = questions.some(question => !question.question.trim());
        if (!isEmpty) {
            console.log("All questions have something written in them:", questions);
            setUserState("questionWriteDone");
        } else {
            // Handle the case where some questions are empty
            alert("Please fill in all questions before proceeding.");
        }
    }
    return (
        <Flex direction="column" alignItems="center" justifyContent="center" textAlign="center">
            <Heading>Question Writing Phase</Heading>
            <Text>
                Now you have to write questions for the next game step. The questions should be answerable with a name.
                Eg. Who is the most likely to eat grass?
            </Text>
            <Text fontWeight="bold">
                You still have {timeLeft} Second{timeLeft === 1 ? '' : 's'} left 
            </Text>
            <Text fontSize={"sm"} my={2}>The time remaining might be false when you joined late or tabbed out</Text>
            {userState === "questionWriteTime" && (
                <div>

                    {renderInputFields()}
                </div>
            )}
            {userState}
            <Button onClick={finishedWritingQuestions}>I'm Done</Button>
            <Button onClick={() => setUserState("questionWriteTime")}>Go Back</Button>
        </Flex>
    );
}
