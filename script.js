function mostrarSurpresa() {

    document.getElementById("surpresa").scrollIntoView({
        behavior: "smooth"
    });

}


// Data do início do namoro
const inicio = new Date(2025, 11, 17, 19, 0, 0);


function atualizarContador() {

    const agora = new Date();

    // Conta anos completos antes de calcular o tempo desde o aniversário.
    let anos = Math.max(0, agora.getFullYear() - inicio.getFullYear());
    let aniversario = new Date(inicio);
    aniversario.setFullYear(inicio.getFullYear() + anos);
    if (agora < aniversario && anos > 0) {
        anos--;
        aniversario = new Date(inicio);
        aniversario.setFullYear(inicio.getFullYear() + anos);
    }

    const diferenca = Math.max(0, agora - aniversario);

    const segundos = Math.floor(diferenca / 1000);

    const dias = Math.floor(segundos / 86400);

    const horas = Math.floor((segundos % 86400) / 3600);

    const minutos = Math.floor((segundos % 3600) / 60);

    const seg = segundos % 60;


    const valores = { anos, dias, horas, minutos, segundos: seg };
    Object.entries(valores).forEach(([unidade, valor]) => {
        document.getElementById(`tempo-${unidade}`).textContent = String(valor).padStart(2, "0");
    });
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

const tulipaBotao = document.getElementById("tulipa-botao");
const petalas = [...document.querySelectorAll(".tulipa-petala")];
const motivos = [
    ["Seu sorriso", "Porque o seu sorriso ilumina meus dias e faz tudo ficar mais bonito."],
    ["Seu carinho", "Porque no seu carinho eu encontro paz, cuidado e um lugar para chamar de lar."],
    ["Seu jeitinho", "Porque cada detalhe do seu jeitinho me faz me apaixonar por você de novo."],
    ["Nossas conversas", "Porque conversar com você transforma até um dia comum em um momento especial."],
    ["Os momentos juntos", "Porque ao seu lado as pequenas coisas viram as minhas melhores lembranças."],
    ["Seu abraço", "Porque seu abraço é o meu lugar favorito para descansar e esquecer do mundo."],
    ["Sua companhia", "Porque ter você por perto deixa a vida mais leve e o meu coração mais feliz."],
    ["Nosso futuro", "Porque imaginar os nossos sonhos se realizando juntos me dá mais um motivo para sorrir."]
];
const motivosDescobertos = new Set();

tulipaBotao.addEventListener("click", () => {
    if (tulipaBotao.getAttribute("aria-expanded") === "true") {
        petalas.forEach(petala => { petala.hidden = true; });
        document.getElementById("tulipa-flor").classList.remove("floresceu");
        tulipaBotao.setAttribute("aria-expanded", "false");
        tulipaBotao.setAttribute("aria-label", "Fazer a tulipa florescer");
        document.getElementById("jardim-instrucao").textContent = "Toque na tulipa para abrir novamente. Seus motivos descobertos estão guardados.";
        return;
    }
    petalas.forEach(petala => { petala.hidden = false; });
    document.getElementById("tulipa-flor").classList.add("floresceu");
    tulipaBotao.setAttribute("aria-expanded", "true");
    tulipaBotao.setAttribute("aria-label", "Fechar a tulipa");
    document.getElementById("jardim-instrucao").textContent = "Toque nas pétalas para descobrir os motivos. Toque no coração central para fechar.";
    document.getElementById("motivo-titulo").textContent = "Meu amor por você floresce todos os dias.";
    document.getElementById("motivo-texto").textContent = "Oito pétalas, oito motivos e um amor que continua crescendo.";
    document.getElementById("jardim-progresso").textContent = `${motivosDescobertos.size} de ${motivos.length} motivos descobertos`;
});

petalas.forEach((petala, indice) => {
    petala.setAttribute("aria-pressed", "false");
    petala.addEventListener("click", () => {
        motivosDescobertos.add(indice);
        petalas.forEach(item => item.setAttribute("aria-pressed", String(item === petala)));
        petala.classList.add("descoberta");
        document.getElementById("motivo-titulo").textContent = motivos[indice][0];
        document.getElementById("motivo-texto").textContent = motivos[indice][1];
        document.getElementById("jardim-progresso").textContent = motivosDescobertos.size === motivos.length
            ? "Você descobriu todos! E eu ainda tenho uma vida inteira de motivos para te amar. ♥"
            : `${motivosDescobertos.size} de ${motivos.length} motivos descobertos`;
    });
});

// Cria um coração a cada 600 milissegundos
if (
    areaCoracoes &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    setInterval(criarCoracao, 500);
}
