import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../configs/socket";
import { Button } from "@chakra-ui/react";
import { Room } from "../types/Rooms";
import { UserSelection } from "../components/Game/UserSelection";
import { Lobby } from "../components/Game/Lobby";
import { QuestionWritingPhase } from "../components/Game/QuestionWritingPhase";

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

    useEffect(() => {
        setGameState(roomInformation.game?.state);
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

        socket.on("left", ({ roomInformation }) => {
            console.log(roomInformation)
            setRoomInformation(roomInformation);
        });

        socket.on("joined", ({ room, users: usersInRoom }) => {
            console.log(usersInRoom)
            setConnectedUsers(usersInRoom);
        });

        socket.on("room exists", () => {
        });
        socket.on("room information updated", (roomInformation) => {
            console.log(roomInformation);
            setRoomInformation(roomInformation);
        });

        socket.on("game started", (roomInformation) => {
            setRoomInformation(roomInformation);
        });

        socket.on('user selected', (roomInformation) => {

            console.log(roomInformation);
            setRoomInformation(roomInformation);
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
        componentToRender = <div>Vote time</div>;
    } else if (userState === UserState.Ended) {
        componentToRender = <div>The game has ended.</div>;
    }

    return (<>
        <Button onClick={leave}>Leave this Lobby</Button>
        {componentToRender}
    </>
    );
}