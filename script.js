var cursors;
var game = new Phaser.Game(640,480, Phaser.AUTO, 'world', {
  preload: preload, create: create, update: update });

var x;
var y;

var mySprite;
var x = game.width/2;
var y = game.height/2;
var dirX = 10;
var dirY = 10;

function preload() {

  game.load.image('mySprite', 'sprite.png');
}


function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#333';

  mySprite = game.add.sprite( x, y, 'mySprite');
    //  scale sprites like this:

    mySprite.scale.x = 0.1;
    mySprite.scale.y = 0.1;
    mySprite.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(mySprite);
    mySprite.body.velocity.setTo(200, 200);
    // makes image collideable
    mySprite.body.collideWorldBounds = true;
    // mySprite.bounce.set(0.8);
    mySprite.body.gravity.set(0, 180);
    mySprite.inputEnabled = true;

    cursors = game.input.keyboard.createCursorKeys();
}

function update () {


    if ( x > game.width - mySprite.width || x < 0 ) {
      dirX = -dirX;
    }
    if ( y > game.height - mySprite.height || y < 0 ) {
      dirY = -dirY;
    }


    if (cursors.down.isDown) {
      mySprite.y = mySprite.y + 10;
    }
    if (cursors.up.isDown)
    {
        mySprite.y = mySprite.y - 10;

    }
    else
    {
    }

    if (cursors.left.isDown)
    {
        mySprite.x = mySprite.x - 10;
    }
    else if (cursors.right.isDown)
    {
        mySprite.x = mySprite.x + 10 ;
    }
    else
    {
      
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        fireBullet();
    }


}

function onDown(dog) {
  console.log('clicked');
  console.log(mySprite.x);
  console.log(mySprite.y);
}
