export interface Room {
    [roomId: string]: {
        game: {
            settings: {
                QuestionWriteTime: number;
                VoteTime: number;
                AmountOfQuestionsPerPlayer: number;
            };
            state: string;
        };
        players: Player[]; 
        questions: Question[]; 
    };
}

export interface Player {
    name: string;
    profilePicture: string;
    id: string;
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
