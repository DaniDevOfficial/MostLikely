import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { socket } from '../../configs/socket'

export function EndScreen({ roomInformation }) {

    return (
        <>
            <Box>
                <h1>Game Over</h1>
                <ul>
                    {roomInformation.players.map(player => (
                        <li key={player.id}>
                            <p>{player.name}</p>
                        </li>
                    ))}
                </ul>
                <Button onClick={() => socket.emit("reset game", roomInformation.roomId)}>Restart Game</Button>
            </Box>
        </>
    )
}