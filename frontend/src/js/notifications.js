import { darkenColor } from "./utils.js";

export class Notification extends HTMLElement {
    #dismissed = false

    constructor() {
        super();

        this.wrapper = "oi"
    }

    connectedCallback() {
        // console.log("Custom element added to page.");
        const shadow_dom = this.attachShadow({ mode: "open" });

        const sheet = new CSSStyleSheet()
        sheet.replaceSync(`
            @keyframes slide-in {
                0% {
                    opacity: 0;
                    transform: translateX(100%);
                }
                100% {
                    transform: translateX(0%);
                    opacity: 1;
                }
            }

            .wrapper {
                width: 380px;
                max-width: 40vw;
                border: 1px lightgray solid;
                background-color: rgb(243, 243, 243);
                color: auto;
                transition: 200ms;
                animation: 200ms slide-in;
            }
            .hoverable:hover {
                opacity: 0.8;
                transition: 200ms;
                cursor: pointer;
            }
            .notification-title {
                padding: 8px 16px;
                font-size: 1.2em;
                border-bottom: 1px solid;
                border-color: inherit;
                background-color: rgba(0, 0, 0, 0.1);
                max-width: 100%;
            }
            .notification-body {
                padding: 8px 16px;
                min-height: calc(2em + 32px);
                align-items: start;
                max-width: 100%;
            }
            .dismissed {
                opacity: 0;
                transition: 200ms;
                transform: translateX(100%);
            }
        `)

        const resetcss = new CSSStyleSheet()
        resetcss.replaceSync(`*,*::before,*::after{box-sizing:border-box}*{margin:0}@media (prefers-reduced-motion:no-preference){html{interpolate-size:allow-keywords}}body{line-height:1.5;-webkit-font-smoothing:antialiased}img,picture,video,canvas,svg{display:block;max-width:100%}input,button,textarea,select{font:inherit}p,h1,h2,h3,h4,h5,h6{overflow-wrap:break-word}p{text-wrap:pretty}h1,h2,h3,h4,h5,h6{text-wrap:balance}#root,#__next{isolation:isolate}`)

        const wrapper = document.createElement('div');
        wrapper.classList.add("wrapper", "hoverable")
        const title_text = document.createElement('p')
        title_text.textContent = this.getAttribute("title") || "unspecified"
        title_text.classList.add("notification-title")
        const body_text = document.createElement('p')
        body_text.textContent = this.getAttribute("content") || "unspecified"
        body_text.classList.add("notification-body")

        wrapper.style.backgroundColor = this.getAttribute("color") || "rgb(243, 243, 243)"
        wrapper.style.borderColor = darkenColor(this.getAttribute("color"), 30) || "lightgray"

        wrapper.appendChild(title_text)
        wrapper.appendChild(body_text)
        shadow_dom.appendChild(wrapper)

        shadow_dom.adoptedStyleSheets = [resetcss, sheet];

        this.addEventListener("click", this.dismiss)
        this.wrapper = wrapper
    }

    disconnectedCallback() {
        // console.log("Custom element removed from page.");
    }

    connectedMoveCallback() {
        // console.log("Custom element moved with moveBefore()");
    }

    adoptedCallback() {
        // console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}`);
    }

    dismiss(event) {
        if (!this.#dismissed) this.#dismissed = true
        this.wrapper.classList.add('dismissed')
        this.wrapper.classList.remove('hoverable')

        setInterval(() => {
            this.remove()
        }, 200);
    }
}
