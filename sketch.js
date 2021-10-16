var bgImg;
var bg;
var person;
var personImg;
var personImg2;
var personImg3;
var personImg4;
var personImg5;
var personImg6;
var grass;
var grassImg;
var stone;
var stoneImg;
var tree;
var treeImg;
var grassGroup;
var Inventory;
var InventoryImg;
var inventoryopen=false;
var treeGroup;
var mouseSprite;
var woodblock;
var woodGroup;
var inventoryList=[]
var crafting;
var craftingImg;
var openCharacter = false;

function preload(){
  bgImg = loadImage("Images/sky.png");
  personImg= loadImage ("Images/sprite_1.png")
  personImg2= loadImage ("Images/sprite_01.png")
  personImg3= loadImage ("Images/sprite_2.png")
  personImg4= loadImage ("Images/sprite_3.png")
  personImg5= loadImage ("Images/sprite_4.png") 
  personImg6= loadImage ("Images/sprite_5.png") 


  grassImg= loadImage ("Images/sprite_13.png")
  stoneImg=loadImage("Images/sprite_10.png")
  treeImg=loadImage("Images/sprite_0.png")
  InventoryImg=loadImage("Images/Inventory.png")
  woodImg= loadImage("Images/sprite_15.png")
  craftingImg=loadImage("Images/crafting.png")
}

function setup()
{
  createCanvas(windowWidth-10,windowHeight-20);
  person=createSprite(100,windowHeight-53);
  person.addImage(personImg);
  person.scale = 1;
  
  person1=createSprite(50,windowHeight/2);
  person1.addImage(personImg);
  person1.scale = 1;
  person1.visible = false;

  person2=createSprite(150,windowHeight/2);
  person2.addImage(personImg2);
  person2.scale = 1;
  person2.visible = false;

  person3=createSprite(250,windowHeight/2);
  person3.addImage(personImg3);
  person3.scale = 1;
  person3.visible = false;

  person4=createSprite(350,windowHeight/2);
  person4.addImage(personImg4);
  person4.scale = 1;
  person4.visible = false;

  person5=createSprite(450,windowHeight/2);
  person5.addImage(personImg5);
  person5.scale = 1;
  person5.visible = false;

  person6=createSprite(550,windowHeight/2);
  person6.addImage(personImg6);
  person6.scale = 1;
  person6.visible = false;
 
  mouseSprite = createSprite(mouseX, mouseY,1,1);

  
  grassGroup = new Group();
  woodGroup= new Group();
  treeGroup= new Group();
  // bg = createSprite(windowWidth/2,windowHeight/2);
  // bg.addImage(bgImg);
  for (var i=0;i<windowWidth;i=i+11){
    grass=createSprite(i,windowHeight-40)
    grass.addImage(grassImg);
    grass.scale = 0.5;
    grassGroup.add(grass);

    stone=createSprite(i,windowHeight-30)
    stone.addImage(stoneImg);
    stone.scale = 0.5;

    stone=createSprite(i,windowHeight-20)
    stone.addImage(stoneImg);
    stone.scale = 0.5;

    stone=createSprite(i,windowHeight-10)
    stone.addImage(stoneImg);
    stone.scale = 0.5;

    stone=createSprite(i,windowHeight-0)
    stone.addImage(stoneImg);
    stone.scale = 0.5;

  }

  for(var i=200;i<windowWidth;i=i+200){
    
    tree=createSprite(i,windowHeight-71)
    tree.addImage(treeImg);
    tree.scale=2
    treeGroup.add(tree);
  }
 
  Inventory=createSprite((windowWidth-10)/2,(windowHeight-20)/2);
  Inventory.addImage(InventoryImg);
  Inventory.scale =0.33;
  Inventory.visible = false;

  crafting=createSprite((windowWidth-10)/2,(windowHeight-20)/2);
  crafting.addImage(craftingImg);
  crafting.scale=0.33;
  crafting.visible= false;

  
}
  

function draw() 
{
  background(bgImg);
  drawSprites();

  mouseSprite.x = mouseX;
  mouseSprite.y=mouseY;

  person.velocity.y = person.velocity.y + 0.2;
  person.collide(grassGroup);
  if(keyDown("A")){
    person.x = person.x -2;
    person.mirrorX(1);
  }
  if(keyDown("D")){
    person.x = person.x +2;
    person.mirrorX(-1);
  }
  if(keyDown("E")){
    Inventory.visible= !Inventory.visible;
  }
  if(keyDown("Q")){
    crafting.visible=!crafting.visible;
 }
  if(keyDown("W")){
    person1.visible=!person1.visible;
    person2.visible=!person2.visible;
    person3.visible=!person3.visible;
    person4.visible=!person4.visible;
    person5.visible=!person5.visible;
    person6.visible=!person6.visible;
  }

  if(person1.visible && mousePressedOver(person1)){
    person.addImage(personImg);
    person.changeImage(personImg);
  }
  if(person2.visible && mousePressedOver(person2)){
    person.addImage(personImg2);
    person.changeImage(personImg2);
  }
  if(person3.visible && mousePressedOver(person3)){
    person.addImage(personImg3);
    person.changeImage(personImg3);
  }
  if(person4.visible && mousePressedOver(person4)){
    person.addImage(personImg4);
    person.changeImage(personImg4);
  }
  if(person5.visible && mousePressedOver(person5)){
    person.addImage(personImg5);
    person.changeImage(personImg5);
  }
  if(person6.visible && mousePressedOver(person6)){
    person.addImage(personImg6);
    person.changeImage(personImg6);
  }

  woodGroup.collide(grassGroup);

  if(inventoryList.length>0 && Inventory.visible){
    for(var item of inventoryList){
      if(item.name === "wood"){
        imageMode(CENTER);
        image(woodImg,135,50);
        text(item.number,135,50);
      }
    }
  }
}

function keyPressed(){
  if(keyCode == 32){
    console.log("pressSpace")
    person.setVelocity(0,-4);
  }

}

function mouseClicked(){
  treeGroup.collide(mouseSprite,function(tree,mouseSprite){
    
    tree.destroy();
    var woodblock = createSprite(tree.x-30,tree.y,10,10);
    woodblock.addImage(woodImg);
    woodblock.scale = 0.5;
    woodblock.velocityY = 4;
    woodblock.lifetime = 50;
    woodblock.depth = Inventory.depth -1;
    woodGroup.add(woodblock);
    addToInv("wood",1);
  })
}

function addToInv(name,number){
  for(var item of inventoryList){
    if(item.name === name){
      item.number = item.number + number
      return;
    }  
  }
  inventoryList.push({name:name,number:number});
}
