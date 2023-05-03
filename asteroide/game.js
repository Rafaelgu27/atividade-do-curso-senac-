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
        this.add.tileSprite(0, 0, 8000, 6000, "espaco");
        this.BotaoStart= this.add.image(500, 350 , "BotaoStart");

    }
    update(){

    }

}
class Partida extends Phaser.Scene{

}