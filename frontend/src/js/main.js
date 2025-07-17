import { Notification } from "./notifications.js";
customElements.define("notification-toast", Notification)

document.querySelector('#header').innerHTML = `
<div class="logo">
    <h1>
        <a href="index.html" class="no-style">
            <span class="material-icons">
                code
            </span>
            <span>wiki</span>
            <span>DS</span>
        </a>
    </h1>
</div>

<nav id="menu">
    <ul class="list-unstyled">
        <li>
            <a href="#">
                <button type="button" class="btn-html btn-shine-effect">
                    <span class="btn-shine-effect-span">HTML</span>
                </button>
            </a>
        </li>
        <li>
            <a href="#">
                <button type="button" class="btn-css btn-shine-effect">
                    <span class="btn-shine-effect-span">CSS</span>
                </button>
            </a>
        </li>
        <li>
            <a href="#">
                <button type="button" class="btn-javascript btn-shine-effect">
                    <span class="btn-shine-effect-span">JavaScript</span>
                </button>
            </a>
        </li>
        <li>
            <a href="./adicionar.html">
                <button type="button" class="btn">
                    <span>Adicionar</span>
                </button>
            </a>
        </li>
    </ul>
</nav>
`