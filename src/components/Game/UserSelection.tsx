import { Button, Flex, Heading, Input } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { socket } from '../../configs/socket';
import { useParams } from 'react-router-dom';

export function UserSelection({ setUsername, setProfilePicture, setUserState }) {
    const names = [
        "David",
        "Dave",
        "Delfin 🐬",
        "Sondong",
        "LaBebe 🦧🦧",
        "Bingus",
        "Léonat",
        "Spoingus",
        "Abbash getter",
        "Oatmeal",
        "Sir Laveen Silverdragon Gamadon III",
        "Wise Car",
        "Delvin Ze Dong",
        "Herbert",
        "David Bischgauvsethi",
        "Big Floppa",
        "Léooo van Goof",
        "Megatron",
        "Lucas Fentaly Heisenberg",
        "Kevin",
        "Justin Caliou 👨‍🦲",
        "Divad Hoffgetter",
        "Security Car",
        "Sanjana Paramanantharajas Katamarana",
        "Veteran Car",
        "Sad Hampter",
    ];

    const [name, setName] = React.useState(names[Math.floor(Math.random() * names.length)]);
    const [tmpProfilePicture, setTmpProfilePicture] = React.useState("None");
    const params = useParams();
    const room = params.id;
    const fallbackImages = [

        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1IhHh8eFgNcMGUddr-UnI1OJ32jI7eRf4deL4EQLOrA&s",
        "https://ih1.redbubble.net/image.2861806059.1868/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
        "https://media.tenor.com/3FFhUHl_yooAAAAe/cat-oatmeal.png",
        "https://media.tenor.com/JYURG-uVQV0AAAAe/megatron-orange.png",
        "https://i.pinimg.com/736x/22/40/ee/2240ee46d8be50e1231b7ae5b41bf414.jpg",
        "https://i.kym-cdn.com/entries/icons/facebook/000/042/808/cover1.jpg",
        "https://i.ytimg.com/vi/XJFFgc9jZz0/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgXyhUMA8=&rs=AOn4CLAYiRv4uZstkTjZaNsEdOwbsP6LAA",
        "https://media.licdn.com/dms/image/D4D03AQGt8kXSUqmhBg/profile-displayphoto-shrink_800_800/0/1693219459486?e=2147483647&v=beta&t=kxpWDcTBCz-I9cqbe6yX9QMCQtZNAVqJu8lf3zFh__8"
    ]
    function handleUserSelection() {
        if (name === "") {
            return;
        }
        setUsername(name);
        setProfilePicture(tmpProfilePicture);
        const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
        setUserState("waiting");
        socket.emit("user selection", { name, profilePicture: randomFallback, room });
    }


    return (
        <>
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={5}
            >

                <Heading>Choose your name</Heading>
                <Input
                    onChange={(e) => setName(e.target.value)}
                    maxLength={15}
                    value={name}
                    placeholder="Name" />

                <Button colorScheme='pink' onClick={handleUserSelection}>Done</Button>
            </Flex>
        </>
    )
}