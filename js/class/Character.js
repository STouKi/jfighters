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
        let previousRowIndex = this.row.index - 1;
        let previousColIndex = this.col.index - 1;

        let rowIndex = this.row.index;
        let colIndex = this.col.index;

        let nextRowIndex = this.row.index + 1;
        let nextColIndex = this.col.index + 1;

        if (previousRowIndex >= 0) {
            let upCol = grid.rows[previousRowIndex].cols[colIndex];
        }

        if (nextColIndex <= 9) {
            let rightCol = grid.rows[rowIndex].cols[nextColIndex];
        }

        if (nextRowIndex <= 9) {
            let downCol = grid.rows[nextRowIndex].cols[colIndex];
        }

        if (previousColIndex >= 0) {
            let leftCol = grid.rows[rowIndex].cols[previousColIndex];
        }

        if ((upCol && typeof upCol.character != 'undefined') || (rightCol && typeof rightCol.character != 'undefined') || (downCol && typeof downCol.character != 'undefined') || (leftCol && typeof leftCol.character != 'undefined')) {
            $('#modal-bg').removeClass('hide');
        } else {
            this.move(grid);
        }
    }

    move(grid)
    {
        for (let i = 1; i < 4; i++) {
            let previousRowIndex = this.row.index - i;
            let previousColIndex = this.col.index - i;

            let rowIndex = this.row.index;
            let colIndex = this.col.index;

            let nextRowIndex = this.row.index + i;
            let nextColIndex = this.col.index + i;

            if (previousRowIndex >= 0) {
                let upCol = grid.rows[previousRowIndex].cols[colIndex];
            }

            if (nextColIndex <= 9) {
                let rightCol = grid.rows[rowIndex].cols[nextColIndex];
            }

            if (nextRowIndex <= 9) {
                let downCol = grid.rows[nextRowIndex].cols[colIndex];
            }

            if (previousColIndex >= 0) {
                let leftCol = grid.rows[rowIndex].cols[previousColIndex];
            }

            if (upCol && typeof upCol.character == 'undefined' && upCol.type == 'floor') {
                $('.row-'+(previousRowIndex)+' .square-'+colIndex).addClass('highlight');
            }

            if (rightCol && typeof rightCol.character == 'undefined' && rightCol.type == 'floor') {
                $('.row-'+rowIndex+' .square-'+(nextColIndex)).addClass('highlight');
            }

            if (downCol && typeof downCol.character == 'undefined' && downCol.type == 'floor') {
                $('.row-'+(nextRowIndex)+' .square-'+colIndex).addClass('highlight');
            }

            if (leftCol && typeof leftCol.character == 'undefined' && leftCol.type == 'floor') {
                $('.row-'+rowIndex+' .square-'+(previousColIndex)).addClass('highlight');
            }
        }
    }

    attack()
    {

    }

    defense()
    {

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
