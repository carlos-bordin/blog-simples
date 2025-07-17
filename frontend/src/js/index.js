const search_bar = document.querySelector("#main-search")
const search_form = search_bar.querySelector("form")

const badges_aliases = {
    "html": { texto: "HTML", classe: "html-badge" },
    "css": { texto: "CSS", classe: "css-badge" },
    "javascript": { texto: "JavaScript", classe: "javascript-badge" },
    "uml": { texto: "UML", classe: "uml-badge" },
    "desenvolvimentoweb": { texto: "Desenvolvimento Web", classe: "desenvolvimentoweb-badge" },
}

const http_status_codes = {
    100: { titulo: "100 - Continuar", descricao: "Cabeçalhos recebidos, continue a requisição.", cor: "#3498db" },
    101: { titulo: "101 - Mudando Protocolos", descricao: "O servidor aceitou mudar o protocolo.", cor: "#3498db" },
    102: { titulo: "102 - Processando", descricao: "A requisição está sendo processada.", cor: "#3498db" },
    200: { titulo: "200 - Sucesso", descricao: "Requisição bem-sucedida.", cor: "#2ecc71" },
    201: { titulo: "201 - Criado", descricao: "Recurso criado com sucesso.", cor: "#2ecc71" },
    202: { titulo: "202 - Aceito", descricao: "Requisição aceita para processamento.", cor: "#2ecc71" },
    203: { titulo: "203 - Informação Não Autorizada", descricao: "Conteúdo alterado por proxy.", cor: "#2ecc71" },
    204: { titulo: "204 - Sem Conteúdo", descricao: "Requisição bem-sucedida sem resposta.", cor: "#2ecc71" },
    205: { titulo: "205 - Redefinir Conteúdo", descricao: "Cliente deve limpar o formulário.", cor: "#2ecc71" },
    206: { titulo: "206 - Conteúdo Parcial", descricao: "Resposta parcial conforme solicitado.", cor: "#2ecc71" },
    300: { titulo: "300 - Múltiplas Escolhas", descricao: "Mais de uma opção disponível.", cor: "#f1c40f" },
    301: { titulo: "301 - Movido Permanentemente", descricao: "Recurso foi movido de forma permanente.", cor: "#f1c40f" },
    302: { titulo: "302 - Encontrado", descricao: "Recurso foi movido temporariamente.", cor: "#f1c40f" },
    303: { titulo: "303 - Ver Outro", descricao: "Veja o recurso em outra URL.", cor: "#f1c40f" },
    304: { titulo: "304 - Não Modificado", descricao: "Recurso não sofreu alterações.", cor: "#f1c40f" },
    307: { titulo: "307 - Redirecionamento Temporário", descricao: "Redirecionamento sem alteração de método.", cor: "#f1c40f" },
    308: { titulo: "308 - Redirecionamento Permanente", descricao: "Redirecionamento definitivo.", cor: "#f1c40f" },
    400: { titulo: "400 - Requisição Inválida", descricao: "Sintaxe inválida na requisição.", cor: "#e74c3c" },
    401: { titulo: "401 - Não Autorizado", descricao: "Autenticação necessária.", cor: "#e74c3c" },
    402: { titulo: "402 - Pagamento Necessário", descricao: "Reservado para uso futuro.", cor: "#e74c3c" },
    403: { titulo: "403 - Proibido", descricao: "Acesso ao recurso negado.", cor: "#e74c3c" },
    404: { titulo: "404 - Não Encontrado", descricao: "Recurso não encontrado.", cor: "#e74c3c" },
    405: { titulo: "405 - Método Não Permitido", descricao: "Método não permitido para o recurso.", cor: "#e74c3c" },
    406: { titulo: "406 - Não Aceitável", descricao: "Formato de resposta não aceitável.", cor: "#e74c3c" },
    407: { titulo: "407 - Autenticação no Proxy", descricao: "Necessário autenticar no proxy.", cor: "#e74c3c" },
    408: { titulo: "408 - Tempo Esgotado", descricao: "Tempo de requisição excedido.", cor: "#e74c3c" },
    409: { titulo: "409 - Conflito", descricao: "Conflito com o estado do recurso.", cor: "#e74c3c" },
    410: { titulo: "410 - Removido", descricao: "Recurso foi removido permanentemente.", cor: "#e74c3c" },
    411: { titulo: "411 - Comprimento Necessário", descricao: "Cabeçalho Content-Length ausente.", cor: "#e74c3c" },
    412: { titulo: "412 - Pré-condição Falhou", descricao: "Pré-condição não atendida.", cor: "#e74c3c" },
    413: { titulo: "413 - Carga Muito Grande", descricao: "Conteúdo excede o limite.", cor: "#e74c3c" },
    414: { titulo: "414 - URI Muito Longa", descricao: "Endereço da URL é muito grande.", cor: "#e74c3c" },
    415: { titulo: "415 - Tipo Não Suportado", descricao: "Tipo de mídia não aceito.", cor: "#e74c3c" },
    416: { titulo: "416 - Intervalo Inválido", descricao: "Faixa de dados não disponível.", cor: "#e74c3c" },
    417: { titulo: "417 - Falha na Expectativa", descricao: "Expectativa não atendida pelo servidor.", cor: "#e74c3c" },
    418: { titulo: "418 - Sou um bule", descricao: "Piada do protocolo HTCPCP.", cor: "#e67e22" },
    422: { titulo: "422 - Entidade Não Processável", descricao: "Erro semântico na requisição.", cor: "#e74c3c" },
    426: { titulo: "426 - Atualização Necessária", descricao: "Troque para outro protocolo.", cor: "#e74c3c" },
    429: { titulo: "429 - Muitas Requisições", descricao: "Limite de requisições excedido.", cor: "#e74c3c" },
    500: { titulo: "500 - Erro Interno", descricao: "Erro inesperado no servidor.", cor: "#c0392b" },
    501: { titulo: "501 - Não Implementado", descricao: "Função não disponível.", cor: "#c0392b" },
    502: { titulo: "502 - Gateway Inválido", descricao: "Erro do servidor intermediário.", cor: "#c0392b" },
    503: { titulo: "503 - Indisponível", descricao: "Servidor temporariamente indisponível.", cor: "#c0392b" },
    504: { titulo: "504 - Tempo Esgotado no Gateway", descricao: "Servidor não respondeu a tempo.", cor: "#c0392b" },
    505: { titulo: "505 - Versão HTTP Não Suportada", descricao: "Versão do HTTP não suportada.", cor: "#c0392b" }
};


