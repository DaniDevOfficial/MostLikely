export interface Room {
    [roomId: string]: {
        roomId: string;
        game: Game;
        players: Player[];
        questions: Question[];
        finishedWritingQuestions: string[];
        voting: [
            currentVoteId: string,
            currentVoteStatus: string
        ]
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
    id: string;
    question: string;
    author: string;
    votes?: Vote[];
}

export interface Vote {
    toWho: string;
    amountOfVotes: number;
}


export interface Rooms {
    rooms: Room[];
}
