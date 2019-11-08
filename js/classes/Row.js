class Row
{
    constructor(index, size)
    {
        this.index = index;
        this.cols  = Col.create(size, index);
    }

    static create(size)
    {
        const rows = [];

        for(let i = 0; i < size; i++) {
            rows.push(new Row(i, size))
        }

        return rows;
    }
}
