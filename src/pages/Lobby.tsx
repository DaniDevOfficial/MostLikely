import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../configs/socket";
import { Button } from "@chakra-ui/react";

export function Lobby() {
    const params = useParams();
    const navigate = useNavigate();
    const [connectedUsers, setConnectedUsers] = useState([]);
    useEffect(() => {
        socket.emit("check if room exists", params.id);
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

        socket.emit("join", params.id)

        socket.on("joined", ({ room, users: usersInRoom }) => {
            console.log(usersInRoom);
            setConnectedUsers(usersInRoom);
        });

        socket.on("room exists", () => {
            console.log("Lobby Exists");
        });

    }, []);
    return (
        <>
            <Button onClick={() => navigate(`/`)}>Go Back</Button>
            RoomID: {params.id}
            {connectedUsers.map((user, index) => (
                <div key={index}>{user}</div>
            ))}

        </>
    )
}