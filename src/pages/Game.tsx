import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../configs/socket";
import { Button } from "@chakra-ui/react";
import { UserSelection } from "../components/Game/UserSelection";
import { Lobby } from "../components/Game/Lobby";
import { set } from "firebase/database";
import { Room } from "../types/Rooms";
enum UserState {
    NameChose = "nameChose",
    Waiting = "waiting",
    InProgress = "inProgress",
    Ended = "ended"
}

enum GameState {
    NameChose = "nameChose",
    Waiting = "waiting",
    InProgress = "inProgress",
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
    function leave() {
        socket.emit("leave", params.id);
        navigate(`/`);
    }

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

        socket.on('user selected', (roomInformation) => {

            console.log(roomInformation);
            setRoomInformation(roomInformation);
        });

        return () => {
            socket.off('user selected');
        };
    }, []);

    return (
        <>
            <Button onClick={leave}>Leave this Lobby</Button>
            {userState === UserState.NameChose && (
                <UserSelection setUsername={setUsername} setUserState={setUserState} setProfilePicture={setProfilePicture} />
            )}
            {userState === UserState.Waiting && (
                <Lobby roomInformation={roomInformation} />
            )}
            {userState === UserState.InProgress && (
                <div>The game is in progress...</div>
            )}
            {userState === UserState.Ended && (
                <div>The game has ended.</div>
            )}
        </>
    )
}