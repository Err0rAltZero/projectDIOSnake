let canvas=document.getElementById("snake");
let context=canvas.getContext("2d");
let box=32;
let score=0;
let scorebox=document.getElementById("score");
let snake=[];
snake[0]={
    x:8*box,
    y:8*box
}
let direction="right";
let food={
    //Geração de números aleatórios
    x:Math.floor(Math.random()*15+1)*box,
    y:Math.floor(Math.random()*15+1)*box
}
function criarBG(){
    context.fillStyle="palegreen";
    context.fillRect(0,0,16*box,16*box); //Desenha o retângulo do jogo
}
function criarCobrinha(){
    for(i=0;i<snake.length;i++){
        context.fillStyle="darkgreen";
        context.fillRect(snake[0].x,snake[0].y, box,box);
        if(i>0){
        context.fillStyle="green";
        context.fillRect(snake[i].x,snake[i].y, box,box);
        }
    }
}
function drawFood(){
    context.fillStyle="red";
    context.fillRect(food.x,food.y,box,box);
}
document.addEventListener("keydown",update);
function update (event){
    if(event.keyCode == 37 && direction !="right") direction = "left";
    if(event.keyCode == 38 && direction !="down") direction = "up";
    if(event.keyCode == 39 && direction !="left") direction = "right";
    if(event.keyCode == 40 && direction !="up") direction = "down";
}
function iniciarJogo(){
    //Evitar cobra saindo da tela
    if(snake[0].x >15*box&&direction=="right") snake[0].x=0;
    if(snake[0].x <0&&direction=="left") snake[0].x=16*box;
    if(snake[0].y >15*box&&direction=="down") snake[0].y=0;
    if(snake[0].y <0&&direction=="up") snake[0].y=16*box;    
    //Colisão da cobra
    for(i=1;i<snake.length;i++){
        if(snake[0].x==snake[i].x&&snake[0].y==snake[i].y){
            clearInterval(jogo);
            gameOver();
            return            
        }
    }
    criarBG();
    criarCobrinha();
    drawFood();    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;    
    if(direction=="right") snakeX += box;
    if(direction=="left") snakeX -= box;
    if(direction=="up") snakeY -= box;
    if(direction=="down") snakeY += box;
    if(snakeX!=food.x||snakeY!=food.y){
        snake.pop();
    }
    else{
        food.x=Math.floor(Math.random()*15+1)*box;
        food.y=Math.floor(Math.random()*15+1)*box;
        score++;
        scorebox.textContent=score;
    }    
    let newHead={
        x:snakeX,
        y:snakeY
    }
    snake.unshift(newHead);
}
criarBG();
criarCobrinha();
let jogo=setInterval(iniciarJogo,100);
function gameOver(){
    var h1ti=document.getElementById("h1ti");
    h1ti.style.color="red";
    h1ti.textContent="GAME OVER!"
    scorebox.style.border="2px solid red";
    scorebox.style.color="red";
    document.body.style.backgroundColor="lime";
    context.fillStyle="black";
    //Inicio Desenho
    context.fillRect(0,0,16*box,16*box); //Desenha o retângulo do jogo
    //Desenho da sad face
    context.fillStyle="lime";    
    context.fillRect(5*box,4*box,box,box);
    context.fillRect(6*box,4*box,box,box);
    context.fillRect(9*box,4*box,box,box);
    context.fillRect(10*box,4*box,box,box);
    context.fillRect(4*box,5*box,box,box);
    context.fillRect(5*box,5*box,box,box);
    context.fillRect(10*box,5*box,box,box);
    context.fillRect(11*box,5*box,box,box);
    context.fillRect(4*box,6*box,box,box);
    context.fillRect(11*box,6*box,box,box);
    context.fillRect(6*box,8*box,box,box);
    context.fillRect(7*box,8*box,box,box);
    context.fillRect(8*box,8*box,box,box);
    context.fillRect(9*box,8*box,box,box);
    context.fillRect(5*box,9*box,box,box);
    context.fillRect(10*box,9*box,box,box);
    context.fillRect(4*box,10*box,box,box);
    context.fillRect(11*box,10*box,box,box);
    context.fillRect(4*box,11*box,box,box);
    context.fillRect(11*box,11*box,box,box);
    //Fim do desenho
    alert('Game Over :(');    
}