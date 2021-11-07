function comparador() { 
	return Math.random() - 0.5; 
}
const arena = document.querySelector('.gaming-area');
const cards = ["agiota", "arretado", "atibaia", "bob", "comunista", "jacu", "meurei"];
let card = "";
let key = 0;
let qtd = true;
let temp = [];
let carta = [null, null];
let cartasHtml = [];
let selecionados = "";
let inicio = 0;
let contaPares = 0;
let timer;
let tempo = 0;
let min = 0;
let jogadas = 0;
let resposta = "";
function fazCarta(x){
	card = `<li data-identifier="card" class="card" id="${temp[x]}" onclick = "girar(this)">
	<div data-identifier="back-face" id="back-face" class="face">
	<img src="./assets/verso.jpg" alt="verso">
	</div>
	<div data-identifier="front-face" id="front-face" class="face">
		<div id="cardName">
			<h3>${temp[x]}</h3>
		</div>
		<div id="containerImage">
			<div id="cardImage" class="${temp[x]}"></div>
		</div>
	</div>
	</li>`;
}
function reset(){
	card = "";
	key = 0;
	qtd = true;
	temp = [];
	carta = [null, null];
	cartasHtml = [];
	selecionados = "";
	inicio = 0;
	contaPares = 0;
	timer;
	tempo = 0;
	min = 0;
	jogadas = 0;
	resposta = "";
}
function girar(element) {
	jogadas++;
	if(jogadas == 1){
		timeGame();
	}
	function viraDesvira(){
		element.classList.toggle("selecionado");
		element.children[1].classList.toggle("girarFrente");
		element.children[0].classList.toggle("girarVerso");
	}
	function viraErradas(){
		carta[0].classList.remove("selecionado");
		carta[1].classList.remove("selecionado");
		carta[0].children[0].classList.toggle("girarVerso");
		carta[0].children[1].classList.toggle("girarFrente");
		carta[1].children[0].classList.toggle("girarVerso");
		carta[1].children[1].classList.toggle("girarFrente");
		key = 0;
		carta = [];
	}
	// CONTADOR DIFERENTE DE 2 -- NENHUMA OU UMA CARTA VIRADA
	if(key == 0){
		if(!element.classList.contains("selecionado", "ok")){
			viraDesvira();
			carta[0] = element;
			key = 1;
		}
	} else if(key == 1){
			if(!element.classList.contains("selecionado", "ok")){
				viraDesvira();
				carta[1] = element;
				key = 2;
			}
	}
	//CONTADOR EM 2 -- DUAS CARTAS VIRADAS (CHECK)
	if(key === 2){
		//CHECANDO SE AS 2 CARTAS SÃO IGUAIS
		//SÃO IGUAIS ->
		if(carta[0].innerHTML == carta[1].innerHTML){
			carta[0].classList.add("ok");
			carta[1].classList.add("ok");
			key = 0;
			carta = [];
			contaPares++;
			//FIM DO JOGO
			if(contaPares == (qtd/2)){
				clearInterval(timer);
				let time = document.querySelector(".time-gaming").innerHTML;
				setTimeout(alert, 500, `Você ganhou em ${jogadas} jogadas.\nDuração: ${time} segundos`);
				function jogarNovamente(){
					resposta = prompt("Gostaria de jogar de novo?");	
				}
				setTimeout(jogarNovamente, 500);
				setTimeout(function(){
					if(resposta == "sim" || resposta == "Sim"){
						qtd = 0;
						inicio = 0;
						document.querySelector("ul").innerHTML = "";
						reset();
						iniciarGame();
					}
				}, 600);
			}
		}
		//SÃO DIFERENTES ->
		else {
			setTimeout(viraErradas, 1000);
		}
	}
}
function addCarta(x){
	fazCarta(x);
	arena.innerHTML += `${card}`;
}
function criaDeck(){
	cards.sort(comparador);
	for(let j = 0; j < (2); j++){
		for(let i = 0; i < (qtd/2); i++){
			temp.push(cards[i]);
		}
	}
	temp.sort(comparador);
}
function iniciarGame(){
	while(inicio == 0){
		qtd = parseInt(prompt("Insira a quantidade de cartas:\nLembre-se: números pares,no mínimo 4 e no máximo 14."));
		if(qtd >= 4 && qtd <= 14 && qtd % 2 == 0){
			inicio = 1;
		}
	}
	criaDeck();
	document.querySelector(".iniciar").style.display = "none";
	for(let j = 0; j < (qtd); j++){
		addCarta(j);
	}
	document.querySelector(".time-gaming").style.display = "block";
	document.querySelector(".gaming-area").style.display = "flex";
}
function timeGame(){
	timer = setInterval(function(){
		tempo++;
		document.querySelector(".time-gaming").innerHTML = `${min}:` + tempo;
		if(tempo == 59){
			min++;
			tempo = 0;
			if(min == 59){
				hour++
				min = 0;
			}
		}
	}, 1000);
}
