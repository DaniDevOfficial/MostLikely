import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { socket } from "../configs/socket";

export function Lobby() {
    const params = useParams();
    useEffect(() => {
        console.log(socket)
        socket.emit("check if room exists", params.id);
    }, []);
    return (
        <>

        </>
    )
}