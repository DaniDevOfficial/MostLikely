import { Button, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { socket } from '../../configs/socket'
import { TitleBoxWithSub } from '../TitleBoxWithSub';
import { ScoreBoard } from '../ScoreBoard';

export function LookingAtAnswers({ roomInformation }) {

  const currentQuestion = roomInformation.questions.find(question => question.id === roomInformation.voting[0]);
    const tmpUser = {
        name: "User",
        profilePicture: "https://via.placeholder.com/50",
        role: "host",
        playerId: "12345"
    }
    const [players, setPlayers] = React.useState([]);
    const [thisPlayer, setThisPlayer] = React.useState(null);
    useEffect(() => {
        if (roomInformation && roomInformation.players) {

            if (roomInformation.players.length <= 0) {
                setPlayers([tmpUser]);
            } else {
                const tmp: Player[] = roomInformation.players;
                tmp[0].role = "host";
                setPlayers(tmp);
            }
        }
        if (roomInformation && roomInformation.players) {
            setThisPlayer(roomInformation.players.find((player) => player.playerId === socket.id));
        }
    }, [roomInformation]);

    function getAuthorName(authorId: string) {
        const author = roomInformation.players.find(player => player.playerId === authorId);
        return author?.name || "Unknown";
    }

    return (
        <>
            <Flex
                direction="column"
                alignItems="center"
                textAlign={"center"}

            >
                <TitleBoxWithSub title="Voting Results" subtitle={currentQuestion.question} subSubTitle={`Author: ${getAuthorName(currentQuestion.author)}`}  />

                <ScoreBoard question={currentQuestion} />
                {thisPlayer?.role === "host" && (

                    <Button
                        onClick={() => socket.emit("next vote", roomInformation.roomId)}
                        colorScheme="pink"
                    >
                        next Question
                    </Button>
                )}
            </Flex>
        </>
    )
}