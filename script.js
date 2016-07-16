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
var emitter;
var path;
var index;

function preload() {

  game.load.image('mySprite', 'assets/sprite.png');
  game.load.image('fire1', 'assets/fire1.png');
  game.load.image('fire2', 'assets/fire2.png');
  game.load.image('fire3', 'assets/fire3.png');
  game.load.image('smoke', 'assets/smoke-puff.png');
}


function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#333';


    emitter = game.add.emitter(game.world.centerX, game.world.centerY, 400);

    emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );

    emitter.gravity = 200;
    emitter.setAlpha(1, 0, 3000);

    //  scale sprites like this:

    mySprite = game.add.sprite( x, y, 'mySprite');
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

function particleBurst() {
    var px = mySprite.body.velocity.x;
    var py = mySprite.body.velocity.y;

    px *= -1;
    py *= -1;

    emitter.minParticleSpeed.set(px, py);
    emitter.maxParticleSpeed.set(px, py);

    emitter.emitX = mySprite.x;
    emitter.emitY = mySprite.y;

    // Phaser.Particles.Arcade.Emitter.setScale(minX, maxX, minY, maxY, rate, ease, yoyo) : void;
    emitter.setScale(0.1, 1, 0.1, 1, 6000);

    //emitter.x = pointer.x;
    //emitter.y = pointer.y;

    emitter.start(true, 500, null, 5);

    //  And 2 seconds later we'll destroy the emitter
    game.time.events.add(500, destroyEmitter);

}

function destroyEmitter() {

if (emitter !== null){
   //   emitter.destroy();
  }
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
       // fire = true;
        mySprite.y = mySprite.y - 10;
         particleBurst();
      //  emitter.start(false, 3000, 5);
    }

    else
    {
    }

    if (cursors.left.isDown)
    {
        mySprite.x = mySprite.x - 10;
              particleBurst();
    }
    else if (cursors.right.isDown)
    {
        mySprite.x = mySprite.x + 10 ;
              particleBurst();
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