const modelo_div_resultado = document.querySelector("#modelo_div_resultado").cloneNode(true)
modelo_div_resultado.style.display = "block"
document.querySelector("#modelo_div_resultado").remove()

var postagens_atuais = []
let controller

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}


search_form.addEventListener("input", async (event) => {

    if (controller) {
        controller.abort("aborted fetch, new search term included");
    }

    controller = new AbortController();
    const signal = controller.signal;

    postagens_atuais.forEach(postagem => {
        postagem.remove()
    });
    postagens_atuais = []

    document.querySelector("#search-results").querySelector(".nothing-here").style.display = "block"
    document.querySelector("#search-results").classList.add("ghostie")

    let search_term = document.querySelector("#search-bar").value
    let rota = search_term && `http://localhost:3000/fetch-posts/${search_term}` || 'http://localhost:3000/fetch-posts/'

    try {
        const response = await fetch(rota, {
            method: "get",
            signal,
        })
        const resultado = await response.json()

        if (resultado.statusCode) {
            let encontrado_na_lista = http_status_codes[resultado.statusCode]

            if (encontrado_na_lista) {
                let novo = document.createElement("notification-toast")
                novo.setAttribute("title", encontrado_na_lista.titulo)
                novo.setAttribute("content", encontrado_na_lista.descricao)
                novo.setAttribute("color", encontrado_na_lista.cor)
                document.querySelector("#notification-tray").appendChild(novo)
            }
        }

        resultado.body.forEach(postagem => {
            let novo_html = modelo_div_resultado.cloneNode(true)
            novo_html.querySelector(".search-title").textContent = postagem.titulo
            document.querySelector("#search-results").appendChild(novo_html)

            postagem.tags.split(",").forEach(tag => {
                let badge_tag = document.createElement("span")
                badge_tag.textContent = badges_aliases[tag].texto
                badge_tag.classList.add(badges_aliases[tag].classe)

                novo_html.appendChild(badge_tag)
            });

            novo_html.href = `postagem.html?id=${postagem.id_postagem}`

            postagens_atuais.push(novo_html)
        });
    } catch (error) {
        console.log(error)
    }

    if (postagens_atuais.length == 0) {
        document.querySelector("#search-results").querySelector(".nothing-here").style.display = "block"
        document.querySelector("#search-results").classList.add("ghostie")
    } else {
        document.querySelector("#search-results").querySelector(".nothing-here").style.display = "none"
        document.querySelector("#search-results").classList.remove("ghostie")
    }

})