var cursors;
var game = new Phaser.Game(640,480, Phaser.AUTO, 'world', {
  preload: preload, create: create, update: update });

var enemyX = 200;
var enemyY= 100;
var boxX = 200;
var boxY = 250;
var liftX = 400;
var liftY = 250;

var mySprite;
var enemy;

var x = game.width/2;
var y = game.height/2;
var dirX = 10;
var dirY = 10;
var emitter;
var path;
var index;
var weapon;
var fireButton;
var student;

function preload() {
    game.load.image('mySprite', 'assets/sprite.png');
    game.load.image('fire1', 'assets/fire1.png');
    game.load.image('fire2', 'assets/fire2.png');
    game.load.image('fire3', 'assets/fire3.png');
    game.load.image('smoke', 'assets/smoke-puff.png');
    game.load.image('pixel', 'assets/trans-pixel.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('box', 'assets/box.png');
    game.load.image('lift', 'assets/lift.png');
    game.load.atlasJSONHash('student', 'assets/student.png','assets/student.json');
    game.load.atlasJSONHash('enemy', 'assets/bot.png', 'assets/bot.json');
}


function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#333';

    emitter = game.add.emitter(game.world.centerX, game.world.centerY, 400);

    emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );

    emitter.gravity = 200;
    emitter.setAlpha(1, 0, 3000);

    //  scale sprites like this:

    mySprite = game.add.sprite( x, y, 'student');
    mySprite.animations.add('left', ['left1', 'left2']);
    mySprite.animations.add('right', ['right1', 'right2']);
    mySprite.animations.add('up'), ['up1', 'up2'];
    mySprite.animations.add('down', ['down1', 'down2']);


    enemy = game.add.sprite( enemyX, enemyY, 'enemy');
    box = game.add.sprite( boxX, boxY, 'box');
    lift = game.add.sprite( liftX, liftY, 'lift');

    enemy.animations.add('stop');
    enemy.animations.play('stop', 5, true);

    game.physics.arcade.enable(enemy);
    enemy.body.gravity.set(0, 180);
    enemy.body.collideWorldBounds = true;

    mySprite.scale.x = 0.99;
    mySprite.scale.y = 0.99;
    mySprite.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(mySprite);
    mySprite.body.velocity.setTo(200, 200);
    // makes image collideable
    mySprite.body.collideWorldBounds = true;
    // mySprite.bounce.set(0.8);
    mySprite.body.gravity.set(0, 180);
    mySprite.inputEnabled = true;

    game.physics.arcade.enable(box);

    game.physics.arcade.enable(lift);

    cursors = game.input.keyboard.createCursorKeys();
}

function update () {

    game.physics.arcade.collide(enemy, box, yahoo);

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
         particleBurst();
      //  emitter.start(false, 3000, 5);
        mySprite.animations.play('up', 30, false);
    }
    else
    {
        mySprite.animations.play('stop', 30, false);
    }

    if (cursors.left.isDown)
    {
        mySprite.x = mySprite.x - 10;
              particleBurst();

        mySprite.animations.play('left', 30, false);

    }
    else if (cursors.right.isDown)
    {
        mySprite.x = mySprite.x + 10 ;
              particleBurst();
        mySprite.animations.play('right', 30, false);
    }
    else
    {
        mySprite.animations.play('stop', 30, false);
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        fireBullet();
    }

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

function yahoo(){

    console.log('yahoo');

}

function onDown(dog) {
  console.log('clicked');
  console.log(mySprite.x);
  console.log(mySprite.y);
}
