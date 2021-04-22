const calcularGorjeta = function() {
    if (this.valor < 50){
        this.gorjeta = 20*this.valor/100
        return this.gorjeta
    } else if (this.valor >= 50 && this.valor <= 200){
        this.gorjeta = 15*this.valor/100
        return this.gorjeta
    } else if (this.valor > 200){
        this.gorjeta = 10*this.valor/100
        return this.gorjeta
    }
}

const calcularValorTotal = function() {
    this.valorTotal = parseFloat(this.valor) + parseFloat(this.gorjeta)
}

const toString = function() {
    return `Restaurante ${this.nome} - [Valor: R$ ${this.valor} | Gorjeta: R$ ${this.gorjeta.toFixed(2)} | Total: R$ ${this.valorTotal.toFixed(2)}]`
}

const quantidade = prompt(`informe a quantidade de restaurantes visitados`)

const restaurantes = [];

for (let i = 0; i < quantidade; i++) {
    const restaurante = {
    
        setNome: function(nome) {
            this.nome = nome;
        },
        setValor: function(valor) {
            this.valor = valor;
        },
        calcularGorjeta,
        calcularValorTotal,
        toString,
    }
    restaurante.setNome(prompt(`Informe o nome do ${i+1}º restaurante`))
    restaurante.setValor(prompt(`Informe o valor do ${i+1}º restaurante`))
    restaurante.calcularGorjeta()
    restaurante.calcularValorTotal()
    restaurantes.push(restaurante)
}

restaurantes.calcularGasto = function () {
    let gastoTotal = 0
    for (let i = 0; i < quantidade; i++) {
        gastoTotal += parseFloat(restaurantes[i].valorTotal)
    }
    return gastoTotal
}

restaurantes.calcularGastoMedio = function () {
    return (restaurantes.calcularGasto()/quantidade)
}

restaurantes.maiorGasto = function () {
    let maior = 0
    for (let i = 0; i < quantidade; i++) {
        let now = 0
        now = parseFloat(restaurantes[i].valorTotal)
        if (now >= maior) {
            maior = i
        }
    }
    return restaurantes[maior]
}

restaurantes.imprimir = function () {
    console.log(`Restaurantes visitados no feriado: ${quantidade}`)
    console.log(`Listo de gastos:`)
    for (let i = 0; i < quantidade; i++) {
        console.log(`\t${restaurantes[i].toString()}`)
    }
    console.log(`Total gasto: R$ ${restaurantes.calcularGasto().toFixed(2)}`)
    console.log(`Média de gastos: R$ ${restaurantes.calcularGastoMedio().toFixed(2)}`);
    console.log(`Restaurante com maior gasto total: ${restaurantes.maiorGasto().nome} (R$ ${restaurantes.maiorGasto().valorTotal.toFixed(2)})`);
}