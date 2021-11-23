class Weapon
{
	constructor(name, attack)
	{
			this.name   = name;
			this.attack = attack;
	}

	static create()
	{
		const weapons =
		[
			new Weapon('fist', 10),
			new Weapon('knife', 30),
			new Weapon('gun', 50),
			new Weapon('revolver', 50),
			new Weapon('shotgun', 60),
			new Weapon('shotgun-1', 60),
			new Weapon('rifle', 70),
			new Weapon('rifle-1', 70),
			new Weapon('rifle-2', 70),
			new Weapon('machine-gun', 90),
			new Weapon('launcher', 100),
			new Weapon('sniper', 100),
		];

		return weapons;
	}
}
