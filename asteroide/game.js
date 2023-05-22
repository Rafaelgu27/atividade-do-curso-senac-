
class Client extends Phaser.Scene{
    constructor(){
        //construtor do Pai
        super('Client');
        this.containerCarregamento= null;
        this.barraCarregamento= [];
        }
    
        //metodos da cena
    preload(){
        //carregar imagem


        console.log ("Fiz o preload");
            this.load.setBaseURL('http://localhost/asteroide/img');
            this.load.image('logo', 'logo.png');
            this.load.image('espaco', 'espaco.png');
            this.load.image('BotaoStart', 'BotaoStart.png');
            this.load.image('nav2', 'nav2.png');
            this.load.image('nav1', 'nav1.png');
            this.load.image('ast3', 'as3.png');
            this.load.spritesheet('tiro', 'assets/tiro.png', 30,10);

            this.containerCarregamento= this.add.container(400,500);
            this.barraCarregamento.push(this.add.graphics());
            this.barraCarregamento.push(this.add.graphics());
            this.containerCarregamento.add(this.barraCarregamento);
            this.barraCarregamento[0].fillStyle(0x222222, 0.8);
            this.barraCarregamento[0].fillRect(0,0, 200, 25);

            //barra de carregamento
            this.load.on('progress', function (imagemid){
                this.barraCarregamento[1].fillStyle(0xffffff, 1 );
                this.barraCarregamento[1].fillRect(0,0,200*imagemid,25); //progresso da barra
                console.log(imagemid);

            }.bind(this));
            //loading bar progress
            this.load.on('complete', function (){
                this.scene.add('MenuPrincipal', MenuPrincipal);
                this.scene.start("MenuPrincipal");
            }.bind(this));
            

        }
        create(){
            console.log("Fiz o create");
            this.add.image(200, 150, 'logo');
        }
        update(){
            console.log("Fiz o update");
        }

    }


    class MenuPrincipal extends Phaser.Scene{
        constructor(){
            //construtor do Pai
            super('MenuPrincipal');

            this.BotaoStart= null

        }

        preload(){
            console.log("Próxima cena");
        }
        create(){
            console.log("entrou")
            this.add.tileSprite(0, 0, 2050, 2000, "espaco");

            let playButton= this.add.sprite(500,300, "BotaoStart").setDepth(1);
            playButton.setInteractive();

            playButton.on('pointerup', function (pointer){
                this.scene.add('Partida', Partida);
                this.scene.start("Partida");
            }.bind(this));

        }
        update(){
            
        }

    }

    class Partida extends Phaser.Scene {
        constructor() {
        //construtor pai
        super('Partida');
        this.nav2 = null;
        this.nav1 = null;
        this.containerNave = null;
        var tiro;
        }
    
        preload() {
            
        }
    
        create() {
            


            var x = 0;
            var y = 0;

            this.add.tileSprite(0, 0, 2050, 2000, 'espaco');
            this.containerNave = this.add.container(500, 350);
        
            this.nav2 = this.add.image(0, 0, 'nav2');
            this.nav2.setScale(3);
        
            this.nav1 = this.add.image(0, 0, 'nav1');
            this.nav1.setScale(3);
        
            this.containerNave.add(this.nav1);
            this.containerNave.add(this.nav2);
        
            this.input.keyboard.on('keydown', (event) => {
                switch (event.code) {
                  case 'ArrowLeft':
                    this.containerNave.angle -= 10; // Girar a nave para a esquerda
                    break;
                  case 'ArrowRight':
                    this.containerNave.angle += 10; // Girar a nave para a direita
                    break;
                  case 'ArrowUp':
                    // Calcular o movimento com base no ângulo da nave
                    var radians = Phaser.Math.DegToRad(this.containerNave.angle - 90);
                    var speed = 5;
                    var dx = Math.cos(radians) * speed; // Componente X do movimento
                    var dy = Math.sin(radians) * speed; // Componente Y do movimento
                    this.containerNave.x += dx; // Mover a nave na direção X
                    this.containerNave.y += dy; // Mover a nave na direção Y
                    break;
                }
                if (game.input.keyboard.isDown(Phaser.Keyboard.space)){
                    console.log("teste")
                }
          
        
                this.nav1.setVisible(true);
                this.nav2.setVisible(false);
            });
        
            this.input.keyboard.on('keyup', (event) => {
                this.nav1.setVisible(false);
                this.nav2.setVisible(true);
            });
        
            function minhaFuncao() {
                this.containerNave.angle += 2;
            }
        
            //movimentação e criação dos asteroides
            this.scoreText = this.add.text(10, 10, 'Score: 0', { font: '32px Arial', fill: '#ffffff' });

            // Repete a criação de asteroides a cada 2 segundos
            this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: function() {
                let x = Phaser.Math.Between(0, this.cameras.main.width);
                let y = Phaser.Math.Between(0, this.cameras.main.height);
                let asteroide = this.add.image(x, y, "ast3").setOrigin(0.5);
                asteroide.setScale(5)
                asteroide.direction = Phaser.Math.Between(0, 360); // Direção aleatória
                asteroide.setInteractive(); // Torna o asteroide clicável

                // Evento para destruir o asteroide ao ser clicado e incrementar a pontuação
                asteroide.on('pointerup', function() {
                asteroide.destroy();
                this.score += 10; // Incrementa a pontuação em 10
                this.scoreText.setText('Score: ' + this.score); // Atualiza o texto da pontuação
                }, this);
            },
            callbackScope: this
            });
        

        }

        function criarTiro(){

            var posDudeX= this.containerNave.x;
            var posDudeY= this.containerNave.y;

            tiro= game.add.sprite(posDudeX, posDudeY, 'tiro',);
            game.physics.arcade.enable(tiro);
            tiro.body.velocity.x += 50;


        }
    
        update() {

    }
}
    