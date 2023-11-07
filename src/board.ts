export type Generator<T>= { next:() => T } 

export type Position = {
    row: number,
    col: number
}

export type Match<T> = BoardEvent<T> & {
    matched: T,
    positions: Position[]
}

export type Refill<T> = BoardEvent<T>  & {

}

export type BoardEvent<T> = {
    kind: string
   // { kind: ‘Match’, match: { matched: ‘A’, positions: [{row: 0, col: 0}, {row: 0, col: 1},{row: 0, col: 2}]}}
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
         
         if(first.col === second.col || first.row === second.row &&
                this.hasMatch(second ,this.piece(first)) || this.hasMatch(first, this.piece(second)))
              { 
                return true}
         

         return false
    }

    hasMatch(pos: Position, type: T): boolean {
        var horizLen = 1;
        
        //Check left
        var i = pos.col-1
       // let position: Position =  {row: pos.row, col:i};
        while(i >= 0 && this.piece({row: pos.row, col:i}) == type)
        {
            i -= 1
            horizLen += 1
        }
        
        // right
        i = pos.col + 1
        while(i < this.width && this.piece({row: pos.row, col:i}) == type)
        {
            i += 1
            horizLen += 1
        }
        if (horizLen >= 3 )
        {return true}

        // Collonetjek
        var vertLen = 1

        // Ned
        i = pos.row -1
        while(i >= 0 && this.piece({row: i, col: pos.col}) == type)
        {
            i -= 1
            vertLen += 1
        }

        // OP!
        i = pos.row + 1
        while(i < this.height && this.piece({row: i, col: pos.col}) == type)
        {
            i += 1
            vertLen += 1
        }
        return vertLen >= 3
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
