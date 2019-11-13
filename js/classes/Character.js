class Character
{
    constructor(name, color, statut, weapon)
    {
        this.name   = name;
        this.color  = color;
        this.statut = statut;
        this.weapon = weapon;
        this.health = 100;
        this.shield = 'inactive';
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

            if (direction == "top" && coord['previousRowIndex'] >= 0) {
                if (!this.squareIsApproachable(grid, coord, 'previousRowIndex', 'colIndex', direction)) {
                    break;
                }
            } else if (direction == "right" && coord['nextColIndex'] <= 9) {
                if (!this.squareIsApproachable(grid, coord, 'rowIndex', 'nextColIndex', direction)) {
                    break;
                }
            } else if (direction == "down" && coord['nextRowIndex'] <= 9) {
                if (!this.squareIsApproachable(grid, coord, 'nextRowIndex', 'colIndex', direction)) {
                    break;
                }
            } else if (direction == "left" && coord['previousColIndex'] >= 0) {
                if (!this.squareIsApproachable(grid, coord, 'rowIndex', 'previousColIndex', direction)) {
                    break;
                }
            }
        }
    }

    squareIsApproachable(grid, coord, rowIndex, colIndex, direction)
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

    addFootprints(htmlFloor, rotation)
    {
        htmlFloor.append('<svg class="footprints" viewBox="0 0 512 512" width="30%" xmlns="http://www.w3.org/2000/svg" transform="rotate('+rotation+')"><path d="m332.118 489.943a34.6 34.6 0 0 0 36.864-32.183l1.519-22.411-67.324-30.1-3.242 47.835a34.642 34.642 0 0 0 32.183 36.859z"/><path d="m307.837 352.35 71.305 33.561 23.085-82.655c16.523-76.042 6.307-132.859-28.036-155.9-20.142-13.517-41.943-10.763-54.613-2.035-.143.1-.291.191-.442.277-.1.056-11.473 6.713-21.448 21.458-13.3 19.65-18.006 43.717-14 71.538z"/><path d="m208.509 289.305-67.382 29.979 1.473 22.416a34.6 34.6 0 1 0 69.057-4.55z"/><path d="m132.58 269.828 71.368-33.428 24.366-113.715c4.055-27.813-.61-51.888-13.868-71.563-9.948-14.764-21.312-21.443-21.425-21.508-.14-.081-.293-.178-.426-.269-12.652-8.75-34.447-11.546-54.616 1.933-34.387 22.979-44.708 79.778-28.328 155.851z"/></svg>');
    }

    move(grid, htmlFloor, gameBar, characters)
    {
        const startingX = this.position['x'];
        const startingY = this.position['y'];

        const arrivalX = htmlFloor.data('index_col');
        const arrivalY = htmlFloor.data('index_row');

        const oStartingSquare = grid.rows[startingY].cols[startingX];
        const oArrivalSquare  = grid.rows[arrivalY].cols[arrivalX];

        const htmlStartingSquare = $('[data-index_row="'+startingY+'"] [data-index_col="'+startingX+'"]');
        const htmlArrivalSquare  = $('[data-index_row="'+arrivalY+'"] [data-index_col="'+arrivalX+'"]');

        const direction = this.checkDirection(oStartingSquare, oArrivalSquare);

        this.checkWeapon(direction, oStartingSquare, oArrivalSquare, grid, gameBar);

        this.position =
        {
            x : arrivalX,
            y : arrivalY,
        }

        oStartingSquare.character = "";
        oArrivalSquare.character  = this;

        htmlStartingSquare.children(':last-child').remove();

        htmlArrivalSquare.append('<img src="images/characters/'+this.color+'/'+this.color+'.svg" width="40px" />');

        this.deleteFootprints();

        if (this.checkEnnemy(grid)) {
            this.displayChoice();
        } else {
            this.finishTour(grid, characters);
        }
    }

    checkDirection(oStartingSquare, oArrivalSquare)
    {
        let direction;

        if (oStartingSquare.x == oArrivalSquare.x) { // Déplacement vertical
            if (oStartingSquare.y < oArrivalSquare.y) {
                direction = "down"
            } else {
                direction = "up";
            }

        } else { // Déplacement horizontal
            if (oStartingSquare.x < oArrivalSquare.x) {
                direction = "right"
            } else {
                direction = "left";
            }
        }

        return direction;
    }

    checkWeapon(direction, oStartingSquare, oArrivalSquare, grid, gameBar)
    {
        let crossedSquare;

        if (direction == "up") {
            for (let i = oStartingSquare.y - 1; i >= oArrivalSquare.y; i--)
            {
                crossedSquare = grid.rows[i].cols[oStartingSquare.x];

                if (crossedSquare.weapon != "") {
                    this.pickWeapon(crossedSquare, gameBar);
                }
            }
        } else if (direction == "right") {
            for (let i = oStartingSquare.x + 1; i <= oArrivalSquare.x; i++)
            {
                crossedSquare = grid.rows[oStartingSquare.y].cols[i];

                if (crossedSquare.weapon != "") {
                    this.pickWeapon(crossedSquare, gameBar);
                }
            }
        } else if (direction == "down") {
            for (let i = oStartingSquare.y + 1; i <= oArrivalSquare.y; i++)
            {
                crossedSquare = grid.rows[i].cols[oStartingSquare.x];

                if (crossedSquare.weapon != "") {
                    this.pickWeapon(crossedSquare, gameBar);
                }
            }
        } else {
            for (let i = oStartingSquare.x - 1; i >= oArrivalSquare.x; i--)
            {
                crossedSquare = grid.rows[oStartingSquare.y].cols[i];

                if (crossedSquare.weapon != "") {
                    this.pickWeapon(crossedSquare, gameBar);
                }
            }
        }
    }

    pickWeapon(crossedSquare, gameBar)
    {
        const htmlCrossedSquare = $('[data-index_row="'+crossedSquare.y+'"] [data-index_col="'+crossedSquare.x+'"]');

        let oldWeapon = "";

        if (this.weapon != "" && this.weapon.name != "fist") {
            oldWeapon = this.weapon;

            htmlCrossedSquare.html('<img src="images/weapons/'+oldWeapon.name+'.svg" alt="'+oldWeapon.name+'" width="40px" />');
        } else {
            htmlCrossedSquare.empty();
        }

        this.weapon = crossedSquare.weapon;
        crossedSquare.weapon = oldWeapon;

        gameBar.reGenerate();
    }

    deleteFootprints()
    {
        $('.highlight').each(function() {
            $(this).removeClass('highlight');
            $('.footprints').remove();
        });
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

    displayChoice()
    {
        const htmlChoice = '<div class="d-flex"><button type="button" id="btn-attack" class="btn-action"><img src="images/weapons/fist.svg" alt="Black gun in red round button" width="25px" /></button><button type="button" id="btn-defense" class="btn-action"><img src="images/shield.svg" alt="Black shield in blue round button" width="25px" /></button></div>';

        if (this.color == "blue") {
            $('#p1-weapons-container').append(htmlChoice);
        } else {
            $('#p2-weapons-container').prepend(htmlChoice);
        }
    }

    attack(passiveCharacter, gameBar, grid, characters)
    {
        if (passiveCharacter.shield == 'active') {
            passiveCharacter.health -= this.weapon.attack / 2;
            passiveCharacter.shield = 'inactive';
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

    defense(grid, characters, gameBar)
    {
        this.shield = 'active';
        gameBar.reGenerate();
        this.finishTour(grid, characters);
    }

    die(winner)
    {
        this.health = 0;

        $('#game').html('<div id="menu-end" class="container-fluid d-flex justify-content-center align-items-center"><div class="d-flex flex-column"><h1>'+winner.name+' killed '+this.name+' !'+'</h1><div class="d-flex align-items-end justify-content-between mb-3"><img src="images/characters/'+winner.color+'/'+winner.color+'.svg" alt="Personnage bleu" width="100px" class="mr-3"><img src="images/characters/'+this.color+'/'+this.color+'-dead.svg" alt="Personnage rouge" width="140px"></div><button type="button" id="btn-restart">RESTART</button></div></div>');
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

    static create(p1, p2, weapon)
    {
        const characters =
        [
            new Character(p1, 'blue', 'active', weapon),
            new Character(p2, 'red', 'passive', weapon),
        ];

        return characters;
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
}
