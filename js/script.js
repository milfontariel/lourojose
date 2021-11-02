function comparador() { 
	return Math.random() - 0.5; 
}

const agiota = document.querySelector("#agiota");
const arretado = document.querySelector("#arretado");
const atibaia = document.querySelector("#atibaia");
const bob = document.querySelector("#bob");
const comunista = document.querySelector("#comunista");
const jacu = document.querySelector("#jacu");
const meurei = document.querySelector("#meurei");

const cards = [agiota, arretado, atibaia, bob, comunista, jacu, meurei];

console.log(cards);

/* 
const qtdCartas = (parseInt(prompt("Quantas cartas você deseja? (mín. 4, máx. 14)\nApenas números pares."))) / 2;
 */
const card = document.querySelector(".card");
