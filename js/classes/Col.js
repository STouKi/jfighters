class Col
{
	constructor(x, type, y)
	{
			this.x         = x;
			this.y         = y;
			this.type      = type;
			this.character = "";
			this.weapon    = "";
	}

	static create(size, indexRow)
	{
		const cols = [];

		for (let i = 0; i < size; i++) {
			const randomNb = Col.getRandomNb();

			if (randomNb == 0) {
				cols.push(new Col(i, 'wall', indexRow));
			} else {
				cols.push(new Col(i, 'floor', indexRow));
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
