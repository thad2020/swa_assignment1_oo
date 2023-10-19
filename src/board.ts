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
    pieces: T[];

    // Constructor here
    constructor(generator, width, height) {
        this.width = width;
        this.height = height;
        this.pieces = [];
        this.setPiece(generator, width, height);
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
        let i = 0;

        this.positions().forEach(element => {
            const value = this.pieces[i];

            if (element.row === p.row && element.col === p.col) {
                returnValue = <T> value
            }

            i++;
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
            const firstValue = this.piece(first);
            const secondValue = this.piece(second);

            this.positions().forEach(element => {
                if (element.row === first.row && element.col === first.col) {
                    this.pieces[element.row * this.width + element.col] = secondValue
                }
                if (element.row === second.row && element.col === second.col) {
                    this.pieces[element.row * this.width + element.col] = firstValue
                }
            });
        }
    }

    setPiece(generated: Generator<T>, width: number, height: number) {
        for (let i = 0; i < width * height; i++) {
            console.log(i)
            this.pieces.push(generated.next())
        }

        console.log(this.pieces)
    }
}
