// seleciona o canvas
const canvas = document.getElementById("bird");
const context = canvas.getContext("2d");

// constantes do programa
let frames = 0;
const DEGREE = Math.PI/180;

// carrega o sprite.png
const sprite = new Image();
sprite.src = "img/sprite.png";

// carrega os sons
const PONTUA = new Audio();
PONTUA.src = "audio/sfx_point.wav";

const FLAP = new Audio();
FLAP.src = "audio/sfx_flap.wav";

const BATE = new Audio();
BATE.src = "audio/sfx_hit.wav";

const SWOOSHING = new Audio();
SWOOSHING.src = "audio/sfx_swooshing.wav";

const PERDE = new Audio();
PERDE.src = "audio/sfx_die.wav";

// estado do jogo
const estado = {
    inicial : 0,
    getReady : 0,
    game : 1,
    gameOver : 2
}

// coordenadas do botão START
const startBtn = {
    x : 120,
    y : 263,
    w : 83,
    h : 29
}

// controla o jogo
canvas.addEventListener("click", function(evt){
    switch(estado.inicial){
        case estado.getReady:
            estado.inicial = estado.game;
            SWOOSHING.play();
            break;
        case estado.game:
            if(bird.y - bird.raio <= 0) return;
            bird.flap();
            FLAP.play();
            break;
        case estado.gameOver:
            let rect = canvas.getBoundingClientRect();
            let clickX = evt.clientX - rect.left;
            let clickY = evt.clientY - rect.top;
            
            // checa se o clique foi no botão START
            if(clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h){
                canos.reseta();
                bird.resetaaVelocidade();
                pontuacao.reseta();
                estado.inicial = estado.getReady;
            }
            break;
    }
});


// background
const background = {
    sX : 0,
    sY : 0,
    w : 275,
    h : 226,
    x : 0,
    y : canvas.height - 226,
    
    draw : function(){
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
    
}

// foreground
const foreground = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: canvas.height - 112,
    
    dx : 2,
    
    draw : function(){
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    },
    
    update: function(){
        if(estado.inicial == estado.game){
            this.x = (this.x - this.dx)%(this.w/2);
        }
    }
}

// passaro // bird
const bird = {
    animation : [
        {sX: 276, sY : 112},
        {sX: 276, sY : 139},
        {sX: 276, sY : 164},
        {sX: 276, sY : 139}
    ],
    x : 50,
    y : 150,
    w : 34,
    h : 26,
    
    raio : 12,
    
    frame : 0,
    
    gravity : 0.25,
    jump : 4.6,
    velocidade : 0,
    rotacao : 0,
    
    draw : function(){
        let bird = this.animation[this.frame];
        
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotacao);
        context.drawImage(sprite, bird.sX, bird.sY, this.w, this.h,- this.w/2, - this.h/2, this.w, this.h);
        
        context.restore();
    },
    
    flap : function(){
        this.velocidade = - this.jump;
    },
    
    update: function(){
        // Se o estado do jogo é "GET READY", o passaro tem que bater as asas devagar
        this.period = estado.inicial == estado.getReady ? 10 : 5;
        // Incrementa o Frame por 1 em cada periodo
        this.frame += frames%this.period == 0 ? 1 : 0;
        // O frame vai de 0 para 4 e depois resetaa
        this.frame = this.frame%this.animation.length;
        
        if(estado.inicial == estado.getReady){
            this.y = 150; // resetaa posição do passaro após game over
            this.rotacao = 0 * Math.PI;
        }else{
            this.velocidade += this.gravity;
            this.y += this.velocidade;
            
            if(this.y + this.h/2 >= canvas.height - foreground.h){
                this.y = canvas.height - foreground.h - this.h/2;
                if(estado.inicial == estado.game){
                    estado.inicial = estado.gameOver;
                    PERDE.play();
                }
            }
            
            // Se a velocidade é maior que o pulo significa que o passaro ta caindo
            if(this.velocidade >= this.jump){
                this.rotacao = Math.PI/4;
                this.frame = 1;
            }else{
                this.rotacao = -25 * DEGREE;
            }
        }
        
    },
    resetaaVelocidade : function(){
        this.velocidade = 0;
    }
}

