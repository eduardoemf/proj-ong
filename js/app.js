import { renderizarListaVoluntarios } from './templates.js';
import { navegarPara, renderizarConteudo } from './router.js';
import {
    aplicarMascara,
    atualizarValidacaoCampo,
    atualizarEstadoEnvio,
    obterVoluntarios,
    tratarEnvioFormulario
} from './formHandler.js';

const CHAVE_TEMA = 'tema';

function restaurarTemaSalvo() {
    try {
        const temaSalvo = window.localStorage.getItem(CHAVE_TEMA);
        if (temaSalvo === 'light' || temaSalvo === 'dark') {
            document.documentElement.setAttribute('data-theme', temaSalvo);
        }
    } catch {}
}

restaurarTemaSalvo();

function renderizarRotaAtual(caminho) {
    renderizarConteudo(caminho);
    renderizarListaVoluntarios(obterVoluntarios());

    const formulario = document.querySelector('[data-volunteer-form]');
    if (formulario) atualizarEstadoEnvio(formulario);
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarRotaAtual(window.location.pathname);

    document.body.addEventListener('click', evento => {
        const link = evento.target.closest('[data-link]');
        if (link) {
            evento.preventDefault();
            navegarPara(link.getAttribute('href'));
            renderizarListaVoluntarios(obterVoluntarios());

            const formulario = document.querySelector('[data-volunteer-form]');
            if (formulario) atualizarEstadoEnvio(formulario);

            const menu = document.getElementById(
                document.querySelector('.menu-toggle')?.getAttribute('aria-controls')
            );
            const listaNavegacao = menu?.querySelector('ul.nav-list');
            if (listaNavegacao) {
                listaNavegacao.classList.remove('active');
                document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
            }
            return;
        }

        const botaoMenu = evento.target.closest('button.menu-toggle');
        if (botaoMenu) {
            const menu = document.getElementById(botaoMenu.getAttribute('aria-controls'));
            const listaNavegacao = menu?.querySelector('ul.nav-list');
            if (listaNavegacao) {
                const menuAtivo = listaNavegacao.classList.toggle('active');
                botaoMenu.setAttribute('aria-expanded', String(menuAtivo));
            }
        }

        const botaoTema = evento.target.closest('#theme-toggle');
        if (botaoTema) {
            const elementoRaiz = document.documentElement;
            const temaAtual = elementoRaiz.getAttribute('data-theme')
                || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

            elementoRaiz.setAttribute('data-theme', novoTema);
            try {
                window.localStorage.setItem(CHAVE_TEMA, novoTema);
            } catch {}
        }
    });

    document.body.addEventListener('input', evento => {
        const campo = evento.target;
        if (!(campo instanceof HTMLInputElement)) return;

        const formulario = campo.closest('[data-volunteer-form]');
        if (!formulario) return;

        aplicarMascara(campo);
        atualizarValidacaoCampo(campo);
        atualizarEstadoEnvio(formulario);
    });

    document.body.addEventListener('invalid', evento => {
        if (evento.target instanceof HTMLInputElement) {
            atualizarValidacaoCampo(evento.target);
        }
    }, true);

    document.body.addEventListener('submit', evento => {
        if (tratarEnvioFormulario(evento)) {
            renderizarListaVoluntarios(obterVoluntarios());
        }
    });

    window.addEventListener('popstate', () => {
        renderizarRotaAtual(window.location.pathname);
    });
});
