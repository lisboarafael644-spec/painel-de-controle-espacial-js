/* ===== Barra de progresso (cada etapa concluída vale 12,5%) ===== */
const textoProgresso = document.querySelector("#texto-progresso")
const barraPreenchimento = document.querySelector("#barra-preenchimento")
const TOTAL_ETAPAS = 8
const etapasConcluidas = new Set()

function concluirEtapa(numero) {
    etapasConcluidas.add(numero)
    const porcentagem = (etapasConcluidas.size / TOTAL_ETAPAS) * 100
    barraPreenchimento.style.width = porcentagem + "%"
    textoProgresso.textContent = porcentagem + "%"
}

/* ===== Etapa 1: Clicks e Classes CSS ===== */
const btnEnergia = document.querySelector("#btn-energia")
const statusEnergia = document.querySelector("#modulo-energia p")

btnEnergia.addEventListener("click", () => {
    document.body.classList.add("energia-restaurada")
    statusEnergia.textContent = "O sistema está operando em energia plena."
    concluirEtapa(1)
})

/* ===== Etapa 2: Eventos de Mouse ===== */
const areaRastreio = document.getElementById("area-rastreio")
const coordX = document.getElementById("coord-x")
const coordY = document.getElementById("coord-y")

areaRastreio.addEventListener("mousemove", (event) => {
    coordX.textContent = event.offsetX
    coordY.textContent = event.offsetY
    concluirEtapa(2)
})

/* ===== Etapa 3: Manipulação de Atributos HTML ===== */
const imgEscudo = document.querySelector("#img-escudo")
const botoesAlerta = document.querySelectorAll(".btn-alerta")

botoesAlerta.forEach((botao) => {
    botao.addEventListener("click", () => {
        const cor = botao.dataset.cor
        const status = botao.dataset.status

        imgEscudo.src = `https://placehold.co/150x150/${cor}/white?text=${encodeURIComponent(status)}`
        imgEscudo.alt = status
        concluirEtapa(3)
    })
})

/* ===== Etapa 4: Criação de Elementos (Checklist) ===== */
const inputTarefa = document.getElementById("input-tarefa")
const btnAddTarefa = document.getElementById("btn-add-tarefa")
const listaTarefas = document.getElementById("lista-tarefas")

btnAddTarefa.addEventListener("click", () => {
    const texto = inputTarefa.value.trim()

    if (texto === "") return

    const novaTarefa = document.createElement("li")

    const textoTarefa = document.createElement("span")
    textoTarefa.textContent = texto

    const btnCompletar = document.createElement("button")
    btnCompletar.textContent = "Completar tarefa"
    btnCompletar.type = "button"

    btnCompletar.addEventListener("click", () => {
        novaTarefa.classList.add("concluida")
        btnCompletar.remove()
    })

    novaTarefa.appendChild(textoTarefa)
    novaTarefa.appendChild(btnCompletar)
    listaTarefas.appendChild(novaTarefa)

    inputTarefa.value = ""
    concluirEtapa(4)
})

/* ===== Etapa 5: Eventos de Teclado (keyup) ===== */
const inputMensagem = document.getElementById("input-mensagem")
const visorTransmissao = document.getElementById("visor-transmissao")

inputMensagem.addEventListener("keyup", () => {
    const mensagem = inputMensagem.value.trim()

    if (mensagem === "") {
        visorTransmissao.textContent = "Aguardando sinal..."
    } else {
        visorTransmissao.textContent = mensagem
        concluirEtapa(5)
    }
})

/* ===== Etapa 6: Evento Change (Select) e Estilos ===== */
const selectDestino = document.getElementById("select-destino")
const painel = document.querySelector(".painel")

selectDestino.addEventListener("change", () => {
    const corEscolhida = selectDestino.value
    document.body.style.backgroundColor = corEscolhida
    painel.style.borderColor = corEscolhida
    concluirEtapa(6)
})

/* ===== Etapa 7: Validação Simples (If/Else) ===== */
const inputSenha = document.getElementById("input-senha")
const btnAutenticar = document.getElementById("btn-autenticar")
const msgAcesso = document.getElementById("msg-acesso")

const SENHA_CORRETA = "cyberpunk2077"

btnAutenticar.addEventListener("click", () => {
    if (inputSenha.value === SENHA_CORRETA) {
        msgAcesso.textContent = "Acesso Concedido"
        msgAcesso.className = "status-sucesso"
        concluirEtapa(7)
    } else {
        msgAcesso.textContent = "Acesso Negado"
        msgAcesso.className = "status-erro"
    }
})

/* ===== Etapa 8: Temporizadores (setInterval e clearInterval) =====
   Ainda por fazer: btn-aquecer, btn-resfriar e valor-temp já estão no HTML. */