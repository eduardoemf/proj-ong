import { renderizarListaVoluntarios } from './templates.js';
import { navegarPara, renderizarConteudo } from './router.js';
import {
    aplicarMascara,
    atualizarValidacaoCampo,
    atualizarEstadoEnvio,
    obterVoluntarios,
    tratarEnvioFormulario
} from './formHandler.js';

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
