class Character
{
    constructor(name, color)
    {
        this.name   = name;
        this.color  = color;
        this.health = 100;
        this.weapon;
        this.statut;
        this.row;
        this.col;
    }

    chooseAction(grid)
    {
        const coord = getCoord(1);

        let upCol;
        let rightCol;
        let downCol;
        let leftCol;

        if (coord[previousRowIndex] >= 0) {
            upCol = grid.rows[coord[previousRowIndex]].cols[coord[colIndex]];
        }

        if (coord[nextColIndex] <= 9) {
            rightCol = grid.rows[coord[rowIndex]].cols[coord[nextColIndex]];
        }

        if (coord[nextRowIndex] <= 9) {
            downCol = grid.rows[coord[nextRowIndex]].cols[coord[colIndex]];
        }

        if (coord[previousColIndex] >= 0) {
            leftCol = grid.rows[coord[rowIndex]].cols[coord[previousColIndex]];
        }

        if ((upCol && upCol.character) || (rightCol && rightCol.character) || (downCol && downCol.character) || (leftCol && leftCol.character)) {
            $('#modal-bg').removeClass('hide');
        } else {
            this.move(grid);
        }
    }

    move(grid)
    {
        for (let i = 1; i < 4; i++) {
            let coord = getCoord(i);

            let upCol;
            let rightCol;
            let downCol;
            let leftCol;

            if (coord[previousRowIndex] >= 0) {
                upCol = grid.rows[coord[previousRowIndex]].cols[coord[colIndex]];
            }

            if (coord[nextColIndex] <= 9) {
                rightCol = grid.rows[coord[rowIndex]].cols[coord[nextColIndex]];
            }

            if (coord[nextRowIndex] <= 9) {
                downCol = grid.rows[coord[nextRowIndex]].cols[coord[colIndex]];
            }

            if (coord[previousColIndex] >= 0) {
                leftCol = grid.rows[coord[rowIndex]].cols[coord[previousColIndex]];
            }

            if (upCol && typeof upCol.character == 'undefined' && upCol.type == 'floor') {
                $('.row-'+(coord[previousRowIndex])+' .square-'+coord[colIndex]).addClass('highlight');
            }

            if (rightCol && typeof rightCol.character == 'undefined' && rightCol.type == 'floor') {
                $('.row-'+coord[rowIndex]+' .square-'+(coord[nextColIndex])).addClass('highlight');
            }

            if (downCol && typeof downCol.character == 'undefined' && downCol.type == 'floor') {
                $('.row-'+(coord[nextRowIndex])+' .square-'+coord[colIndex]).addClass('highlight');
            }

            if (leftCol && typeof leftCol.character == 'undefined' && leftCol.type == 'floor') {
                $('.row-'+coord[rowIndex]+' .square-'+(coord[previousColIndex])).addClass('highlight');
            }
        }
    }

    attack()
    {

    }

    defense()
    {

    }

    getCoord(i)
    {
        let coord =
        {
            previousRowIndex : this.row.index - i,
            previousColIndex : this.col.index - i,
            rowIndex         : this.row.index,
            colIndex         : this.col.index,
            nextRowIndex     : this.row.index + i,
            nextColIndex     : this.col.index + i
        };

        return coord;
    }

    static create(p1, p2)
    {
        const characters =
        [
            new Character(p1, 'blue'),
            new Character(p2, 'red'),
        ];

        return characters;
    }

    static endTour()
    {

    }
}
