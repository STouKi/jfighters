class Col
{
    constructor(index, type)
    {
        this.index = index;
        this.type = type;
        this.character;
        this.weapon;
    }

    static create(size)
    {
        const cols = [];

        for(let i = 0; i < size; i++) {
            const randomNb = Col.getRandomNb();

            if (randomNb == 0) {
                cols.push(new Col(i, 'wall'));
            } else {
                cols.push(new Col(i, 'floor'));
            }
        }

        return cols;
    }

    static getRandomNb()
    {
        const randomNb = Math.floor(Math.random()*5);
        return randomNb;
    }
}
