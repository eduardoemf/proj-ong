import { rotas } from './templates.js';

function normalizarCaminho(caminho) {
    const segmento = new URL(caminho, window.location.href).pathname
        .split('/')
        .filter(Boolean)
        .pop() || '';
    const rota = segmento.replace(/\.html?$/i, '');

    return !rota || rota.toLowerCase() === 'index' ? '/' : `/${rota}`;
}

export function renderizarConteudo(caminho) {
    const conteudoPrincipal = document.querySelector('main');
    if (!conteudoPrincipal) return;

    const rotaAtual = normalizarCaminho(caminho);
    conteudoPrincipal.innerHTML = rotas[rotaAtual] || '<h1>404 - Página não encontrada</h1>';
}

export function navegarPara(caminho) {
    window.history.pushState({}, '', caminho);
    renderizarConteudo(caminho);
}
