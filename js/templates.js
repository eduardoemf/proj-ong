import fotoInstitucional400 from '../imgs/foto_institucional-400w.webp';
import fotoInstitucional800 from '../imgs/foto_institucional-800w.webp';
import fotoInstitucional1200 from '../imgs/foto_institucional-1200w.webp';

export const projetosDados = [
    {
        tag: 'Projeto Ativo',
        classeTag: 'badge-primary',
        titulo: 'Apoio Educacional',
        descricao: 'Atuação direta no reforço escolar para crianças e adolescentes da rede pública.'
    },
    {
        tag: 'Ação Urgente',
        classeTag: 'badge-warning',
        titulo: 'Distribuição de Alimentos',
        descricao: 'Apoio na logística, triagem e entrega de cestas básicas em comunidades cadastradas.'
    },
    {
        tag: 'Projeto Ativo',
        classeTag: 'badge-success',
        titulo: 'Horta Comunitária',
        descricao: 'Cultivo coletivo de alimentos frescos para fortalecer a segurança alimentar local.'
    }
];

export function gerarCardsProjetos() {
    return projetosDados.map(projeto => `
        <article class="card">
            <div>
                <span class="badge ${projeto.classeTag}">${projeto.tag}</span>
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
            </div>
            <a href="/cadastro" class="btn" data-link style="margin-top: 1rem;">Quero ser Voluntário</a>
        </article>
    `).join('');
}

function gerarFormularioCadastro() {
    return `
        <section class="full-width">
            <h1>Cadastro de Voluntários</h1>
            <p>Preencha os dados abaixo com atenção para se tornar um voluntário.</p>
        </section>
        <form action="#" method="POST" class="full-width card" data-volunteer-form>
            <fieldset>
                <legend>Dados Pessoais</legend>
                <div class="form-group">
                    <label for="nome">Nome completo:</label>
                    <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo" aria-describedby="erro-nome" required>
                    <span class="form-error" id="erro-nome"></span>
                </div>
                <div class="form-group">
                    <label for="cpf">CPF (com pontuação):</label>
                    <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" maxlength="14" aria-describedby="erro-cpf" required title="Formato exigido: 000.000.000-00" inputmode="numeric">
                    <span class="form-error" id="erro-cpf"></span>
                </div>
                <div class="form-group">
                    <label for="nascimento">Data de Nascimento:</label>
                    <input type="date" id="nascimento" name="nascimento" aria-describedby="erro-nascimento" required>
                    <span class="form-error" id="erro-nascimento"></span>
                </div>
            </fieldset>
            <fieldset>
                <legend>Endereço e Comunicação</legend>
                <div class="form-group">
                    <label for="email">E-mail:</label>
                    <input type="email" id="email" name="email" placeholder="exemplo@email.com" aria-describedby="erro-email" required>
                    <span class="form-error" id="erro-email"></span>
                </div>
                <div class="form-group">
                    <label for="telefone">Telefone (com DDD e traço):</label>
                    <input type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" pattern="\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}" maxlength="15" aria-describedby="erro-telefone" required title="Formato exigido: (99) 99999-9999" inputmode="numeric">
                    <span class="form-error" id="erro-telefone"></span>
                </div>
                <div class="form-group">
                    <label for="cep">CEP (com traço):</label>
                    <input type="text" id="cep" name="cep" placeholder="00000-000" pattern="\\d{5}-\\d{3}" maxlength="9" aria-describedby="erro-cep" required title="Formato exigido: 00000-000" inputmode="numeric">
                    <span class="form-error" id="erro-cep"></span>
                </div>
            </fieldset>
            <button type="submit" class="btn" disabled>Enviar Cadastro</button>
        </form>
        <section class="full-width" aria-labelledby="titulo-lista-voluntarios">
            <h2 id="titulo-lista-voluntarios">Voluntários cadastrados</h2>
            <div id="lista-voluntarios"></div>
        </section>
    `;
}

export const rotas = {
    '/': `<section class="full-width">
        <h1>Bem-vindo(a) à ONG Esperança</h1>
        <p>Atuamos no terceiro setor para promover a inclusão social e garantir direitos básicos a comunidades em vulnerabilidade.</p>
    </section>
    <section class="half-width card">
        <h2>Nossa Missão</h2>
        <p>Acreditamos na transformação por meio do voluntariado estruturado.</p>
        <img src="${fotoInstitucional800}" srcset="${fotoInstitucional400} 400w, ${fotoInstitucional800} 800w, ${fotoInstitucional1200} 1200w" sizes="(max-width: 600px) 100vw, 50vw" alt="Grupo de voluntários sorrindo enquanto organizam caixas de doação">
    </section>
    <section class="half-width card">
        <h2>Fale Conosco</h2>
        <address>
            <p><strong>E-mail:</strong> <a href="mailto:contato@ongesperanca.org.br">contato@ongesperanca.org.br</a></p>
            <p><strong>Telefone:</strong> <a href="tel:+5511999999999">(11) 99999-9999</a></p>
            <p><strong>Endereço:</strong> Rua da Solidariedade, 123, Bairro - Cidade/UF</p>
        </address>
    </section>`,
    '/projetos': '<section class="full-width"><h1>Projetos Sociais</h1><p>Conheça nossas frentes de atuação e saiba como contribuir ativamente para a nossa missão.</p></section><section class="full-width"><h2>Frentes de Voluntariado</h2><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1rem;">' + gerarCardsProjetos() + '</div></section>',
    '/cadastro': gerarFormularioCadastro()
};

export function renderizarListaVoluntarios(voluntarios = []) {
    const contenedor = document.querySelector('#lista-voluntarios');
    if (!contenedor) return;

    const escaparHTML = valor => String(valor ?? '').replace(/[&<>"']/g, caractere => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[caractere]);

    contenedor.innerHTML = voluntarios.length
        ? `<ul>${voluntarios.map(voluntario => `
            <li><strong>${escaparHTML(voluntario.nome)}</strong> - ${escaparHTML(voluntario.email)}</li>
        `).join('')}</ul>`
        : '<p>Nenhum voluntário cadastrado.</p>';
}
