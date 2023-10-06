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
        if (p.row === 0 && p.col === 0) {
            return <T> 'A'
        }
        if (p.row === 1 && p.col === 1) {
            return <T> 'A'
        }
        if (p.row === 0 && p.col === 1) {
            return <T> 'B'
        }
        if (p.row === 2 && p.col === 0) {
            return <T> 'B'
        }
        if (p.row === 1 && p.col === 0) {
            return <T> 'C'
        }
        if (p.row === 2 && p.col === 1) {
            return <T> 'C'
        }
        else {
            return undefined
        }
    }

    canMove(first: Position, second: Position): boolean {
        /* A move is legal if the two tiles are in the same row
         or the same column //and the swap result in a match. */
         if(first.col < 0 || second.col < 0 || first.row < 0 || second.row < 0
            || first.col > this.width-1  || second.col > this.width-1 || first.row > this.height-1 || second.row > this.height-1) {
            return false
         }

         if(first.col === second.col && first.row === second.row) {
            return false
         }
         
         if(first.col === second.col || first.row === second.row) {
            return true
         }

         
         
         return false
    }
    
    move(first: Position, second: Position) {
    }
}
