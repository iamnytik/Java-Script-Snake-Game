let mycanvas = document.querySelector("#my_canvas");
let ctx = mycanvas.getContext('2d');
const snake_color = "red"
const square_size = 25;
const can_X = 500;
const can_Y = 500;
let next_move_X
let next_move_Y
let scorediv
let score = 0;
let running 
let snake ;
let myrestButton=document.querySelector('#start')
myrestButton.addEventListener('click',resetGame);
class Snake_Obj_creator 
{   //this is a template to create any kind of of square object at X,Y position
    constructor(X, Y) 
    {
        this.x = X;
        this.y = Y;
    };

    x;
    y;
}
function init()
{   
    
    
    next_move_X = square_size;
    next_move_Y = 0;
    scorediv = document.querySelector("#score");
    score = 0;
    running = true;
    let i;
    snake = [];//this thing stores all the body parts of the snake
    for (i = 0; i < 5; i++) 
    {
        let obj = new Snake_Obj_creator(i * square_size, 0);
        snake.push(obj);//initializing snake
    }
    snake.forEach(snake_square)//for Each snake obj draw a square
}
init();
function snake_square(snakeobj) 
{
    ctx.fillStyle = "green"//filling the inner rectangle color
    ctx.strokeStyle = "black";//filling the rectangle frame color
    ctx.fillRect(snakeobj.x, snakeobj.y, square_size, square_size)//actually draws the filled up green rectangle
    ctx.strokeRect(snakeobj.x, snakeobj.y, square_size, square_size)//actually draws the empty rect frame on top of the filled rectangles

}
function nextMove() 
{
    function wipeout_tail(obj) 
    {

        ctx.fillStyle = "#ffffff"//filling the inner rectangle color
        ctx.strokeStyle = "#ffffff";//filling the rectangle frame color
        ctx.strokeRect(obj.x, obj.y, square_size, square_size)
        ctx.fillRect(obj.x, obj.y, square_size, square_size)//actually draws the filled up green rectangle
        //actually draws the empty rect frame on top of the filled rectangles
        ctx.fillRect(obj.x, obj.y, square_size, square_size)
        ctx.strokeRect(obj.x, obj.y, square_size, square_size)

    }
    let obj = snake[0];//take out first element
    wipeout_tail(obj);//color it white
    snake.shift()//removes the first element because it is wiped out
    let i = 0;
    let lasSnakeObj = snake[snake.length - 1]//takeout the last element
    let newX = lasSnakeObj.x + next_move_X;//calculate the next position
    let newY = lasSnakeObj.y + next_move_Y;
    let newObj = new Snake_Obj_creator(newX, newY);
    snake.push(newObj);//put a new element at the last positon
    snake_square(newObj);//draw the square at the new positon
}
function update_next_move(event) 
{   //This function is pretty self explainatory
    //the main goal is to update the next move our snake will take
    const keyPressed = event.key;
    const goingUp = (next_move_Y == -square_size);
    const goingDown = (next_move_Y == square_size);
    const goingRight = (next_move_X == square_size);
    const goingLeft = (next_move_X == -square_size);
    switch (true) 
    {

        case (keyPressed === "ArrowLeft" && !goingRight):
            next_move_X = -square_size;
            next_move_Y = 0;
            break;
        case (keyPressed === "ArrowUp" && !goingDown):
            next_move_X = 0;
            next_move_Y = -square_size;
            break;
        case (keyPressed === "ArrowRight" && !goingLeft):
            next_move_X = square_size;
            next_move_Y = 0;
            break;
        case (keyPressed === "ArrowDown" && !goingUp):
            next_move_X = 0;
            next_move_Y = square_size;
            break;
    }
}
function generateFruit()//need to be repeatedly called
{
    let X = Math.round((Math.random() * (can_X - square_size)) / 25) * 25 
    let Y = Math.round((Math.random() * (can_Y - square_size)) / 25) * 25
    let Fruit = new Snake_Obj_creator(X, Y);
    function draw_square(X, Y) 
    {
        ctx.fillStyle = "red"//deciding the color to fill
        ctx.fillRect(X, Y, square_size, square_size)//actually draws the filled up red rectangle
    }
    draw_square(X, Y)
    return Fruit;
}
let Fruit = generateFruit();//generates the first fruit
document.addEventListener('keydown', update_next_move);//calling the update_next_move depending on what key we press
function Refresh() 
{
    nextMove();
    let Head = snake[snake.length - 1];
    checkCollison(Head);
    if (Head.x == Fruit.x && Head.y == Fruit.y)//checks if we hit a fruit
    {
        score = score + 1;
        scorediv.textContent = score
        Fruit = generateFruit();//generate a new Fruit
        newObj = new Snake_Obj_creator(snake[0].x - square_size, snake[0].y - square_size)
        snake_square(newObj);//adding a new snake square
        snake.unshift(newObj)
    }
}
let end_flag;
function checkCollison(Head) 
{
    let i = 0;
    if(Head.x>=can_X || Head.y>=can_Y || Head.x<0 || Head.y<0)
    {
        GameOver();
        clearInterval(end_flag);

    }
    while (i < snake.length - 1) 
    {
        if ((snake[i].x == Head.x) && (snake[i].y == Head.y)) 
        {

            running = false;
            GameOver();
            clearInterval(end_flag);
            break;
        }
        i = i + 1;
    }
}
end_flag = setInterval(Refresh, 150);
function GameOver()
{
    ctx.font="50px MV Boli";
    ctx.fillStyle ="Red"
    ctx.textAlign ="center"
    ctx.fillText("GAME OVER", can_X/2, can_Y/2);
    running=false;

    
}
function wipeout_board()
{
    ctx.fillStyle="white"
    ctx.fillRect(0, 0, can_X, can_Y)
    
}
function resetGame()
{   
    wipeout_board();
    setTimeout(init,3000)
    end_flag = setInterval(Refresh, 3000);
}