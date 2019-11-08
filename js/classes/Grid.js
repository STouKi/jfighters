class Grid
{
    constructor(size)
    {
        this.rows = Row.create(size);
    }

    getRandomFloor()
    {
        const row = this.rows[Math.floor(Math.random()*this.rows.length)];
        const col = row.cols[Math.floor(Math.random()*row.cols.length)];

        const randomFloor =
        {
            row : row,
            col : col
        }

        if (col.type == "wall" || col.character != "" || col.weapon != "") {
            return this.getRandomFloor();
        } else {
            return randomFloor;
        }
    }

    getCharacters(characters)
    {
        const oGrid = this;

        $.each(characters, function() {
            const randomFloor = oGrid.getRandomFloor();

            randomFloor['col'].character = this;

            this.position =
            {
                x : randomFloor['col'].x,
                y : randomFloor['row'].index
            }
        });
    }

    getWeapons(weapons, nb)
    {
        for (let i = 0; i < nb; i++) {
            const randomFloor = this.getRandomFloor();
            const weapon = weapons[Math.floor(Math.random()*weapons.length)];

            if (weapon.name == 'fist') {
                i--;
            } else {
                randomFloor['col'].weapon = weapon;
            }
        }
    }

    generate()
    {
        let html = '<div id="grid">';

        $.each(this.rows, function() {
            const indexRow = this.index;

            html += '<div data-index_row="'+indexRow+'" class="row">';

            $.each(this.cols, function() {
                html += '<div data-index_row="'+indexRow+'" data-index_col="'+this.x+'" class="col d-flex justify-content-center align-items-center square '+this.type+'">';

                if (this.character != "") {
                    html += '<img src="images/characters/'+this.character.color+'/'+this.character.color+'.svg" alt="Personnage '+this.character.color+'" width="40px" />';
                }

                if (this.weapon != "") {
                    html += '<img src="images/weapons/'+this.weapon.name+'.svg" alt="'+this.weapon.name+'" width="40px" />';
                }

                html += '</div>';
            });

            html += '</div>';
        });

        html += '</div>';

        $('#game').append(html);
    }
}
