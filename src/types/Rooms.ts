export interface Room {
    [roomId: string]: {
        game: Game;
        players: Player[];
        questions: Question[];
    };
}
export interface Game {
    settings: GameSettings;
    state: string;
}
export interface GameSettings {
    QuestionWriteTime: number;
    VoteTime: number;
    AmountOfQuestionsPerPlayer: number;
}
export interface Player {
    name?: string;
    profilePicture?: string;
    role?: string;
    playerId?: string;
}

export interface Question {
    question: string;
    author: string;
    votes: Vote[];
}

export interface Vote {
    toWho: string;
    amountOfVotes: number;
}


export interface Rooms {
    rooms: Room[];
}
