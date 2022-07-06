//import random;
const mycanvas=document.querySelector("#my_canvas");//ok
const context=mycanvas.getContext("2d");//ok
let scorediv=document.querySelector("#score");
let score=0;
let gamewidth=mycanvas.width//ok
let gameheight=mycanvas.height//ok
const canvascolor="white"
const snakecolor="lightgreen"
const snakeBorder="black"
const foodColor="red"
const square_size=25;//ok
let running=false;//ok
let xVelocity=square_size;//ok
let yVelocity=0;
let foodX;//generated randomly
let foodY;
let snake=[{xcord:0,ycord:0},
            {xcord:square_size,ycord:0},
            {xcord:2*square_size,ycord:0},
            {xcord:3*square_size,ycord:0},
            {xcord:4*square_size,ycord:0}

            ]//okay
debugger;
window.addEventListener("keydown",changeDirection);
window.addEventListener("click",resetGame)
gameStart();//starting the game vey sus

function create_square(x,y)
{
                context.fillStyle="lightgreen"
                context.fillRect(x,y,square_size,square_size)//x needs to be sufficenlty far  a gap of 2*square size might work
                
                
}


function create_square(snake_square)
{
    context.fillStyle="green"//filling the inner rectangle color
    context.strokeStyle=snakeBorder;//filling the rectangle frame color
    context.fillRect(snake_square.xcord,snake_square.ycord,square_size,square_size)//actually draws the filled up green rectangle
    context.strokeRect(snake_square.xcord,snake_square.ycord,square_size,square_size)//actually draws the empty rect frame on top of the filled rectangles
    
}           



function nextTick()
{
    if(running==true)
    {
        setTimeout(()=>
        {
            clearGame();
            createFood();
            //sus
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }
        ,
        200
        
        
        
        )
    }
    else
    {
        displayGameOver();
    }
}
function clearGame()
{
    context.fillStyle=canvascolor;
    context.fillRect(0,0,gamewidth,gameheight);
}
function createFood()
{
    function randomFood(min,max)
    {   let randNum=Math.round(Math.random()*(max-min)+min)
        return randNum;
    }
   let foodX=randomFood(0,gamewidth-square_size);
   let foodY=randomFood(0,gameheight-square_size);
   drawFood(foodX,foodY);

}
function drawFood(x,y)
{
    context.fillStyle="red"
    context.fillRect(x,y,square_size,square_size)
}
createFood();
function moveSnake()
{   //sus
    let newhead={xcord:snake[0]+xVelocity,
                 ycord:snake[0]+yVelocity
                }
    
    snake.unshift(newhead)
    
    if((snake[0].xcord==foodX )&& (snake[0].ycord==foodY))
    {
        score=score+1;
        scorediv.textContent=score;
        createFood();
    }
    else
    {   //create_square(newhead.xcord,newhead.ycord) 
        snake.pop();
        
        console.log("help")
    }
}
function changeDirection(event)
{
    let keyPressed =event.keyCode;
    const LEFT=37;
    const UP=38;
    const RIGHT=39;
    const DOWN=40;
    const goingUp=(yVelocity ==-square_size)
    const goingDown=(yVelocity==square_size)
    const goingRight=(xVelocity==square_size)
    const goingLeft=(xVelocity==-square_size)
    switch(true)
    {
        case(keyPressed==LEFT && !goingRight):
            xVelocity=-square_size;
            yVelocity=0;
            break;
        case(keyPressed==UP && !goingDown):
            xVelocity=0;
            yVelocity=-square_size;
            break;
        case(keyPressed==RIGHT && !goingLeft):
            xVelocity=square_size;
            yVelocity=0;
            break;
        case(keyPressed==DOWN && !goingUp):
        xVelocity=0;
        yVelocity=square_size;
        break;
        
    }
}
function checkGameOver()
{
    switch(true){

        case (snake[0].xcord < 0):

            running = false;

            break;

        case (snake[0].xcord >= gamewidth):

            running = false;

            break;

        case (snake[0].ycord < 0):

            running = false;

            break;

        case (snake[0].ycord >= gameheight):

                running = false;

                break;

    }

    for(let i = 1; i < snake.length; i+=1)
    {

        if(snake[i].xcord == snake[0].xcord && snake[i].ycord == snake[0].ycord)
        {

            running = false;

        }

    }

}
function displayGameOver()
{

}
function resetGame()
{

}
function drawSnake()
{
    snake.forEach(create_square);   
}

function gameStart()
{
    
    running=true//okay
    scorediv.textContent=score;//okay
    createFood();//okay
    debugger
    //drawSnake();
    moveSnake();
    nextTick();

  
    
    
}