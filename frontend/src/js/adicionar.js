import Editor from '@toast-ui/editor';

// Plugins
import chart from '@toast-ui/editor-plugin-chart';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';

// Dependência para syntax highlight
import Prism from 'prismjs';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import '@toast-ui/editor-plugin-uml';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'prismjs/themes/prism.css';

const editor = new Editor({
    el: document.querySelector('#editor'),
    height: '75vh',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    usageStatistics: false,
    language: "en-US",
    plugins: [
        [chart],
        [codeSyntaxHighlight, { highlighter: Prism }],
        colorSyntax,
        tableMergedCell,
        uml
    ]
});

const btnstep2 = document.querySelector("#goto-step2")
const tagselector = document.querySelector("#tag-selector")
const tagselectorinput = document.querySelector("#selected-tags")
const tagdropdown = document.querySelector("#tag-dropdown")
const formulario_postagem = document.querySelector("#createpost")

btnstep2.addEventListener('click', (event) => {
    document.querySelector(".step1").style.display = "none"
    document.querySelector(".step2").style.display = "grid"
    let le_html = editor.getHTML()
    document.querySelector("#post-content-preview").innerHTML = le_html
})

tagselectorinput.addEventListener('click', (event) => {
    if (event.target != tagselectorinput && event.target != tagselectorinput.querySelector(".default-text")) return

    tagselector.toggleAttribute("data-expanded")
    tagselector.querySelector(".dropdown-chevron").classList.toggle("dropdown-chevron-down")
    tagdropdown.classList.toggle("expanded")
})

document.querySelector("#post-title").addEventListener('change', (event) => {
    document.querySelector("#post-title-preview").innerText = event.target.value
});

var available_tags = document.querySelector("#tag-dropdown").children
var actually_selected = []
available_tags.forEach(tag => {
    tag.addEventListener('click', (event) => {
        tag.toggleAttribute("data-selected")

        if (tag.hasAttribute("data-selected")) {
            actually_selected.push(tag.getAttribute("data-tagvalue"))
            tagselectorinput.appendChild(tag)
        } else {
            actually_selected.splice(actually_selected.indexOf(tag.getAttribute("data-tagvalue")), 1);
            tagdropdown.appendChild(tag)
        }

        if (actually_selected.length == 0) {
            tagselectorinput.querySelector(".default-text").style.display = "block"
        } else {
            tagselectorinput.querySelector(".default-text").style.display = "none"
        }
    })
});

formulario_postagem.addEventListener('submit', async function (event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('titulo', event.target.querySelector("input[name='input-post-title']").value)
    formData.append('conteudo', editor.getHTML())
    formData.append('tags', actually_selected)

    var jsonado = {}

    formData.entries().forEach(field => {
        const [key, value] = field
        jsonado[key] = value
    });

    jsonado = JSON.stringify(jsonado)

    try {
        const request = await fetch("http://localhost:3000/create-post", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: jsonado
        })

        console.log(request)
        alert('eita porra')
    } catch (error) {
        alert('erro no front')
        console.log(error)
    }

});