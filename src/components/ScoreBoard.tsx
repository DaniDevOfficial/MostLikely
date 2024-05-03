import { Flex, Text } from '@chakra-ui/react';

export function ScoreBoard({ question }) {

    function tallyUpVotes() {
        const votes = question.votes;

        const voteCount = votes.reduce((acc, vote) => {
            if (vote?.toWho === "Hehe This is more than 15 characters long") {
                return acc; // Skip this vote
            }
            if (acc[vote?.toWho]) {
                acc[vote?.toWho] += 1;
            } else {
                acc[vote?.toWho] = 1;
            }
            return acc;
        }, {});
        if (!voteCount || voteCount.length === 0 ||Object.keys(voteCount).length === 0) {
            return { "Nobody voted :(": -1 }; // Display "Nobody" with -1 vote
        }
        const sortedVoteCount = Object.entries(voteCount)
            .sort((a, b) => b[1] - a[1]);

        // Convert sorted array back to object
        const sortedVoteCountObject = Object.fromEntries(sortedVoteCount);

        return sortedVoteCountObject;
    }

    const currentVoteCounts = tallyUpVotes();

    return (
        <>

            {Object.entries(currentVoteCounts).map(([toWho, count], index) => {
                let circleColor;
                if (index === 0) {
                    circleColor = "goldenrod";
                } else if (index === 1) {
                    circleColor = "silver";
                } else if (index === 2) {
                    circleColor = "#cd7f32"; // Bronze color
                } else {
                    circleColor = "gray";
                }

                return (
                    <Flex
                        key={toWho}
                        justifyContent="space-between"
                        alignItems="center"
                        gap={8}
                        outline={`1px solid ${circleColor}`}
                        p={4}
                        my={2}
                        w={{ base: "80%", md: "60%" }}
                        borderRadius={"md"}
                        boxShadow="md"
                    >
                        <Flex alignItems="center">
                            <Flex
                                justifyContent="center"
                                alignItems="center"
                                bg={circleColor}
                                borderRadius="full"
                                w="36px"
                                h="36px"
                            >
                                <Text color="white" fontSize="xl" fontWeight="bold">
                                    {index + 1}
                                </Text>
                            </Flex>
                            <Text ml={4}>{toWho}</Text>
                        </Flex>
                        <Flex alignItems="center">
                            <Text fontSize="lg">Votes:</Text>
                            <Text ml={2}>{count}</Text>
                        </Flex>
                    </Flex>
                );
            })}
        </>
    )
}