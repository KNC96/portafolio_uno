let contador = 0;

function incrementarContador(){
    ++contador;
    postMessage(contador);
    if(contador == 1000){
        contador = 1;
    }

    setTimeout(incrementarContador, 1000);
}

incrementarContador();