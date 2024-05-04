# WhoIsTheMostLikely

WhoIsTheMostLikely is a simple multiplayer game with socket io connection. Its a party game where the players can vote on who is the most likely to do a certain thing.

## Installation

For the frontend you simply need to install all the dependecies like this: 

```bash
npm install
```
And after that you need to fill in the .env file with the correct backend url:

```js
VITE_BACKEND_URL= "YOUR_BACKEND_URL_HERE"
```

## How can I play?

### Lobby

Firstly you need to create a lobby and invite your firends by either sending them the URL or the code to the lobby. The Host of the lobby is simply always the player who joined the first. This player can change the lobby settings and progress the Game itself. 

### Phase 1: Question writing

When the game starts each player has to write a set amount of questions, which are answerable with a name of a player or some random person. For this you have a time limit

### Phase 2.1: Voting

After all the players have finished writing their questionst the voting phase starts. There will be a random question dispalyed and you need to write down the name of the person, who is the most likely to do that thing. After all the players have voted for this questions, there will be a scoreboard for which name has recived the most votes. This goes on until there are no more questions Available.

### Phase 3: End

When all the questions have been voted on there will be an end screen with all the score board again displayed in a overview. Now the lobby host can either start a new game or you can leave the lobby.


## License

You are allowed to change it etc, but you need to give @DaniDevOfficial visible Credit, with a link to the original. 
