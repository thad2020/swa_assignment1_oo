export type Generator<T>= { next:() => T } 

export type Position = {
    row: number,
    col: number
}

export type Match<T> = {
    matched: T,
    positions: Position[]
}

export type BoardEvent<T> = {

};

export type BoardListener<T> = {

};

export class Board<T> {
    readonly width: number
    readonly height: number

    // Constructor here
    constructor(generator, width, height) {

        this.width = width;
        this.height = height;
    }

    addListener(listener: BoardListener<T>) {
    }

    positions(): Position[] {
        let array = [];
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
               array.push({row: i, col: j})
            }
        };
        return array;
    }

    piece(p: Position): T | undefined {
        switch (p) {
            case {row: 0, col: 0}:
                return <T> 'A'
            case {row: 1, col: 1}:
                return <T> 'A'
            case {row: 0, col: 1}:
                return <T> 'B'
            case {row: 2, col: 0}:
                return <T> 'B'
            case {row: 1, col: 0}:
                return <T> 'C'
            case {row: 2, col: 1}:
                return <T> 'C'
            default:
                undefined;
        }
    }

    canMove(first: Position, second: Position): boolean {
    }
    
    move(first: Position, second: Position) {
    }
}
