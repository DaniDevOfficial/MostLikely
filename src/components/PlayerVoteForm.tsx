import { FormControl, FormLabel, FormHelperText, Input, List, ListItem, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

export function PlayerVoteForm({ allPlayers, handlePlayerSelect }) {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (event) => {
        const inputText = event.target.value;
        setSearchText(inputText);

        // Filter suggestions based on input text
        const filteredPlayers = allPlayers.filter(player =>
            player.name.toLowerCase().includes(inputText.toLowerCase())
        );
        handlePlayerSelect(inputText)
        setSuggestions(filteredPlayers);
    };

    useEffect(() => {
        handleInputChange({ target: { value: '' } })
    }, []);

    const handleSuggestionClick = (player) => {
        setSearchText(player.name);
        setSuggestions([]);
        handlePlayerSelect(player.name);
    };

    return (
        <FormControl w={"80%"} isRequired my={5}>
            <FormHelperText>Enter the name of the player to vote for (you can enter any name)</FormHelperText>
            <Input
                value={searchText}
                onChange={handleInputChange}
                placeholder="Enter player name"
                maxLength={15}

            />
            {/* Display suggestions if available */}
            {suggestions.length > 0 && (
                <List mt={2}>
                    {suggestions.map((player, index) => (
                        <ListItem key={index}>
                            <Button variant="link" onClick={() => handleSuggestionClick(player)}>
                                {player.name}
                            </Button>
                        </ListItem>
                    ))}
                </List>
            )}
        </FormControl>
    );
}
