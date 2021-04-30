const proxy = 'https://secret-ocean-49799.herokuapp.com'
const base = 'https://opentdb.com'

let jogo;

const elementos = {
    
    telaEscolhaDificuldade: document.querySelector('#escolha-dificuldade'),
    telaAlternativas: document.querySelector('#alternativas'),
    telaArmazenar: document.querySelector('#armazenar'),
    telaPergunta: document.querySelector('#pergunta'),
    telaJogo: document.querySelector('#jogo'),
    telaCategoria: document.querySelector('#tela-categoria'),
    selecaoCategoria: document.querySelector('#escolha-categoria'),
    telaOpcao: document.querySelector('#opcao'),
    telaFimJogo: document.querySelector('#fim-jogo'),
    progress: document.querySelector('#progress'),

    textPontuacao: document.querySelector('#pontuacao'),
    textPerguntas: document.querySelector('#perguntas-respondidas'),
    textDificuldade: document.querySelector('#dificuldade-selecionada'),
    textCategoria: document.querySelector('#categoria-selecionada'),
    textPontuacaoAtual: document.querySelector('#pontuacao-atual'),
    textAcertos: document.querySelector('#acertos'),
    botoes: {
        dificuldades: {
            easy: document.querySelector('#b-facil'),
            medium: document.querySelector('#b-medio'),
            hard: document.querySelector('#b-dificil'),
        },
        alternativas: {

        },
        botaoSubmit: document.querySelector('#b-submit'),
        botaoArmazenar: document.querySelector('#b-armazenar'),
        botaoSim: document.querySelector('#b-sim'),
        botaoNao: document.querySelector('#b-nao'),
        botaoNovoJogo: document.querySelector('#b-novo-jogo')
    },
}

elementos.botoes.botaoSim.addEventListener('click', () => {
    jogo.responderArmazenada()
    elementos.telaOpcao.classList.add('collapse')
    carregarTelaJogo()
    
})
elementos.botoes.botaoNao.addEventListener('click', () => {
    elementos.telaOpcao.classList.add('collapse')
    carregarPergunta()
})

elementos.botoes.botaoArmazenar.addEventListener('click', () => {
    if(jogo.perguntaArmazenada === undefined){
        jogo.armazenarPergunta() 
        carregarTelaOpcao()
    }
})

elementos.botoes.botaoNovoJogo.addEventListener('click', () => {
    novoJogo()
})

elementos.botoes.botaoSubmit.addEventListener('click', () => {


    jogo.definirCategoria(elementos.selecaoCategoria.options[elementos.selecaoCategoria.selectedIndex].value,elementos.selecaoCategoria.options[elementos.selecaoCategoria.selectedIndex].textContent)
    
    elementos.telaCategoria.classList.add('collapse')
    
    carregarPergunta()    
})

const novoJogo = () => {
    jogo = {
        perguntasRespondidas: 0,
        pontuacao: 0,
        dificuldade: undefined,
        categoria: undefined,
        categoriaPalavra: undefined,
        acertos: 0,
        chances: 3,
        perguntaArmazenada: undefined,
        pergunta: undefined,
        definirDificuldade: function (dificuldade) {
            this.dificuldade = dificuldade
        },
        definirCategoria: function (categoriaIndex,categoria) {
            this.categoria = categoriaIndex
            this.categoriaPalavra = categoria

        },
        armazenarPergunta: function () {
            this.perguntaArmazenada = this.pergunta
            
        },
        responderArmazenada: function () {
            this.pergunta = this.perguntaArmazenada
            this.perguntaArmazenada = undefined
            
        },
        respondi: function () {
            this.perguntasRespondidas++
        },
        computarAcerto: function () {
            if(this.pergunta === this.perguntaArmazenada) {
                if(this.dificuldade == 'easy'){
                    this.pontuacao += 3
                }else if(this.dificuldade == 'medium'){
                    this.pontuacao += 6
                }else if(this.dificuldade == 'hard'){
                    this.pontuacao += 8
                }
            } else {
                if(this.dificuldade == 'easy'){
                    this.pontuacao += 5
                }else if(this.dificuldade == 'medium'){
                    this.pontuacao += 8
                }else if(this.dificuldade == 'hard'){
                    this.pontuacao += 10
                }
            }
            this.acertos++
            console.log(`chances: ${this.chances}`);
        },
        computarErro: function () {
            if(this.dificuldade == 'easy'){
                this.pontuacao += -5
            }else if(this.dificuldade == 'medium'){
                this.pontuacao += -5
            }else if(this.dificuldade == 'hard'){
                this.pontuacao += -5 
            }
            this.chances--
            console.log(`chances: ${this.chances}`);
        },
    }
    elementos.telaEscolhaDificuldade.classList.remove('collapse')
    elementos.telaFimJogo.classList.add('collapse')
    for (const i in elementos.botoes.dificuldades) {
        elementos.botoes.dificuldades[i].addEventListener('click', () => {
            jogo.definirDificuldade(i)
            elementos.telaEscolhaDificuldade.classList.add('collapse')
            carregarCategorias()
        })
    }
}

