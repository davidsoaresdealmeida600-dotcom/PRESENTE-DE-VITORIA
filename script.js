function mostrarSurpresa() {

    document.getElementById("surpresa").scrollIntoView({
        behavior: "smooth"
    });

}


// Data do início do namoro
const inicio = new Date(2025, 11, 17, 19, 0, 0);


function atualizarContador() {

    const agora = new Date();

    let diferenca = agora - inicio;

    const segundos = Math.floor(diferenca / 1000);

    const dias = Math.floor(segundos / 86400);

    const horas = Math.floor((segundos % 86400) / 3600);

    const minutos = Math.floor((segundos % 3600) / 60);

    const seg = segundos % 60;


    document.getElementById("tempo").innerHTML =
        `${dias} dias, ${horas} horas, ${minutos} minutos e ${seg} segundos ❤️`;
}


setInterval(atualizarContador, 1000);

atualizarContador();

/* =========================
   MÚSICA
========================= */

const musica = document.getElementById("musica");

const botaoMusica = document.getElementById("botaoMusica");


botaoMusica.addEventListener("click", () => {

    if (musica.paused) {

        musica.play();

        botaoMusica.textContent = "⏸️ Pausar música";

    } else {

        musica.pause();

        botaoMusica.textContent = "🎵 Tocar música";

    }

});

const lightbox = document.getElementById("lightbox");
const imagemAmpliada = document.querySelector(".lightbox-imagem");
const polaroids = [...document.querySelectorAll(".polaroid")];
let fotoAtual = 0;

function abrirLightbox(indice) {
    fotoAtual = indice;
    const polaroid = polaroids[fotoAtual];
    imagemAmpliada.src = polaroid.dataset.foto;
    imagemAmpliada.alt = polaroid.querySelector("img").alt;
    lightbox.classList.add("aberto");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-ativa");
    document.querySelector(".lightbox-fechar").focus();
}

function fecharLightbox() {
    lightbox.classList.remove("aberto");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-ativa");
    polaroids[fotoAtual].focus();
}

function navegarLightbox(direcao) {
    abrirLightbox((fotoAtual + direcao + polaroids.length) % polaroids.length);
}

polaroids.forEach((polaroid, indice) => polaroid.addEventListener("click", () => abrirLightbox(indice)));
document.querySelector(".lightbox-fechar").addEventListener("click", fecharLightbox);
document.querySelector(".anterior").addEventListener("click", () => navegarLightbox(-1));
document.querySelector(".proxima").addEventListener("click", () => navegarLightbox(1));

lightbox.addEventListener("click", (evento) => {
    if (evento.target === lightbox) fecharLightbox();
});

document.addEventListener("keydown", (evento) => {
    if (!lightbox.classList.contains("aberto")) return;
    if (evento.key === "Escape") fecharLightbox();
    if (evento.key === "ArrowLeft") navegarLightbox(-1);
    if (evento.key === "ArrowRight") navegarLightbox(1);
});
/* =========================
   CORAÇÕES FLUTUANTES
========================= */

const areaCoracoes = document.getElementById(
    "coracoes-flutuantes"
);

const tiposCoracoes = [
    "❤️",
    "💕",
    "💖",
    "💗",
    "💓"
];

function criarCoracao() {

    const coracao = document.createElement("span");

    coracao.classList.add("coracao-flutuante");

    // Escolhe um coração aleatório
    const indice = Math.floor(
        Math.random() * tiposCoracoes.length
    );

    coracao.textContent = tiposCoracoes[indice];

    // Posição horizontal aleatória
    coracao.style.left = Math.random() * 100 + "%";

    // Tamanho aleatório
    coracao.style.fontSize =
        (15 + Math.random() * 20) + "px";

    // Velocidade aleatória
    const duracao = 5 + Math.random() * 5;

    coracao.style.animationDuration = duracao + "s";

    // Adiciona o coração na tela
    areaCoracoes.appendChild(coracao);

    // Remove o coração depois da animação
    coracao.addEventListener("animationend", () => {
        coracao.remove();
    });

}

// Cria um coração a cada 600 milissegundos
if (
    areaCoracoes &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    setInterval(criarCoracao, 500);
}
