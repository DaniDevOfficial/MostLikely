import React from 'react'

export function Lobby({ users }) {

    return (
        <>
            <h1>Lobby</h1>
            <ul>
                {users.map((user) => (
                    <>
                    <li key={user}>{user.name}</li>
                    <img src={user.profilePicture || 'tmp'} alt={user.name} />
                    <li>{user.userId}</li>
                    </>
                ))}
            </ul>
        </>
    )
}