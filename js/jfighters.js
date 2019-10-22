$('#btn-play').click(function() {
    $('#menu').addClass('hide');
    $('#game').removeClass('hide');

    const characters = Character.create($('#name-p1').val(), $('#name-p2').val());

    const gameBar = new GameBar(characters[0], characters[1]);
    gameBar.generate();

    const weapons = Weapon.create();

    const grid = new Grid(10);
    grid.getCharacters(characters);
    grid.getWeapons(weapons, 4);
    grid.generate();

    characters[0].chooseAction(grid);
});

$('.highlight').click(function() {
    const activeCharacter = Character.getActiveCharacter();
    activeCharacter.move(this);
});

$('#btn-attack').click(function() {
    const activeCharacter = Character.getActiveCharacter();
    const passiveCharacter = Character.getPassiveCharacter();

    activeCharacter.attack(passiveCharacter, activeCharacter.attack);
});

$('#btn-defense').click(function() {
    const activeCharacter = Character.getActiveCharacter();
    const passiveCharacter = Character.getPassiveCharacter();
});
