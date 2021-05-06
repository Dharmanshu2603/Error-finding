class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(400,200);
    car1.addImage("car1",car1Img)
    car2 = createSprite(400,200);
    car2.addImage("car2",car2Img)
    car3 = createSprite(600,200);
    car3.addImage("car3",car3Img)
    car4 = createSprite(800,200);
    car4.addImage("car4",car4Img)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
            background(rgb(198,135,103));
            image(trackImg,0,-4*displayHeight,displayWidth,5*displayHeight)

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if (player.distance < 2150){
      if(keyIsDown(38) && player.index !== null){
        yVel +=0.985
        if(keyIsDown(37)){
          xVel -=0.2
        }
        if(keyIsDown(39)){
          xVel +=0.2
      }else if(keyIsDown(38) &&yVel >0 && player.index !== null){
        yVel -= 0.1;
        xVel *= 0.985;
      }else{
        xVel *= 0.985;
        yVel *= 0.985;
      }
    }
      player.distance += yVel;
      yVel *= 0.985;
      player.xPos += xVel;
      xVel *= 0.985;
      player.update();
    }
   if(player.distance > 3860){
    gameState = 2
    }

  drawSprites();
  }
  end(){
    console.log("GAME OVER")
  }
}