const carregarCategorias = () => {
    axios.get(`${proxy}/${base}/api_category.php`).then((response) => {
        const categoria = response.data.trivia_categories
            elementos.selecaoCategoria.innerHTML = ""
            elementos.selecaoCategoria.innerHTML += `<option value="0" disabled selected >Random</option>`
            elementos.selecaoCategoria.innerHTML += `<option value="0">Random</option>`
                        
        for (const c of categoria) {
            elementos.selecaoCategoria.innerHTML += `<option value="${c.id}">${c.name}</option>`    
        }
    })
    setTimeout(() => {elementos.telaCategoria.classList.remove('collapse')},1000)
}

const carregarPergunta = () => {
    if (jogo.chances != 0) {
        axios.get(`${proxy}/${base}/api.php?amount=1&category=${jogo.categoria}&difficulty=${jogo.dificuldade}`).then((response) => {
            jogo.pergunta = response.data.results[0]
            carregarTelaJogo()
        })
    }else {
        console.log("acabou");
        carregarTelaFimJogo()
    }
    
    
}

const decodeHTMLEntities = (text) => {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

const verificarAcerto = (resposta) => {
    jogo.respondi()
    const buttonResposta = resposta.path[1].firstChild
    const buttonConfirm = resposta.target
    if(buttonResposta.textContent == jogo.pergunta.correct_answer){
        buttonResposta.classList.remove('btn-outline-light')
        buttonResposta.classList.add('btn-outline-success')
        buttonConfirm.classList.remove('btn-outline-light')
        buttonConfirm.classList.add('btn-outline-success')
        jogo.computarAcerto()
    }else{
        buttonResposta.classList.remove('btn-outline-light')
        buttonResposta.classList.add('btn-outline-danger')
        buttonConfirm.classList.remove('btn-outline-light')
        buttonConfirm.classList.add('btn-outline-danger')
        jogo.computarErro()
    }
}

const carregarTelaFimJogo = () => {
    elementos.telaJogo.classList.add('collapse')
    elementos.telaOpcao.classList.add('collapse')
    elementos.telaAlternativas.classList.add('collapse')
    elementos.telaEscolhaDificuldade.classList.add('collapse')
    elementos.telaFimJogo.classList.remove('collapse')

    elementos.textPontuacao.textContent = jogo.pontuacao
    elementos.textPerguntas.textContent = jogo.perguntasRespondidas
    elementos.textDificuldade.textContent = jogo.dificuldade.toUpperCase()
    elementos.textCategoria.textContent = jogo.categoriaPalavra.toUpperCase()
    elementos.textAcertos.textContent = jogo.acertos


}

const carregarTelaOpcao = () => {
    elementos.telaJogo.classList.add('collapse')
    elementos.telaOpcao.classList.remove('collapse')
}

const carregarTelaJogo = () => {

    elementos.progress.classList.remove('bg-danger')
    elementos.progress.classList.remove('bg-warning')
    elementos.progress.classList.add('bg-success')

    elementos.textPontuacaoAtual.textContent = `Score: ${jogo.pontuacao}`
    elementos.telaJogo.classList.remove('collapse')
    elementos.telaAlternativas.classList.remove('collapse')
    elementos.botoes.botaoArmazenar.classList.remove('collapse')

    if(jogo.perguntaArmazenada !== undefined) {
        elementos.botoes.botaoArmazenar.classList.add('collapse')
    }

    elementos.telaPergunta.textContent = `${decodeHTMLEntities(jogo.pergunta.question)}`

    const perguntas = jogo.pergunta.incorrect_answers.concat(jogo.pergunta.correct_answer)

    perguntas.sort()

    elementos.telaAlternativas.innerHTML = ""

    for (let i = 0; i < perguntas.length; i++) {

        const button = document.createElement('button')
        const text = document.createTextNode(decodeHTMLEntities(perguntas[i]))
        const div = document.createElement('div')
        
        div.id = `div-alternativa-${i}`

        div.classList.add('d-flex')
        div.classList.add('justify-content-center')


        button.appendChild(text)
        button.classList.add('btn')
        button.classList.add('btn-outline-light')
        button.classList.add('m-2')
        button.classList.add('flex-fill')

        button.type = 'button'
        button.id = `alternativa-${i}`

        elementos.telaAlternativas.appendChild(div)
        
        document.querySelector(`#div-alternativa-${i}`).appendChild(button)

        elementos.botoes.botaoArmazenar.disabled = false
        
        elementos.botoes.alternativas[`botaoAlternativa${i}`] = document.querySelector(`#alternativa-${i}`)

        elementos.botoes.alternativas[`botaoAlternativa${i}`].addEventListener('click', (e) => {
 
            const bantigo = document.querySelector('#confirm')
            
            if (bantigo != null) {
                bantigo.parentNode.removeChild(bantigo)
                
            }
            
            const div = document.querySelector(`#div-alternativa-${i}`)
            const button = document.createElement('button')
            const text = document.createTextNode('confirm')
            
            button.appendChild(text)
            button.classList.add('btn')
            button.classList.add('btn-outline-success')
            button.classList.add('m-1')
            button.classList.add('flex-fill')
            button.type = 'button'
            button.id = `confirm`
            
            div.appendChild(button)

            button.addEventListener('click', (e) => {
                for (let i = 0; i < perguntas.length; i++) {
                    elementos.botoes.alternativas[`botaoAlternativa${i}`].disabled = true
                }
                elementos.botoes.botaoArmazenar.disabled = true
                button.disabled = true
                clearInterval(interval)
                verificarAcerto(e)
                
                if (elementos.botoes.botaoArmazenar.classList.contains('collapse')){
                    setTimeout(carregarTelaOpcao,2000)
                }else{ 
                    setTimeout(carregarPergunta,2000)      
                }                
            })
        })
    }

    let contagem = 0
    let total = 0

    if(jogo.dificuldade == 'easy'){
        contagem = 1500
    } else if(jogo.dificuldade == 'medium'){
        contagem = 3000
    } else if(jogo.dificuldade == 'hard'){
        contagem = 4000
    }

    total = contagem

    elementos.progress.setAttribute("style",`width: 100%;`)
    elementos.progress.setAttribute("aria-valuenow",`100`)

    const interval = setInterval(() => {
        
        if(!elementos.telaJogo.classList.contains('collapse')){
            --contagem
       
            const aux = contagem * 100 / total
         
            elementos.progress.setAttribute("style",`width: ${Math.round(aux)}%;`)
            elementos.progress.setAttribute("aria-valuenow",`${Math.round(aux)}`)
            
            if (aux <= 60){
                elementos.progress.classList.remove('bg-success')
                elementos.progress.classList.add('bg-warning')
            }
            if (aux <= 30){
                elementos.progress.classList.remove('bg-warning')
                elementos.progress.classList.add('bg-danger')
            }
    
            if (contagem == 0) {
                
                for (let i = 0; i < perguntas.length; i++) {
                    elementos.botoes.alternativas[`botaoAlternativa${i}`].classList.remove('btn-outline-light')
                    elementos.botoes.alternativas[`botaoAlternativa${i}`].classList.add('btn-outline-danger')
                    elementos.botoes.alternativas[`botaoAlternativa${i}`].disabled = true
                }
                elementos.botoes.botaoArmazenar.classList.add('bg-outline-danger')
                elementos.botoes.botaoArmazenar.disabled = true
                clearInterval(interval)
                
                setTimeout(() => {
                    jogo.computarErro()
                    carregarPergunta()
                },2000)
            }
        }else {
            clearInterval(interval)
        }
    }, 10);


}

novoJogo()
