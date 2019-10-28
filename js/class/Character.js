class Character
{
    constructor(name, color, statut, weapon)
    {
        this.name   = name;
        this.color  = color;
        this.statut = statut;
        this.weapon = weapon;
        this.health = 100;
        this.defense = 'inactive';
        this.position;
    }

    chooseAction(grid)
    {
        if (this.checkEnnemy(grid)) {
            this.displayChoice();
        } else {
            this.chooseMove(grid);
        }
    }

    displayChoice()
    {
        $('#game').append('<div id="modal-bg"><div id="modal-box"><button type="button" id="btn-attack" class="action-btn"><img src="images/weapons/fist.svg" alt="Gun" width="100px" /></button><button type="button" id="btn-defense" class="action-btn"><img src="images/shield.svg" alt="Shield" width="100px" /></button><button type="button" class="action-btn"><img src="images/footprints.svg" alt="Footprints" width="100px" /></button></div></div>');
    }

    chooseMove(grid)
    {
        this.highlight("top", grid);
        this.highlight("right", grid);
        this.highlight("down", grid);
        this.highlight("left", grid);
    }

    hglt(grid, coord, rowIndex, colIndex, direction)
    {
        let col = grid.rows[coord[rowIndex]].cols[coord[colIndex]];

        if (col.character == "" && col.type == "floor") {
            let htmlCol = $('[data-index_row="'+coord[rowIndex]+'"] [data-index_col="'+coord[colIndex]+'"]');
            htmlCol.addClass('highlight');
            this.addFootprints(htmlCol, this.getRotation(direction));

            return true;
        } else {
            return false;
        }
    }

    getRotation(direction)
    {
        switch (direction) {
            case 'top':
                return 0;
                break;
            case 'right':
                return 90;
                break;
            case 'down':
                return 180;
                break;
            case 'left':
                return 270;
                break;
            default:
                return 0;
        }
    }

    highlight(direction, grid)
    {
        for (let i = 1; i < 4; i++) {
            let coord = this.getCoord(i);

            if (direction == "top" && coord['previousRowIndex'] >= 0) {
                if (!this.hglt(grid, coord, 'previousRowIndex', 'colIndex', direction)) {
                    break;
                }
            } else if (direction == "right" && coord['nextColIndex'] <= 9) {
                if (!this.hglt(grid, coord, 'rowIndex', 'nextColIndex', direction)) {
                    break;
                }
            } else if (direction == "down" && coord['nextRowIndex'] <= 9) {
                if (!this.hglt(grid, coord, 'nextRowIndex', 'colIndex', direction)) {
                    break;
                }
            } else if (direction == "left" && coord['previousColIndex'] >= 0) {
                if (!this.hglt(grid, coord, 'rowIndex', 'previousColIndex', direction)) {
                    break;
                }
            }
        }
    }

    move(grid, htmlFloor, gameBar, characters)
    {
        const oStartingSquare = grid.rows[this.position['y']].cols[this.position['x']]
        const oArrivalSquare  = grid.rows[htmlFloor.data('index_row')].cols[htmlFloor.data('index_col')];

        const htmlStartingSquare = $('[data-index_row="'+this.position['y']+'"] [data-index_col="'+this.position['x']+'"]');
        const htmlArrivalSquare  = $('[data-index_row="'+htmlFloor.data('index_row')+'"] [data-index_col="'+htmlFloor.data('index_col')+'"]');

        if (oArrivalSquare.weapon != "") {
            this.weapon = oArrivalSquare.weapon;

            oArrivalSquare.weapon = "";
            htmlArrivalSquare.empty();

            gameBar.reGenerate();
        }

        this.position =
        {
            x : htmlFloor.data('index_col'),
            y : htmlFloor.data('index_row'),
        }

        oStartingSquare.character = "";
        oArrivalSquare.character  = this;

        htmlStartingSquare.empty();
        htmlArrivalSquare.append('<img src="images/characters/'+this.color+'.svg" width="40px" />');

        this.deleteFootprints();

        if (this.checkEnnemy(grid)) {
            this.displayChoice();
        } else {
            this.finishTour(grid, characters);
        }
    }

    checkEnnemy(grid)
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
            return true;
        } else {
            return false;
        }
    }

    addFootprints(htmlFloor, rotation)
    {
        htmlFloor.append('<svg class="footprints" viewBox="0 0 512 512" width="40" height="40" xmlns="http://www.w3.org/2000/svg" transform="rotate('+rotation+')"><path d="m332.118 489.943a34.6 34.6 0 0 0 36.864-32.183l1.519-22.411-67.324-30.1-3.242 47.835a34.642 34.642 0 0 0 32.183 36.859z"/><path d="m307.837 352.35 71.305 33.561 23.085-82.655c16.523-76.042 6.307-132.859-28.036-155.9-20.142-13.517-41.943-10.763-54.613-2.035-.143.1-.291.191-.442.277-.1.056-11.473 6.713-21.448 21.458-13.3 19.65-18.006 43.717-14 71.538z"/><path d="m208.509 289.305-67.382 29.979 1.473 22.416a34.6 34.6 0 1 0 69.057-4.55z"/><path d="m132.58 269.828 71.368-33.428 24.366-113.715c4.055-27.813-.61-51.888-13.868-71.563-9.948-14.764-21.312-21.443-21.425-21.508-.14-.081-.293-.178-.426-.269-12.652-8.75-34.447-11.546-54.616 1.933-34.387 22.979-44.708 79.778-28.328 155.851z"/></svg>');
    }

    deleteFootprints()
    {
        $('.highlight').each(function() {
            $(this).removeClass('highlight');
            $('.footprints').remove();
        });
    }

    finishTour(grid, characters)
    {
        $.each(characters, function() {
            if (this.statut == 'active') {
                this.statut = 'passive';
            } else {
                this.statut = 'active';
                this.chooseAction(grid);
            }
        });
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

    attack(passiveCharacter, gameBar, grid, characters)
    {
        if (passiveCharacter.defense == 'active') {
            passiveCharacter.health -= this.weapon.attack / 2;
            passiveCharacter.defense = 'inactive';
        } else {
            passiveCharacter.health -= this.weapon.attack;
        }

        if (passiveCharacter.health <= 0)
        {
            passiveCharacter.die(this);
        } else {
            gameBar.reGenerate();

            this.finishTour(grid, characters);
        }
    }

    die(winner)
    {
        this.health = 0;

        $('#game').empty();
        $('#game').append('<div id="menu-end" class="container-fluid d-flex justify-content-center align-items-center"><div class="d-flex flex-column"><h1>'+winner.name+' a tué '+this.name+' !'+'</h1><div class="d-flex align-items-end justify-content-between mb-3"><img src="images/characters/'+winner.color+'.svg" alt="Personnage bleu" width="100px" class="mr-3"><img src="images/characters/'+this.color+'-dead.svg" alt="Personnage rouge" width="140px"></div><button type="button" id="btn-replay">RECOMMENCER</button></div></div>');
    }

    defense(grid, characters)
    {
        this.defense = 'active';
        this.finishTour(grid, characters);
    }

    static getCharactersWithStatus(characters)
    {
        let activeCharacter;
        let passiveCharacter;

        $.each(characters,
            function()
            {
                if (this.statut == 'active') {
                    activeCharacter = this;
                } else {
                    passiveCharacter = this;
                }
            }
        );

        const charactersWithStatus =
        {
            activeCharacter  : activeCharacter,
            passiveCharacter : passiveCharacter,
        }

        return charactersWithStatus;
    }

    static create(p1, p2, weapon)
    {
        const characters =
        [
            new Character(p1, 'blue', 'active', weapon),
            new Character(p2, 'red', 'passive', weapon),
        ];

        return characters;
    }
}
