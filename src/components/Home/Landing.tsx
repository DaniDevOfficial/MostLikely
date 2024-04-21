import {  Button, Flex, Heading, Input, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../configs/socket';
export function Landing() {
    const [roomId, setRoomId] = useState("");
    const [name, setName] = useState("");
    const toast = useToast();
    const navigate = useNavigate();
    console.log(socket)

    function joinRoom() {
        if (roomId === "") {

            return;
        }
        socket.emit("check if room exists", roomId);

    }

    function createRoom() {
        if (name === "") {
            return;
        }
        socket.emit("create", name);
    }

    useEffect(() => {
        socket.on("room does not exist", () => {
            setRoomId("");
            toast({
                title: "This Room does not exist!",
                description: `Are you sure that that was the right code?`,
                status: "error",
            });
        });
        socket.on("room exists", (data) => {
            console.log(data)
            toast({
                title: "Joined Room",
                description: `You have joined the room ${data}`,
                status: "success",
            });
            navigate(`/room/${data}`);
        });
    }, []);
    return (
        <>
            <Heading>Hey There👋, Welcome to WhoWouldBeTheMostLikely </Heading>

            <Flex
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="center"
                mt={10}
                gap={{ base: 4, md: 40 }}
            >
                <Flex
                    flexDirection="column"
                    gap={4}
                >

                    <Heading fontSize="larger">Join a game with a code</Heading>
                    <Input placeholder="Enter a Room ID" required value={roomId} onChange={(e) => (setRoomId(e.target.value))} />
                    <Button type="submit" colorScheme="pink" onClick={joinRoom}>Click to join</Button>

                </Flex>
                <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    gap={4}
                >
                    <Heading fontSize="larger">Or create your own lobby</Heading>
                    <Input placeholder="Enter a Username" required value={name} onChange={(e) => (setName(e.target.value))} />
                    <Button type="submit" colorScheme="pink" onClick={createRoom}>Create a new room</Button>
                </Flex>
            </Flex>
        </>
    )
}