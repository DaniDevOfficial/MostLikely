import { Button, Heading, Input } from '@chakra-ui/react'
import React from 'react'
import { socket } from '../../configs/socket';
import { useParams } from 'react-router-dom';

export function UserSelection({ setUsername, setProfilePicture, setUserState }) {
    const [name, setName] = React.useState("David");
    const [tmpProfilePicture, setTmpProfilePicture] = React.useState("None");
    const params = useParams();
    const room = params.id;
    function handleUserSelection() {
        if (name === "") {
            return;
        } 
        setUsername(name);
        setProfilePicture(tmpProfilePicture);
        setUserState("waiting");
        socket.emit("user selection", { name, profilePicture: tmpProfilePicture, room });
    }
    
    return (
        <>
            <Heading>Choose your name</Heading>
            <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Name" />
            <Input
                onChange={(e) => setTmpProfilePicture(e.target.value)}
                value={tmpProfilePicture}
                placeholder="Here you can enter a URL for a Profile Picture (optional)" />
            <Button onClick={handleUserSelection}>Done</Button>
        </>
    )
}