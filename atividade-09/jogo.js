let jogo;

const elementos = {
    telaInicial: document.getElementById(`inicial`),
    telaJogo: document.getElementById(`jogo`),
    telaCadastro: document.getElementById(`cadastro`),
    telaMensagem: document.querySelector(`.mensagem`),
    textoMensagem: document.querySelector(`#texto`),
    telaDica: document.querySelector(`.dica`),
    textoDica: document.querySelector(`#texto-dica`),
    teclado: document.querySelector(`.teclado`),
    palavra: document.querySelector(`.palavra`),
    palavraCadastrada: document.querySelector(`#palavraCadastrada`),
    dicaCadastrada: document.querySelector(`#dicaCadastrada`),
    botoes: {
        facil: document.querySelector('.botao-facil'),
        medio: document.querySelector('.botao-medio'),
        dificil: document.querySelector('.botao-dificil'),
        reiniciar: document.querySelector('.reiniciar'),
        irParaCadastro: document.querySelector('#cadastrar-palavra'),
        cadastrar: document.querySelector('#botao-cadastro'),
        dica: document.querySelector('#dica'),
    },
    boneco: [
        document.querySelector('.boneco-cabeca'),
        document.querySelector('.boneco-corpo'),
        document.querySelector('.boneco-braco-esquerdo'),
        document.querySelector('.boneco-braco-direito'),
        document.querySelector('.boneco-perna-esquerda'),
        document.querySelector('.boneco-perna-direita')
    ],
    radioButton: {
        facil: document.querySelector(`#facil`),
        medio: document.querySelector(`#medio`),
        dificil: document.querySelector(`#dificil`),
    }
}

const palavras = {

    facil: {
        palavra: ["poder", "Significado", "Banana", "Pá", "Casamento", "Caramelo", "Guerra", "Serra", "Inglaterra", "Brasil"],
        dica: ["Sinônimo de domínio", "Fruta", "Ferramena feita de metal destinada a cavocar terra", "União entre duas pessoas", "Açúcar derretido e em parte decomposto pela ação do fogo", "Luta armada entre nações ou entre partidos", "Ferramenta feita com uma lâmina destinada a cortar madeira ou metal", "Local de nascimento de Shakespeare e dos Beatles", "País do futebol"],
    },

    medio: {
        palavra: ["efêmero", "casamata", "pé", "ouro", "Touro", "Louro", "Couro", "lavadouro", "miradouro", "Estouro"],
        dica: ["Algo que não duram nem 1 dia", "Abrigo subterrâneo que, numa construção fortificada, se destina ao alojamento de tropas ou ao armazenamento de munições", "Parte terminal do membro inferior que assenta no chão", "Elemento químico, metálico e de muito valor", "Macho reprodutor da espécie bovina", "Folha do loureiro", "Pele espessa de certos animais", "Lugar público onde se lava roupa", "O mesmo que mirante.", "detonação de bomba, granada, mina etc"],
    },

    dificil: {
        palavra: ["recíproco", "Agnóstico", "Alvíssaras", "Balaústre", "Beneplácito", "Cornucópia", "Cuntatório", "Deletério", "Desasnado", "Empedernido"],
        dica: ["Que ocorre em troca de algo semelhante", "Aquele que não acredita em Deus e nem nega a sua existência", "Expressão de alegria por notícia recebida", "Pequena coluna ornamentada utilizada em cercas", "Consentimento ou aprovação", "Abundância, vaso em forma de chifre cheio de flores e frutos que representa a fartura", "Em que há demora", "Degradante, insalubre, prejudicial", "Que recebeu instrução, que desasnou", "Aquele que não se deixa persuadir ou não se comove"],
    }

    //facil: ["poder", "anexo", "fosse", "honra", "fútil", "justo", "muito", "razão", "ícone", "mútuo", "lapso", "gozar", "quiçá", "égide", "tange"],
    //medio: ["empatia", "embuste", "cônjuge", "exceção", "efêmero", "prolixo", "idílico", "caráter", "análogo", "genuíno", "estória", "sublime", "pêsames", "verbete", "sucinto"],
    //dificil: ["perspicaz", "recíproco", "concepção", "hipócrita", "paradigma", "hegemonia", "corolário", "confiança", "taciturno", "nostalgia", "ludibriar", "preâmbulo", "ignorante", "veemência", "extasiado",]
}

const novoJogo = () => {

    jogo = {
        dificuldade: undefined,
        palavra: {
            original: undefined,
            semAcentos: undefined,
            tamanho: undefined,
            dica: undefined,
        },
        acertos: undefined,
        jogadas: [],
        chances: 6,
        definirPalavra: function (palavra, dica) {
            this.palavra.original = palavra
            this.palavra.tamanho = palavra.length;
            this.acertos = '';
            this.palavra.dica = dica;
            this.palavra.semAcentos = this.palavra.original.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            for (let i = 0; i < this.palavra.tamanho; i++) {
                this.acertos += ' '
            }
        },
        jogar: function (letraJogada) {
            let acertou = false

            for (let i = 0; i < this.palavra.tamanho; i++) {
                const letra = this.palavra.semAcentos[i].toLowerCase()

                if (letra === letraJogada.toLowerCase()) {
                    acertou = true
                    this.acertos = replace(this.acertos, i, this.palavra.original[i])
                }
            }
            if (!acertou) {
                this.chances--
            }
            return acertou;
        },
        ganhou: function () {
            return !this.acertos.includes(' ')
        },
        perdeu: function () {
            return this.chances <= 0
        },
        acabou: function () {
            return this.ganhou() || this.perdeu()
        },
    };

    elementos.telaDica.style.display = 'none'
    elementos.textoDica.style.display = 'none'
    elementos.telaInicial.style.display = 'flex'
    elementos.telaJogo.style.display = 'none'
    elementos.telaMensagem.style.display = 'none'
    elementos.telaMensagem.classList.remove['mensagem-vitoria']
    elementos.telaMensagem.classList.remove['mensagem-derrota']
    elementos.telaDica.classList.remove['mensagem-dica']
    for (const parte of elementos.boneco) {
        parte.classList.remove('escondido');
        parte.classList.add('escondido');
    }
    criarTeclado();
}

