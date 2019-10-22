class Character
{
    constructor(name, color)
    {
        this.name   = name;
        this.color  = color;
        this.health = 100;
        this.weapon;
        this.statut;
        this.position;
    }

    chooseAction(grid)
    {
        const coord = this.getCoord(1);

        let upCol;
        let rightCol;
        let downCol;
        let leftCol;

        if (coord['previousRowIndex'] >= 0) {
            upCol = grid.rows[coord['previousRowIndex']].cols[coord['colIndex']];
        }

        if (coord['nextColIndex'] <= 9) {
            rightCol = grid.rows[coord['rowIndex']].cols[coord['nextColIndex']];
        }

        if (coord['nextRowIndex'] <= 9) {
            downCol = grid.rows[coord['nextRowIndex']].cols[coord['colIndex']];
        }

        if (coord['previousColIndex'] >= 0) {
            leftCol = grid.rows[coord['rowIndex']].cols[coord['previousColIndex']];
        }

        if ((upCol && upCol.character != "") || (rightCol && rightCol.character != "") || (downCol && downCol.character != "") || (leftCol && leftCol.character != "")) {
            $('#modal-bg').removeClass('hide');
        } else {
            this.chooseMove(grid);
        }
    }

    chooseMove(grid)
    {
        this.highlight("top", grid);
        this.highlight("right", grid);
        this.highlight("down", grid);
        this.highlight("left", grid);
    }

    highlight(direction, grid)
    {
        for (let i = 1; i < 4; i++) {
            let coord = this.getCoord(i);

            if (direction == "top") {
                if (coord['previousRowIndex'] >= 0) {
                    let upCol = grid.rows[coord['previousRowIndex']].cols[coord['colIndex']];

                    if (upCol.character == "" && upCol.type == 'floor') {
                        let htmlUpCol = $('[data-index_row="'+coord['previousRowIndex']+'"] [data-index_col="'+coord['colIndex']+'"]');
                        htmlUpCol.addClass('highlight');
                        this.addFootSprint(htmlUpCol, 0);
                    } else {
                        break;
                    }
                }
            } else if (direction == "right") {
                if (coord['nextColIndex'] <= 9) {
                    let rightCol = grid.rows[coord['rowIndex']].cols[coord['nextColIndex']];

                    if (rightCol.character == "" && rightCol.type == 'floor') {
                        let htmlRightCol = $('[data-index_row="'+coord['rowIndex']+'"] [data-index_col="'+coord['nextColIndex']+'"]');
                        htmlRightCol.addClass('highlight');
                        this.addFootSprint(htmlRightCol, 90);
                    } else {
                        break;
                    }
                }
            } else if (direction == "down") {
                if (coord['nextRowIndex'] <= 9) {
                    let downCol = grid.rows[coord['nextRowIndex']].cols[coord['colIndex']];

                    if (downCol.character == "" && downCol.type == 'floor') {
                        let htmlDownCol = $('[data-index_row="'+coord['nextRowIndex']+'"] [data-index_col="'+coord['colIndex']+'"]');
                        htmlDownCol.addClass('highlight');
                        this.addFootSprint(htmlDownCol, 180);
                    } else {
                        break;
                    }
                }
            } else {
                if (coord['previousColIndex'] >= 0) {
                    let leftCol = grid.rows[coord['rowIndex']].cols[coord['previousColIndex']];

                    if (leftCol.character == "" && leftCol.type == 'floor') {
                        let htmlLeftCol = $('[data-index_row="'+coord['rowIndex']+'"] [data-index_col="'+coord['previousColIndex']+'"]');
                        htmlLeftCol.addClass('highlight');
                        this.addFootSprint(htmlLeftCol, 270);
                    } else {
                        break;
                    }
                }
            }
        }
    }

    move(grid, htmlFloor)
    {
        grid.rows[this.position['y']].cols[this.position['x']].character = "";
        grid.rows[htmlFloor].cols[this.position['x']].character = "";
    }

    addFootSprint(htmlFloor, rotation)
    {
        htmlFloor.append('<svg viewBox="0 0 512 512" width="40" height="40" xmlns="http://www.w3.org/2000/svg" transform="rotate('+rotation+')"><path d="m332.118 489.943a34.6 34.6 0 0 0 36.864-32.183l1.519-22.411-67.324-30.1-3.242 47.835a34.642 34.642 0 0 0 32.183 36.859z"/><path d="m307.837 352.35 71.305 33.561 23.085-82.655c16.523-76.042 6.307-132.859-28.036-155.9-20.142-13.517-41.943-10.763-54.613-2.035-.143.1-.291.191-.442.277-.1.056-11.473 6.713-21.448 21.458-13.3 19.65-18.006 43.717-14 71.538z"/><path d="m208.509 289.305-67.382 29.979 1.473 22.416a34.6 34.6 0 1 0 69.057-4.55z"/><path d="m132.58 269.828 71.368-33.428 24.366-113.715c4.055-27.813-.61-51.888-13.868-71.563-9.948-14.764-21.312-21.443-21.425-21.508-.14-.081-.293-.178-.426-.269-12.652-8.75-34.447-11.546-54.616 1.933-34.387 22.979-44.708 79.778-28.328 155.851z"/></svg>');
    }

    getCoord(i)
    {
        let coord =
        {
            previousRowIndex : this.position['y'] - i,
            previousColIndex : this.position['x'] - i,
            rowIndex         : this.position['y'],
            colIndex         : this.position['x'],
            nextRowIndex     : this.position['y'] + i,
            nextColIndex     : this.position['x'] + i
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
