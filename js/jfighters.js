$('#btn-play').click(function() {
    $('#menu').addClass('hide');
    $('#game').removeClass('hide');

    const weapons = Weapon.create();

    characters = Character.create($('#name-p1').val(), $('#name-p2').val(), weapons[0]);
    $('.input-menu').val('');

    gameBar = new GameBar(characters[0], characters[1]);
    gameBar.generate();

    grid = new Grid(10);
    grid.getCharacters(characters);
    grid.getWeapons(weapons, 4);
    grid.generate();

    characters[0].chooseAction(grid);
});

$('#game').on('click', '.highlight', function() {
    const charactersWithStatus = Character.getCharactersWithStatus(characters);
    charactersWithStatus['activeCharacter'].move(grid, $(this), gameBar, characters);
});

$('#game').on('click', '#btn-attack', function() {
    $('#modal-bg').remove();
    const charactersWithStatus = Character.getCharactersWithStatus(characters);
    charactersWithStatus['activeCharacter'].attack(charactersWithStatus['passiveCharacter'], gameBar, grid, characters);
});

$('#game').on('click', '#btn-defense', function() {
    $('modal-bg').remove();
    const charactersWithStatus = Character.getCharactersWithStatus(characters);
    charactersWithStatus['activeCharacter'].defense(grid, characters);
});

$('#game').on('click', '#btn-replay', function() {
    $('#menu-end').remove();
    $('#menu').removeClass('hide');
})
