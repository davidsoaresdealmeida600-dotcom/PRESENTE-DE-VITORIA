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