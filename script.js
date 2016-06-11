var game = new Phaser.Game(640,480, Phaser.AUTO, 'world', {
  preload: preload, create: create, update: update });


function preload() {

  game.load.image('mySprite', 'sprite.png');
}

var mySprite;
var x = game.width/2;
var y = game.height/2;
var dirX = 10;
var dirY = 10;

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#333'; 

  mySprite = game.add.sprite( x, y, 'mySprite');
    //  scale sprites like this:

    mySprite.scale.x = 0.5;
    mySprite.scale.y = 0.5;
    mySprite.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(mySprite);
    mySprite.inputEnabled = true;
    mySprite.events.onInputDown.add(onDown, this);
}

function update () {
    mySprite.rotation += 0.01;


    if ( x > game.width - mySprite.width || x < 0 ) {
      dirX = -dirX;
    }
    if ( y > game.height - mySprite.height || y < 0 ) {
      dirY = -dirY;
    }

    x = x + dirX;
    y = y + dirY;

    mySprite.x = x;
    mySprite.y = y;

}

function onDown(dog) {
  console.log('clicked');
  console.log(mySprite.x);
  console.log(mySprite.y);
}