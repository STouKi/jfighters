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
            const randomWall = oGrid.getRandomWall();

            randomWall['col'].character = this;

            this.row = randomWall['row'];
            this.col = randomWall['col'];
        });
    }

    getWeapons(weapons, nb)
    {
        for (let i = 0; i < nb; i++) {
            const randomWall = this.getRandomWall();
            randomWall['col'].weapon = weapons[Math.floor(Math.random()*weapons.length)];
        }
    }

    getRandomWall()
    {
        const row = this.rows[Math.floor(Math.random()*this.rows.length)];
        const col = row.cols[Math.floor(Math.random()*row.cols.length)];

        const coord =
        {
            row : row,
            col : col
        }

        return coord;
    }

    generate()
    {
        let html = '<div id="grid">';

        $.each(this.rows, function() {
            html += '<div class="row row-'+this.index+'">';

            $.each(this.cols, function() {
                html += '<div class="col d-flex justify-content-center align-items-center square square-'+this.index+' '+this.type+'">';

                if (typeof this.character != 'undefined') {
                    html += '<img src="images/characters/'+this.character.color+'.svg" width="40px" />';
                }

                if (typeof this.weapon != 'undefined') {
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
