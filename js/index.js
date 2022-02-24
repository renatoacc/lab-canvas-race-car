let bg;
let car;
let carG, carR, carY;
// let obstacles = [];

// const carObstacles = [carG, carR, carY]
// const myObstacles = [];

const splashScreen = document.querySelector('.game-intro');

function decayVelocity(vel) {
  // implement decaying velocities
  const decay = vel > 0 ? -0.05 : vel < 0 ? 0.05 : 0;
  vel += decay;
  const overshootFromTop = vel < 0 && decay < 0;
  const overshootFromBot = vel > 0 && decay > 0;
  if (overshootFromTop || overshootFromBot) {
    return 0;
  }
  return vel;
}
// const myGameArea = {
//   canvas: document.createElement('canvas'),
//   frames: 0,
//   //.......
// };

// function updateObstacles() {
//   for (j = 0; j < myObstacles.length; j++) {
//     myObstacles[j].y += -1;
//     myObstacles[j].update();
//   }
//   myGameArea.frames += 1;
//   if (myGameArea.frames % 120 === 0) {
//     let x = Math.random(myGameArea.canvas.width);
//     let y = 0;
//     let teste;
//     for(i= 0; i < carObstacles.length; i++){
//       teste = carObstacles[i];
//     }
//     myObstacles.push(new Component(50, 100, image(carObstacles[teste]), x, y));
//   }
//   console.log('teste');
// }

// function carCollision(car1, car2) {
//   // simple collision detections -> AABB for 2 rects without rotation
//   if (car1 instanceof playerCar && car2 instanceof playerCar) {
//     const leftOfCar1 = car1.x;
//     const rightOfCar1 = car1.x + car1.width;
//     const topOfCar1 = car1.y;
//     const bottomOfCar1 = car1.y + car1.height;

//     const leftOfCar2 = car2.x;
//     const rightOfCar2 = car2.x + car2.width;
//     const topOfCar2 = car2.y;
//     const bottomOfCar2 = car2.y + car2.height;

//     const collidingInXDirection =
//       rightOfCar1 > leftOfCar2 && rightOfCar2 > leftOfCar1;

//     const collidingInYDirection =
//       bottomOfCar1 > topOfCar2 && bottomOfCar2 > topOfCar1;

//     return collidingInXDirection && collidingInYDirection;
//   }
//   console.log("Those are not rectangles");
// }

// function isPlayerCarCollidingWithCarObstacles() {
//   const obstaclesWeWouldCollideWith = obstacles.filter((obstacle) => {
//     return carCollision(playerCar, obstacle);
//   });
//   return obstaclesWeWouldCollideWith.length >= 1;
// }

class playerCar {
  constructor() {
    this.x = 225;
    this.velX = 0;
    this.y = 580;
    this.velY = 0;
    this.width = 50;
    this.height = 100;
  }

  draw (){
    if(keyIsDown(LEFT_ARROW)) {
      this.velX -= 0.5;
      // if(isPlayerCarCollidingWithCarObstacles()){
      //   this.velX -= 0.5;
      // }
    }
    if(keyIsDown(RIGHT_ARROW)) {
      this.velX += 0.5;
      // if(isPlayerCarCollidingWithCarObstacles()){
      //   this.velX += 0.5;
      // }
    }
    this.velX = decayVelocity(this.velX);

      // make the limits
      this.x += this.velX;

      this.x = max(1, this.x);
      this.x = min(this.x, width - this.width - 1);


    image(car, this.x , this.y, this.width, this.height);
  }
}

class carObstacles extends playerCar{
  constructor(width, height){
    super(width, height);
      this.x = Math.floor(Math.random() * 495);
      this.y = -100;
    }

    draw () {

      if(this.y <= 700){
        this.y += 10;
      } else {
        this.y = -100;
        this.x = Math.floor(Math.random() * 495);
      }
      
      image(carG, this.x, this.y, this.width, this.height);
    }
  }

function setup() {
  bg = loadImage('../images/road.png');
  const canvas = createCanvas(500, 700);
  canvas.parent('game-board');
  car = loadImage('../images/car.png');
  carG = loadImage('../images/carG.png');
  carR = loadImage('../images/carR.png');
  carY = loadImage('../images/carY.png');
  playerCar = new playerCar();
  carObstacles = new carObstacles();
  // obstacles.push(new carObstacles());
  
}

function draw() {
  background(bg);
  playerCar.draw();
  // obstacles.forEach((obstacle) => obstacle.draw());
  carObstacles.draw();
  // updateObstacles();
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {
    splashScreen.style.display = 'none';
  }
};