const criarTeclado = () => {
    const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',]
    elementos.teclado.textContent = '';
    for (const letra of letras) {
        const button = document.createElement('button')
        button.appendChild(document.createTextNode(letra.toUpperCase()))
        button.classList.add(`botao-${letra}`)
        //elementos.teclado.innerHTML = `<button class="botao-${letra}">${letra.toUpperCase}</button>`
        elementos.teclado.appendChild(button)

        button.addEventListener('click', () => digitar(letra))
    }
}

const digitar = (e) => {
    if (!jogo.jogadas.includes(e) && !jogo.acabou()) {
        const acertou = jogo.jogar(e)
        jogo.jogadas.push(e)

        for (const i of elementos.teclado.children) {

            if (i.textContent.toLowerCase() === e) {
                i.classList.add(acertou ? 'certo' : 'errado')
            }
        }

        mostrarPalavra()

        if (!acertou) {
            mostrarErro();
        }

        if (jogo.ganhou()) {
            mostrarMensagem(true)
        } else if (jogo.perdeu()) {
            mostrarMensagem(false)
        }
    }
}

const mostrarErro = () => {
    const parte = elementos.boneco[5 - jogo.chances]
    parte.classList.remove('escondido')
}

const mostrarMensagem = vitoria => {
    const mensagem = vitoria ? '<p>Parabèns!</p><p>Você GANHOU</p>' : '<p>Que Pena!</p><p>Você PERDEU!</p>'
    elementos.textoMensagem.innerHTML = mensagem
    elementos.telaMensagem.style.display = 'flex'
    elementos.telaMensagem.classList.add(`mensagem-${vitoria ? 'vitoria' : 'derrota'}`)
    elementos.telaDica.style.display = 'none'
}

const mostrarDica = () => {
    elementos.textoDica.innerHTML = `<p>${jogo.palavra.dica}</p>`
    elementos.telaDica.classList.add('mensagem-dica')
    elementos.botoes.dica.style.display = 'none'
}

const mostrarTelaDica = () => {
    elementos.botoes.dica.style.display = 'flex'
    elementos.textoDica.style.display = 'flex'
    elementos.textoDica.innerHTML = `<p>Quer uma ajuda?</p>`
    elementos.telaDica.style.display = 'flex'
}

const carregarTelaCadastro = () => {
    elementos.telaCadastro.style.display = 'flex'
    elementos.telaInicial.style.display = 'none'
    elementos.telaJogo.style.display = 'none'
}

const sortearPalavra = () => {
    const i = Math.floor(Math.random() * palavras[jogo.dificuldade].palavra.length)
    jogo.definirPalavra(palavras[jogo.dificuldade].palavra[i], palavras[jogo.dificuldade].dica[i])
}

const mostrarPalavra = () => {
    elementos.palavra.textContent = ''
    for (let i = 0; i < jogo.acertos.length; i++) {
        const letra = jogo.acertos[i].toUpperCase()
        elementos.palavra.innerHTML += `<div class="letra-${i}">${letra}</div>`
    }
}

const iniciarJogo = (dificuldade) => {
    jogo.dificuldade = dificuldade
    elementos.telaInicial.style.display = 'none'
    elementos.telaCadastro.style.display = 'none'
    elementos.telaJogo.style.display = 'flex'

    mostrarTelaDica()
    sortearPalavra()
    mostrarPalavra()

    document.querySelector('body').addEventListener('keydown', (e) => digitar(e.key));
}

elementos.botoes.dica.addEventListener('click', () => mostrarDica())

const cadastrarPalavra = () => {

    for (const i in elementos.radioButton) {
        if (elementos.radioButton[i].checked) {
            if (!palavras[`${i}`].palavra.includes(elementos.palavraCadastrada.value) && elementos.palavraCadastrada.value != "" && elementos.dicaCadastrada.value != "") {
                palavras[`${i}`].palavra.push(elementos.palavraCadastrada.value)
                palavras[`${i}`].dica.push(elementos.dicaCadastrada.value)
                console.log("teste");
                elementos.telaInicial.style.display = 'flex'
                elementos.telaCadastro.style.display = 'none'
                elementos.telaJogo.style.display = 'none'
            } else {
                console.log("palavra ja cadastrada");
            }
        }
    }
}

const replace = (str, i, newChar) => str.substring(0, i) + newChar + str.substring(i + 1)


elementos.botoes.facil.addEventListener('click', () => iniciarJogo('facil'))

elementos.botoes.medio.addEventListener('click', () => iniciarJogo('medio'))

elementos.botoes.dificil.addEventListener('click', () => iniciarJogo('dificil'))

elementos.botoes.reiniciar.addEventListener('click', () => novoJogo())

elementos.botoes.irParaCadastro.addEventListener('click', () => carregarTelaCadastro())

elementos.botoes.cadastrar.addEventListener('click', () => cadastrarPalavra())

novoJogo()