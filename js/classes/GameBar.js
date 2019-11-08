class GameBar
{
    constructor(p1, p2)
    {
        this.p1 = p1;
        this.p2 = p2
    }

    generate()
    {
        $('#game').prepend('<div id="game-bar" class="p-2"><div class="d-flex align-items-center"><div class="d-flex align-items-center w-100"><img src="images/characters/blue/blue.svg" alt="Personnage bleu" width="100px" class="mr-3" /><div class="d-flex flex-column w-100"><p class="p-name">'+this.p1.name+'</p><div id="p1-health-div" class="d-flex align-items-center mb-3"><img src="images/heart.svg" alt="Coeur" width="50px" class="mr-3" /><div class="health-container"><div class="health-bar" style="width:'+this.p1.health+'%"></div></div></div><div id="p1-weapons-container" class="d-flex justify-content-between"><div class="d-flex"><img src="images/weapons/'+this.p1.weapon.name+'.svg" alt="'+this.p1.weapon.name+'" width="50px" class="mr-3" /><p>Attack : <b>'+this.p1.weapon.attack+'</b></p></div></div></div></div><img src="images/versus.png" alt="Versus" class="mx-5" /><div class="d-flex align-items-center w-100"><div class="d-flex flex-column align-items-end w-100"><p class="p-name">'+this.p2.name+'</p><div id="p2-health-div" class="d-flex align-items-center mb-3 w-100"><div class="health-container"><div class="health-bar" style="width:'+this.p2.health+'%"></div></div><img src="images/heart.svg" alt="Coeur" width="50px" class="ml-3"></div><div id="p2-weapons-container" class="d-flex justify-content-between w-100"><div class="d-flex"><p class="mr-3">Attack : <b>'+this.p2.weapon.attack+'</b></p><img src="images/weapons/'+this.p2.weapon.name+'.svg" alt="'+this.p2.weapon.name+'" width="50px" class="mr-1" /></div></div></div><img src="images/characters/red/red.svg" alt="Personnage rouge" width="100px" class="ml-3" /></div></div></div>');

        if (this.p1.shield == 'active') {
            $('#p1-health-div').append('<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 438.543 438.543" class="ml-3"> <path fill="rgb(75, 105, 136)" d="M396.58,5.424C392.959,1.807,388.675,0,383.727,0H54.824c-4.952,0-9.235,1.807-12.852,5.424 c-3.615,3.615-5.424,7.898-5.424,12.847v219.268c0,16.371,3.186,32.596,9.563,48.681c6.374,16.084,14.274,30.361,23.697,42.828 c9.423,12.47,20.651,24.605,33.689,36.405c13.04,11.806,25.078,21.6,36.116,29.409c11.038,7.803,22.554,15.181,34.545,22.121 c11.991,6.943,20.511,11.663,25.553,14.134c5.043,2.478,9.088,4.38,12.132,5.708c2.286,1.143,4.758,1.718,7.426,1.718 c2.671,0,5.14-0.575,7.428-1.718c3.042-1.328,7.087-3.23,12.128-5.708c5.041-2.471,13.565-7.19,25.557-14.134 c11.984-6.94,23.504-14.318,34.54-22.121c11.043-7.81,23.079-17.604,36.121-29.409c13.031-11.8,24.263-23.936,33.685-36.405 c9.421-12.467,17.319-26.744,23.705-42.828c6.379-16.085,9.562-32.31,9.562-48.681V18.271 C401.994,13.319,400.187,9.04,396.58,5.424z M347.178,237.539c0,33.5-22.367,67.759-67.095,102.781 c-17.892,14.082-38.164,27.124-60.813,39.115V54.813h127.908V237.539z"/> </svg>');
        }

        if (this.p2.shield == 'active') {
            $('#p2-health-div').prepend('<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 438.543 438.543" class="mr-3"> <path fill="rgb(75, 105, 136)" d="M396.58,5.424C392.959,1.807,388.675,0,383.727,0H54.824c-4.952,0-9.235,1.807-12.852,5.424 c-3.615,3.615-5.424,7.898-5.424,12.847v219.268c0,16.371,3.186,32.596,9.563,48.681c6.374,16.084,14.274,30.361,23.697,42.828 c9.423,12.47,20.651,24.605,33.689,36.405c13.04,11.806,25.078,21.6,36.116,29.409c11.038,7.803,22.554,15.181,34.545,22.121 c11.991,6.943,20.511,11.663,25.553,14.134c5.043,2.478,9.088,4.38,12.132,5.708c2.286,1.143,4.758,1.718,7.426,1.718 c2.671,0,5.14-0.575,7.428-1.718c3.042-1.328,7.087-3.23,12.128-5.708c5.041-2.471,13.565-7.19,25.557-14.134 c11.984-6.94,23.504-14.318,34.54-22.121c11.043-7.81,23.079-17.604,36.121-29.409c13.031-11.8,24.263-23.936,33.685-36.405 c9.421-12.467,17.319-26.744,23.705-42.828c6.379-16.085,9.562-32.31,9.562-48.681V18.271 C401.994,13.319,400.187,9.04,396.58,5.424z M347.178,237.539c0,33.5-22.367,67.759-67.095,102.781 c-17.892,14.082-38.164,27.124-60.813,39.115V54.813h127.908V237.539z"/> </svg>');
        }
    }

    reGenerate()
    {
        $('#game-bar').remove();

        this.generate();
    }
}