// get ready
const getReady = {
    sX : 0,
    sY : 228,
    w : 173,
    h : 152,
    x : canvas.width/2 - 173/2,
    y : 80,
    
    draw: function(){
        if(estado.inicial == estado.getReady){
            context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
    
}

// game over
const gamegameOver = {
    sX : 175,
    sY : 228,
    w : 225,
    h : 202,
    x : canvas.width/2 - 225/2,
    y : 90,
    
    draw: function(){
        if(estado.inicial == estado.gameOver){
            context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);   
        }
    }
    
}

// canos
const canos = {
    posicao : [],
    
    top : {
        sX : 553,
        sY : 0
    },
    bottom:{
        sX : 502,
        sY : 0
    },
    
    w : 53,
    h : 400,
    gap : 85,
    maxYPos : -150,
    dx : 2,
    
    draw : function(){
        for(let i  = 0; i < this.posicao.length; i++){
            let p = this.posicao[i];
            
            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;
            
            // draw cano de cima
            context.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);  
            
            // draw cano de baixo
            context.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);  
        }
    },
    
    update: function(){
        if(estado.inicial !== estado.game) return;
        
        if(frames%100 == 0){
            this.posicao.push({
                x : canvas.width,
                y : this.maxYPos * ( Math.random() + 1)
            });
        }
        for(let i = 0; i < this.posicao.length; i++){
            let p = this.posicao[i];
            
            let bottomPipeYPos = p.y + this.h + this.gap;
            
            // sistema de colisao
            // cano de cima
            if(bird.x + bird.raio > p.x && bird.x - bird.raio < p.x + this.w && bird.y + bird.raio > p.y && bird.y - bird.raio < p.y + this.h){
                estado.inicial = estado.gameOver;
                BATE.play();
            }
            // cano de baixo
            if(bird.x + bird.raio > p.x && bird.x - bird.raio < p.x + this.w && bird.y + bird.raio > bottomPipeYPos && bird.y - bird.raio < bottomPipeYPos + this.h){
                estado.inicial = estado.gameOver;
                BATE.play();
            }
            
            // move os canos para a esquerda
            p.x -= this.dx;
            
            //se o cano sair do canvas, deletamos ele do array
            if(p.x + this.w <= 0){
                this.posicao.shift();
                pontuacao.value += 1;
                PONTUA.play();
                pontuacao.best = Math.max(pontuacao.value, pontuacao.best);
                localStorage.setItem("best", pontuacao.best);
            }
        }
    },
    
    reseta : function(){
        this.posicao = [];
    }
    
}

// pontuacao
const pontuacao= {
    best : parseInt(localStorage.getItem("best")) || 0,
    value : 0,
    
    draw : function(){
        context.fillStyle = "#FFF";
        context.strokeStyle = "#000";
        
        if(estado.inicial == estado.game){
            context.lineWidth = 2;
            context.font = "35px Teko";
            context.fillText(this.value, canvas.width/2, 50);
            context.strokeText(this.value, canvas.width/2, 50);
            
        }else if(estado.inicial == estado.gameOver){
            // pontuacao
            context.font = "25px Teko";
            context.fillText(this.value, 225, 186);
            context.strokeText(this.value, 225, 186);
            // melhor pontuacao
            context.fillText(this.best, 225, 228);
            context.strokeText(this.best, 225, 228);
        }
    },
    
    reseta : function(){
        this.value = 0;
    }
}

// draw
function draw(){
    context.fillStyle = "#70c5ce";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    background.draw();
    canos.draw();
    foreground.draw();
    bird.draw();
    getReady.draw();
    gamegameOver.draw();
    pontuacao.draw();
}

// update
function update(){
    bird.update();
    foreground.update();
    canos.update();
}

// loop
function loop(){
    update();
    draw();
    frames++;
    
    requestAnimationFrame(loop);
}
loop();
