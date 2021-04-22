const nome = prompt('Informe seu nome.')
const peso = prompt('Informe seu peso.')
const altura = prompt('Informe sua altura')

const imc = (parseInt(peso) / Math.pow(parseFloat(altura), 2))

if (imc < 17) {
    alert(`${nome} você está muito abaixo do peso\nDICA: procure um nutricionista`)
} else if (imc >= 17 && imc < 18.5) {
    alert(`${nome} você está abaixo do peso\nDICA: Convém comer mais`)
} else if (imc >= 18.5 && imc < 25) {
    alert(`${nome} você está normal\nDICA: Continue assim`)
} else if (imc >= 25 && imc < 30) {
    alert(`${nome} você está acima do peso\nDICA: Convém comer menos`)
} else if (imc >= 30 && imc < 35) {
    alert(`${nome} você está com obesidade I\nDICA: Procure um nutricionista`)
} else if (imc >= 35 && imc < 40) {
    alert(`${nome} você está com obesidade II(severa)\nDICA: procure um nutricionista urgente`)
} else if (imc >= 40) {
    alert(`${nome} você está com obesidade III(mórbida)\nDICA: procure um nutricionista urgentemente`)
} else{
    alert("[ERROR] Insira um numero real!")
}