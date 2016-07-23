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
  game.load.spritesheet('student', 'assets/student.png', 64, 64);
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

    this.student = game.add.sprite( x, y, 'student');

    // flag to determine if the hero is supposed to move right
          this.student.goingRight = false;
          // flag to determine if the hero is supposed to move left
          this.student.goingLeft = false;
          // default idle frame, with the hero facing right
          this.student.idleFrame = 0;
          // this is how we set an animation, we give it a name and an array with the frames.
          var walkLeftAnimation = this.student.animations.add('walkLeft', [10, 11, 12, 13, 14, 15, 16, 17, 18]);
          var walkRightAnimation = this.student.animations.add('walkRight', [28, 29, 30, 31, 32, 33, 34, 35, 36]);
          var walkUpAnimation = this.student.animations.add('walkUp', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
          var walkDownAnimation = this.student.animations.add('walkDown', [19, 20, 21, 22, 23, 24, 25, 26, 27]);
          // these are just listeners for X and Z keys
          this.rightKeyPressed = game.input.keyboard.addKey(Phaser.Keyboard.X);
          this.leftKeyPressed = game.input.keyboard.addKey(Phaser.Keyboard.Z);          
          // setting goingRight to true if X is pressed
          this.rightKeyPressed.onDown.add(function(){
               this.student.goingRight = true;     
          }, this);
          // setting goingRight to false if X is released
          this.rightKeyPressed.onUp.add(function(){
               this.student.goingRight = false;     
          }, this);  
          // setting goingLeft to true if Y is pressed
          this.leftKeyPressed.onDown.add(function(){
               this.student.goingLeft = true;     
          }, this);
          // setting goingLeft to false if Y is released
          this.leftKeyPressed.onUp.add(function(){
               this.student.goingLeft = false;     
          }, this);


    pixel = game.add.sprite( x, y, 'pixel');   

    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(30, 'bullet');

    //  The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 600;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireRate = 100;

    //  Tell the Weapon to track the 'mySprite' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon.trackSprite(mySprite, 0, 0, true);

    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
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

    if (fireButton.isDown)
      {
          weapon.fire();
      }


        // if we are going left and not right (we don't want two keys to be pressed at the same time)
          if(this.student.goingRight && !this.student.goingLeft){
               this.student.animations.play("walkRight", 10, true); // <- Look!! This is how I play "walkRight" animation at 10fps with looping
               // idle frame with hero facing right
               this.student.idleFrame = 0;     
          }
          else{
               // if we are going right and not left
               if(!this.student.goingRight && this.student.goingLeft){
                    this.student.animations.play("walkLeft", 10, true); // <- Look!! This is how I play "walkLeft" animation at 10fps with looping 
                    // idle frame with hero facing left
                    this.student.idleFrame = 4;      
               }
               else{
                    // show idle frame
                    this.student.frame = this.student.idleFrame;         
               }
          }


}

function onDown(dog) {
  console.log('clicked');
  console.log(mySprite.x);
  console.log(mySprite.y);
}
