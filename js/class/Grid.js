class Grid
{
    constructor(size)
    {
        this.rows = Row.create(size);
    }

    getCharacters(characters)
    {
        const oGrid = this;

        $.each(characters, function() {
            const randomFloor = oGrid.getRandomFloor();

            randomFloor['col'].character = this;

            this.position =
            {
                x : randomFloor['col'].index,
                y : randomFloor['row'].index
            }
        });
    }

    getWeapons(weapons, nb)
    {
        for (let i = 0; i < nb; i++) {
            const randomFloor = this.getRandomFloor();
            randomFloor['col'].weapon = weapons[Math.floor(Math.random()*weapons.length)];
        }
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

        if (col.type == "wall") {
            return this.getRandomFloor();
        } else {
            return randomFloor;
        }
    }

    generate()
    {
        let html = '<div id="grid">';

        $.each(this.rows, function() {
            html += '<div data-index_row="'+this.index+'" class="row">';

            $.each(this.cols, function() {
                html += '<div data-index_col="'+this.index+'" class="col d-flex justify-content-center align-items-center square '+this.type+'">';

                if (this.character != "") {
                    html += '<img src="images/characters/'+this.character.color+'.svg" width="40px" />';
                }

                if (this.weapon != "") {
                    html += '<img src="images/weapons/'+this.weapon.name+'.svg" width="40px" />';
                }

                html += '</div>';
            });

            html += '</div>';
        });

        html += '</div>';

        $('#game').append(html);
    }
}
