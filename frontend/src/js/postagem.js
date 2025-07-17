import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import '@toast-ui/editor-plugin-uml';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'prismjs/themes/prism.css';

var conteudo_post

const viewer = new Viewer({
    el: document.querySelector("#viewer"),
    usageStatistics: false,
});

try {
    const response = await fetch(`http://localhost:3000/postagem/${new URLSearchParams(document.location.search).get("id")}`, {
        method: "get",
    })
    const postagem = await response.json()

    conteudo_post = postagem[1].conteudo

    console.log(postagem)
} catch (error) {
    console.log(error)
}

viewer.setMarkdown(conteudo_post)