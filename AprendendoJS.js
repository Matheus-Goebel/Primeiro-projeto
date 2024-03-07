esconder()

function enviarDadosFormulario(){
    const nome = document.getElementById("nome").value;
    const salaDeEstudo = document.querySelector('input[name="salaDeEstudo"]:checked').value;  
    const salaDeCafe = document.querySelector('input[name="salaDeCafe"]:checked').value;    
        
    const aplicante = {
        nome,
        salaDeEstudo,
        salaDeCafe,
    }
    
    const aplicantes = [];
    //const pessoa = localStorage.length > 0 ? JSON.parse(localStorage.getItem("listaAplicantes")) : {aplicantes} ;
    const pessoa = JSON.parse(localStorage.getItem("listaAplicantes")) || {aplicantes}
    pessoa.aplicantes.push(aplicante);
    localStorage.setItem("listaAplicantes", JSON.stringify(pessoa));    
   
    const filtroEstudoSala1 = getListaCompleta().aplicantes.filter(aplicante => aplicante.salaDeEstudo == 1)
    const filtroEstudoSala2 = getListaCompleta().aplicantes.filter(aplicante => aplicante.salaDeEstudo == 2)
    
    const filtroCafeSala1 = getListaCompleta().aplicantes.filter(aplicante => aplicante.salaDeCafe == 1)
    const filtroCafeSala2 = getListaCompleta().aplicantes.filter(aplicante => aplicante.salaDeCafe == 2)
    
    const filtroNome = getListaCompleta().aplicantes.filter(aplicante => aplicante.nome === nome)       
    
    if (filtroNome.length > 1){        
        alert(`Nome já existente`)
        const ultimoIndex = getListaCompleta().aplicantes.findLastIndex(aplicante => aplicante.nome === nome)  
        const listaAtualizada = getListaCompleta()
        listaAtualizada.aplicantes.splice(ultimoIndex, 1)             
        localStorage.setItem("listaAplicantes", JSON.stringify(listaAtualizada));
        return
    } 

    mostrar()

    if (salaDeEstudo < 2 & salaDeCafe < 2){
        alert(`Bem vindo ${nome} sua sala de estudo é a sala de numero ${salaDeEstudo} com atualmente ${filtroEstudoSala1.length} participantes e a sua sala de café é a sala de numero ${salaDeCafe} com atualmente ${filtroCafeSala1.length} participantes`)
    } else if (salaDeEstudo < 2 & salaDeCafe > 1){
        alert(`Bem vindo ${nome} sua sala de estudo é a sala de numero ${salaDeEstudo} com atualmente ${filtroEstudoSala1.length} participantes e a sua sala de café é a sala de numero ${salaDeCafe} com atualmente ${filtroCafeSala2.length} participantes`)
    } else if (salaDeEstudo > 1 & salaDeCafe < 2){
        alert(`Bem vindo ${nome} sua sala de estudo é a sala de numero ${salaDeEstudo} com atualmente ${filtroEstudoSala2.length} participantes e a sua sala de café é a sala de numero ${salaDeCafe} com atualmente ${filtroCafeSala1.length} participantes`)
    } else {
        alert(`Bem vindo ${nome} sua sala de estudo é a sala de numero ${salaDeEstudo} com atualmente ${filtroEstudoSala2.length} participantes e a sua sala de café é a sala de numero ${salaDeCafe} com atualmente ${filtroCafeSala2.length} participantes`)
    }
}


function getListaCompleta(){
    const listaAplicantes = localStorage.getItem("listaAplicantes");
    const listaCompleta = JSON.parse(listaAplicantes)
    return listaCompleta
}

function procurarAplicante(){            
    const individuo = prompt("Coloque o nome do aplicante que deseja saber as informacoes");
    const aplicante = getListaCompleta().aplicantes.filter(aplicante => aplicante.nome === individuo) 
    if (aplicante.length === 0 ){
        alert("Aplicante nao existe ou digitou o nome incorreto")
    } else {
        alert(JSON.stringify(aplicante))
    }
}

function pessoasSalaDeEstudo(){    
    const salaDesejadaEstudo = prompt("Coloque o numero da sala de estudo que queira saber a lotação")       
    const salaResultadoEstudo = getListaCompleta().aplicantes.filter(aplicante => aplicante.salaDeEstudo === salaDesejadaEstudo)       
    if (salaResultadoEstudo.length > 0 ){
        alert(`A sala de estudo numero ${salaDesejadaEstudo} esta atualmente com ${salaResultadoEstudo.length} aplicantes, sao eles ${JSON.stringify(salaResultadoEstudo)}`)
    } else {
        alert(`A sala desejada nao existe ou esta vazia`)
    }
}

