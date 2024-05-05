import { useState, useEffect } from 'react';
import { Flex, Heading, Text, Button, Input, Icon, useToast } from '@chakra-ui/react'; // Import Chakra UI components or replace them with your UI library
import { Room, Question } from '../../types/Rooms';
import randomQuestions from '../../data/random_questions.json'
import { FaRandom } from "react-icons/fa";
import { socket } from '../../configs/socket';
import { useParams } from 'react-router-dom';
import { TitleBoxWithSub } from '../TitleBoxWithSub';

interface Props {
    roomInformation: Room;
    userState: string;
    setUserState: any;
    gameState: string;
}

export function QuestionWritingPhase({ roomInformation, userState, setUserState }: Props) {
    const [timeLeft, setTimeLeft] = useState(roomInformation.game?.settings.QuestionWriteTime || 0);
    const amountOfQuestions = roomInformation.game?.settings.AmountOfQuestionsPerPlayer;
    const initialQuestions = Array.from({ length: amountOfQuestions }, () => ({ question: '' }));
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [questionsWithAuthor, setQuestionsWithAuthor] = useState<Question[]>([]);
    const amoutOfPlayers = roomInformation.players.length || 0;
    const amountFinishedWriting = (roomInformation.finishedWritingQuestions && roomInformation.finishedWritingQuestions.length) || 0;
    const toast = useToast
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

    function generateRandomQuestion(): string {
        // Define an array of random question options
        // Generate a random index
        const randomIndex = Math.floor(Math.random() * randomQuestions.length);

        // Return the randomly selected question
        return randomQuestions[randomIndex];
    }
    function handleRandomQuestion(index: number) {
        // Generate a random question
        const randomQuestion = generateRandomQuestion();

        // Update the specified question with the random question
        const updatedQuestions = [...questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            question: randomQuestion
        };
        setQuestions(updatedQuestions);
    }
    function renderInputFields() {
        const inputFields = [];
        for (let i = 0; i < amountOfQuestions; i++) {
            inputFields.push(
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    gap={2}
                    key={i}>
                    <Input
                        my={3}
                        w={{ base: "80vw", md: "40vw" }}
                        placeholder={`Question ${i + 1}`}
                        value={questions[i]?.question || ''}
                        onChange={e => handleQuestionChange(i, e.target.value)}
                    />
                    <Icon
                        _hover={{
                            transform: "scale(1.1)"
                        }}
                        cursor={"pointer"}
                        transition={"transform 0.2s ease-in-out"}
                        as={FaRandom}
                        onClick={() => handleRandomQuestion(i)} />

                </Flex>
            );
        }
        return inputFields;
    }
    function finishedWritingQuestions() {
        const removedEmptyQuestions = questions.filter(question => question.question !== "");
        const isFull = removedEmptyQuestions.length == amountOfQuestions;
        if (isFull) {
            setUserState("questionWriteDone");
            const questionsWithAuthor = removedEmptyQuestions.map(question => ({ ...question, author: socket.id }));
            socket.emit("player finished writing", { questions: questionsWithAuthor, roomId: roomInformation.roomId });
        }
    }

    useEffect(() => {
        const removedEmptyQuestions = questions.filter(question => question.question !== "");
        const questionsWithAuthorTmp = removedEmptyQuestions.map(question => ({ ...question, author: socket.id }));
        setQuestionsWithAuthor(questionsWithAuthorTmp);

        socket.on("finish writing questions", () => {
            socket.emit("player finished writing", { questions: questionsWithAuthorTmp, roomId: roomInformation.roomId });
        });

        return () => {
            socket.off("finish writing questions");
        };
    }, [questions, socket]);


    return (
        <Flex direction="column" alignItems="center" justifyContent="center" textAlign="center">


            <TitleBoxWithSub title="Question Writing Phase" subtitle="Now you have to write questions for the next game step. The questions should be answerable with a name.
                E.g. Who is the most likely to eat grass?" />

            <Text fontWeight="bold">
                You still have {timeLeft} Second{timeLeft === 1 ? '' : 's'} left
            </Text>
            <Text>  {amountFinishedWriting}/{amoutOfPlayers} Players are finished With Writing </Text>
            <Text fontSize={"sm"} my={2} mb={5}>The time remaining might be false when you joined late or tabbed out</Text>
            {userState === "questionWriteTime" && (
                <>
                    {renderInputFields()}
                    <Button colorScheme='pink' onClick={finishedWritingQuestions}>I'm Done</Button>
                </>
            )}
            {userState === "questionWriteDone" && (
                <>
                    <Text>Great, you have written all your questions!</Text>
                    <Text>Now wait for the other players to finish or until the timer runs out.</Text>
                </>
            )}
        </Flex>
    );
}
