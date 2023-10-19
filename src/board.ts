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
    readonly generator: Generator<T>
    boardPositions: Position[] = []

    // Constructor here
    constructor(generator, width, height) {
        this.width = width;
        this.height = height;
        this.generator = generator;
        this.boardPositions = this.positions();
    }

    addListener(listener: BoardListener<T>) {
    }

    positions(): Position[] {
        let array = [];
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                array.push({ row: i, col: j })
            }
        };

        return array;
    }

    piece(p: Position): T | undefined {
        let returnValue = undefined;

        this.positions().forEach(element => {
            const value = this.generator.next();

            if (element.row === p.row && element.col === p.col) {
                returnValue = <T> value
            }
        });
        
        return returnValue
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
        if(this.canMove(first, second)) {

            const firstValue = first;
            const secondValue = second;

            let newPositions: Position[] = [];

            for(let i = 0; i < this.boardPositions.length; i++) {
                if (this.boardPositions[i].row === first.row && this.boardPositions[i].col === first.col) {
                    newPositions.push(second)
                } else if (this.boardPositions[i].row === second.row && this.boardPositions[i].col === second.col) {
                    newPositions.push(first)
                } else {
                    newPositions.push(this.boardPositions[i])
                }
            }

            this.boardPositions = newPositions;
        }
    }
}