function pessoasSalaDeCafe(){   
    const salaDesejadaCafe = prompt("Coloque o numero da sala de cafe que queira saber a lotação")    
    const salaResultadoCafe = getListaCompleta().aplicantes.filter(aplicante => aplicante.salaDeCafe === salaDesejadaCafe)       
    if (salaResultadoCafe.length > 0 ){
        alert(`A sala de cafe numero ${salaDesejadaCafe} esta atualmente com ${salaResultadoCafe.length} aplicantes, sao eles ${JSON.stringify(salaResultadoCafe)}`)
    } else {
        alert(`A sala desejada nao existe ou esta vazia`)
    }
}

function removerAplicante(){    
    const aplicanteProcurado = prompt("Coloque o nome do aplicante que deseja remover")
    const aplicanteDesejado = getListaCompleta().aplicantes.filter(aplicante => aplicante.nome === aplicanteProcurado)
    if (aplicanteDesejado.length === 0) {
        alert("Aplicante nao existe ou digitou o nome incorreto")
    } else {
        const oIndex = getListaCompleta().aplicantes.findIndex(aplicante => aplicante.nome === aplicanteProcurado)  
        const listaAtualizada = getListaCompleta()
        listaAtualizada.aplicantes.splice(oIndex, 1)
        alert(`O aplicante ${aplicanteProcurado} foi removido com sucesso.`)       
        localStorage.setItem("listaAplicantes", JSON.stringify(listaAtualizada));
    }
}

function resetarTudo(){
    const resetar = prompt('Digite "Sim" para confirmar')
    if (resetar === "Sim"){
    localStorage.clear()
    const botao = document.getElementById("botao6")
    botao.setAttribute('type', 'submit')       
    } else {
        alert(`Você não confirmou ou seja os aplicantes não serão removidos`)
    }   
}

function esconder(){
    document.getElementById("botao2").style.display = "none"
    document.getElementById("botao3").style.display = "none"
    document.getElementById("botao4").style.display = "none"
    document.getElementById("botao5").style.display = "none"
    document.getElementById("botao6").style.display = "none"
    document.getElementById("botaoSecreto").style.display = "none"
}

function mostrar(){
    document.getElementById("botao2").style.display = "block"    
    document.getElementById("botao3").style.display = "block"
    document.getElementById("botao4").style.display = "block"
    document.getElementById("botao5").style.display = "block"
    document.getElementById("botao6").style.display = "block"
    document.getElementById("botaoSecreto").style.display = "block"
}

function logSystem(){
console.clear()
console.log("Aplicantes: ", JSON.stringify(getListaCompleta()));
console.log("Nome Dos Aplicantes: ", JSON.stringify(getListaCompleta().aplicantes.map(aplicante => aplicante.nome)));
console.log("Aplicantes da sala de estudo numero 1: ", JSON.stringify(getListaCompleta().aplicantes.filter(aplicante => aplicante.salaDeEstudo == 1)));
console.log("Aplicantes da sala de estudo numero 2: ", JSON.stringify(getListaCompleta().aplicantes.filter(aplicante => aplicante.salaDeEstudo == 2)));
console.log("Aplicantes da sala de cafe numero 1: ", JSON.stringify(getListaCompleta().aplicantes.filter(aplicante => aplicante.salaDeCafe == 1)));
console.log("Aplicantes da sala de cafe numero 2: ", JSON.stringify(getListaCompleta().aplicantes.filter(aplicante => aplicante.salaDeCafe == 2)));
}

//const Salvando = localStorage.getItem("Salvando")
// console.log(Salvando)


// variavel.filter((value) => {
    //    return value !== "designed value"
    //})
    
    // localStorage.setItem("Salvando", nome + salaDeEstudos + salasDeCafe )     
    // localStorage.setItem("Nome", nome)     
    // localStorage.setItem("Sala De Estudo", salaDeEstudos)     
    // localStorage.setItem("Sala De Cafe", salasDeCafe)     
    
    // alert(`Cadrastro Realizado com sucesso ${nome} voce ira ficar na ${salaDeEstudos} e depois irá para a ${salasDeCafe}`);