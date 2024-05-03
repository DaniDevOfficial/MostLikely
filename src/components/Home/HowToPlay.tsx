import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';

export function HowToPlay() {

    return (
        <>
            <Heading textAlign="center" mt={10} > How to play </Heading>

            <Flex
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="center"
                mt={10}
                gap={{ base: 4, md: 40 }}
                mb={"20vh"}
            >
                <Flex
                    flexDirection="column"
                    gap={4}
                    bg={useColorModeValue("gray.100", "gray.700")}
                    p={4}
                    borderRadius="md"
                >
                    <Heading fontSize="larger" color={useColorModeValue("pink.400", "pink.300")}>Join a game</Heading>
                    <Text >
                        You start by either creating a game or joining an existing game. If you want to join a game, you need to enter the code that your friend shared with you.
                    </Text>
                </Flex>
                <Flex
                    flexDirection="column"
                    gap={4}
                    bg={useColorModeValue("gray.100", "gray.700")}
                    p={4}
                    borderRadius="md"
                >
                    <Heading fontSize="larger" color={useColorModeValue("pink.400", "pink.300")}>Writing Questions</Heading>
                    <Text >
                        The host of the lobby will be able to change how many questions each player has to write. The host can also change the time limit for writing questions. Here you need to write questions that can be answered with a name of a player or some random person.
                    </Text>
                </Flex>

                <Flex
                    flexDirection="column"
                    gap={4}
                    bg={useColorModeValue("gray.100", "gray.700")}
                    p={4}
                    borderRadius="md"
                >
                    <Heading fontSize="larger" color={useColorModeValue("pink.400", "pink.300")}>Voting for each Question</Heading>
                    <Text >
                        Once all players have either written their questions or the time limit has been reached, the players will vote on each question on who is the most likely to do that action.
                    </Text>
                </Flex>
            </Flex>
        </>
    )
}
