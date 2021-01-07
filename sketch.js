var dog, dogImg,dogImg1,database;
var foodStock,foodS;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload(){
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(1000, 400);
   
  foodObj=new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Fodd");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);

}

function draw() {  
background(46,139,87);
  foodObj.display();
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
     text("Last Feed :"+lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed :"+lastFed + "AM",350,30);
  }

  drawSprites();
}

//function to read food stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}
// Function to update fodd stock and last fed time
   
function feedDog(){
  dog.addImage(dogImg1);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoodS(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
