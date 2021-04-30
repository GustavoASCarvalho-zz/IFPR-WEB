
const nome01 = prompt('Informe seu nome.')
const peso01 = prompt('Informe seu peso.')
const altura01 = prompt('Informe sua altura')

const nome02 = prompt('Informe seu nome.')
const peso02 = prompt('Informe seu peso.')
const altura02 = prompt('Informe sua altura')

const imc01 = (parseInt(peso01) / Math.pow(parseFloat(altura01), 2))
const imc02 = (parseInt(peso02) / Math.pow(parseFloat(altura01), 2))

if(imc01 > imc02) {
    console.log(`O IMC de ${nome01} (${imc01}) é maior que o de ${nome02} (${imc02})`)
}else if(imc02 > imc01) {
    console.log(`O IMC de ${nome01} (${imc01}) é menor que o de ${nome02} (${imc02})`)
} else {
    console.log(`O IMC de ${nome01} (${imc01}) é Igual que o de ${nome02} (${imc02})`)
}