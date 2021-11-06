function comparador() { 
	return Math.random() - 0.5; 
}

const arena = document.querySelector('.gaming-area');
const cards = ["agiota", "arretado", "atibaia", "bob", "comunista", "jacu", "meurei"];
let card = "";
let key = 0;
let qtd = 0;
let temp = [];
let carta = [null, null];
let cartasHtml = [];
let selecionados = "";

function fazCarta(x){
	card = `<li class="card" id="${temp[x]}" onClick = "girar(this)">
	<div id="back-face" class="face">
	<img src="./assets/verso.jpg" alt="verso">
	</div>
	<div id="front-face" class="face">
		<div id="cardName">
			<h3>${temp[x]}</h3>
		</div>
		<div id="containerImage">
			<div id="cardImage" class="${temp[x]}"></div>
		</div>
	</div>
	</li>`;
}

	

function girar(element) {
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
		console.log("Contador = 2");
		//CHECANDO SE AS 2 CARTAS SÃO IGUAIS
		//SÃO IGUAIS ->
		if(carta[0].innerHTML == carta[1].innerHTML){
			console.log("São iguais");
			carta[0].classList.add("ok");
			carta[1].classList.add("ok");
			key = 0;
			carta = [];
			console.log("contador em: " + key);
		}
		//SÃO DIFERENTES ->
		else {
			console.log("São diferentes");
			setTimeout(viraErradas, 500);
			console.log("contador em: " + key);
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
	console.log(temp);
}

function iniciarGame(element){
	qtd = parseInt(prompt("Quantidade: "));
	criaDeck();
	element.style.display = "none";
	for(let j = 0; j < (qtd); j++){
		addCarta(j);
	}
}
