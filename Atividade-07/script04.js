const num = prompt('Informe um numero')
const array = []

for(let i = 0; i < num; i++) {
    array[i] = prompt(`Informe a ${i+1}ª palavra`)
}

for(let i = array.length-1; i >= 0; i--) {
    console.log(array[i])
}