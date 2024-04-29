import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../configs/socket";
import { Button, useToast } from "@chakra-ui/react";
import { Room } from "../types/Rooms";
import { UserSelection } from "../components/Game/UserSelection";
import { Lobby } from "../components/Game/Lobby";
import { QuestionWritingPhase } from "../components/Game/QuestionWritingPhase";
import { VotingPhase } from "../components/Game/VotingPhase";
import { EndScreen } from "../components/Game/EndScreen";
import { toastOptions } from "../configs/chakra";

enum UserState {
    NameChose = "nameChose",
    Waiting = "waiting",
    QuestionWriteTime = "questionWriteTime",
    QuestionWriteDone = "questionWriteDone",
    QuestionVoteTime = "questionVoteTime",
    QuestionVoteDone = "questionVoteDone",

    Ended = "ended"
}

enum GameState {
    Waiting = "waiting",
    InProgress = "inProgress",
    QuestionWriteTime = "questionWriteTime",
    QuestionVoteTime = "questionVoteTime",
    Ended = "ended"
}



export function Game() {
    const params = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [roomInformation, setRoomInformation] = useState<Room>({});
    const [userState, setUserState] = useState(UserState.NameChose);
    const [gameState, setGameState] = useState(GameState.Waiting);
    function leave() {
        socket.emit("leave", params.id);
        navigate(`/`);
    }
    const tmpUser = {
        name: "User",
        profilePicture: "https://via.placeholder.com/50",
        role: "host",
        playerId: "12345"
    }

    useEffect(() => {
        setGameState(roomInformation.game?.state);
        if (roomInformation && roomInformation.players) {

            if (roomInformation.players.length <= 0) {
                setAllUsers([tmpUser]);
            } else {
                const tmp: Player[] = roomInformation.players;
                tmp[0].role = "host";
                setAllUsers(tmp);
            }
        }
    }, [roomInformation]);
    useEffect(() => {
        socket.emit("check if room exists", params.id);
        socket.emit("join", params.id)

    }, []);



    useEffect(() => {
        socket.on("room does not exist", () => {
            navigate(`/`);
            return () => {
                socket.off("joined");
                socket.off("room does not exist");
                socket.off("room exists");
            };
        });

        socket.on("joined", ({ room, users: usersInRoom }) => {
            console.log(usersInRoom)
            setConnectedUsers(usersInRoom);
        });

        socket.on("room exists", () => {
        });
        socket.on("room information updated", (roomInformation) => {
            console.log(roomInformation);
            roomInformation.players[0].role = "host";
        
            setRoomInformation(roomInformation);
        });

        socket.on("room deleted", (room) => {
            toast({
                title: "Room deleted",
                description: "The room you were in was deleted due to inactivity.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            navigate(`/`);
            return () => {
                socket.off("joined");
                socket.off("room does not exist");
                socket.off("room exists");
                socket.off("room deleted");
            };
        });

        socket.on("restart warning", (timeUntilRestart) => {
            console.log(timeUntilRestart)
            const minutesUntilRestart = Math.floor(timeUntilRestart.timeUntilRestart / 60 / 1000);
            console.log(minutesUntilRestart)
            toast({
                title: "Server Restart",
                description: `The server will restart in about ${minutesUntilRestart} minutes. Please finish your game.`,
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return () => {
                socket.off("restart warning");
            };
        });

        socket.on("server restart", () => {
            toast({
                title: "Server Restart",
                description: "The server was restarted. Please refresh the page.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            navigate(`/`);
            return () => {
                socket.off("server restart");
            };
        });

        return () => {
            socket.off('user selected');
        };
    }, []);




    let componentToRender;

    if (userState === UserState.NameChose) {
        componentToRender = <UserSelection setUsername={setUsername} setUserState={setUserState} setProfilePicture={setProfilePicture} />;
    } else if (gameState === GameState.Waiting) {
        componentToRender = <Lobby roomInformation={roomInformation} />;
    } else if (gameState === GameState.QuestionWriteTime) {
        componentToRender = <QuestionWritingPhase roomInformation={roomInformation} userState={userState} setUserState={setUserState} gameState={gameState} />;
    } else if (gameState === GameState.QuestionVoteTime) {
        componentToRender = <VotingPhase roomInformation={roomInformation} userState={userState} setUserState={setUserState} />;
    } else if (gameState === GameState.Ended) {
        componentToRender = <EndScreen roomInformation={roomInformation} />;
    }

    return (<>
        <Button onClick={leave}>Leave this Lobby</Button>
        {componentToRender}
    </>
    );
}