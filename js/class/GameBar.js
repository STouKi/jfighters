class GameBar
{
    constructor(p1, p2)
    {
        this.p1 = p1;
        this.p2 = p2
    }

    generate()
    {
        $('#game').prepend('<div id="game-bar" class="p-2"><div class="d-flex align-items-center"><div class="d-flex align-items-center w-100"><img src="images/characters/blue.svg" alt="Personnage bleu" width="100px" class="mr-3" /><div class="d-flex flex-column w-100"><p class="p-name">'+this.p1.name+'</p><div class="d-flex align-items-center mb-3"><img src="images/heart.svg" alt="Coeur" width="50px" class="mr-3" /><div class="health-container"><div class="health-bar hp'+this.p1.health+'"></div></div></div><div class="d-flex align-items-center"><img src="images/weapons/'+this.p1.weapon.name+'.svg" alt="Poing" width="50px"></div></div></div><img src="images/VS.gif" alt="Versus" width="100px" class="mx-5" /><div class="d-flex align-items-center w-100"><div class="d-flex flex-column align-items-end w-100"><p class="p-name">'+this.p2.name+'</p><div class="d-flex align-items-center mb-3 w-100"><div class="health-container"><div class="health-bar hp'+this.p2.health+'"></div></div><img src="images/heart.svg" alt="Coeur" width="50px" class="ml-3"></div><div class="d-flex align-items-center"><img src="images/weapons/'+this.p2.weapon.name+'.svg" alt="Poing" width="50px"></div></div><img src="images/characters/red.svg" alt="Personnage rouge" width="100px" class="ml-3" /></div></div></div>');
    }

    reGenerate()
    {
        $('#game-bar').remove();

        this.generate();
    }
}
