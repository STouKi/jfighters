$('#btn-play').click(function() {
    $('#menu').addClass('hide');
    $('#game').removeClass('hide');

    const weapons = Weapon.create();

    let nameP1 = "Player 1";
    let nameP2 = "Player 2";

    if ($('#name-p1').val().length != 0) {
        nameP1 = $('#name-p1').val();
    }

    if ($('#name-p2').val().length != 0) {
        nameP2 = $('#name-p2').val();
    }

    characters = Character.create(nameP1, nameP2, weapons[0]);

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
    $('#modal-bg').remove();
    const charactersWithStatus = Character.getCharactersWithStatus(characters);
    charactersWithStatus['activeCharacter'].defense(grid, characters, gameBar);
});

$('#game').on('click', '#btn-restart', function() {
    $('#menu-end').remove();
    $('#menu').removeClass('hide');
})
