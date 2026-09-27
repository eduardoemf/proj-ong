const CHAVE_VOLUNTARIOS = 'voluntarios';

const mascaras = {
    cpf(valor) {
        const digitos = valor.replace(/\D/g, '').slice(0, 11);
        if (digitos.length <= 3) return digitos;
        if (digitos.length <= 6) return `${digitos.slice(0, 3)}.${digitos.slice(3)}`;
        if (digitos.length <= 9) {
            return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6)}`;
        }
        return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9)}`;
    },
    telefone(valor) {
        const digitos = valor.replace(/\D/g, '').slice(0, 11);
        if (digitos.length <= 2) return digitos ? `(${digitos}` : '';
        return digitos.replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    },
    cep(valor) {
        return valor.replace(/\D/g, '').slice(0, 8)
            .replace(/(\d{5})(\d)/, '$1-$2');
    }
};

export function aplicarMascara(campo) {
    const mascara = mascaras[campo.id];
    if (mascara) campo.value = mascara(campo.value);
}

export function atualizarValidacaoCampo(campo) {
    const elementoErro = document.getElementById(campo.getAttribute('aria-describedby'));
    if (campo.validity.valid) {
        campo.removeAttribute('aria-invalid');
        if (elementoErro) elementoErro.textContent = '';
        return;
    }

    campo.setAttribute('aria-invalid', 'true');
    if (elementoErro) elementoErro.textContent = campo.validationMessage;
}

export function atualizarEstadoEnvio(formulario) {
    const botaoSubmit = formulario.querySelector('button[type="submit"]');
    if (botaoSubmit) botaoSubmit.disabled = !formulario.checkValidity();
}

export function obterVoluntarios() {
    try {
        const voluntarios = JSON.parse(window.localStorage.getItem(CHAVE_VOLUNTARIOS)) || [];
        return Array.isArray(voluntarios) ? voluntarios : [];
    } catch {
        return [];
    }
}

export function tratarEnvioFormulario(evento) {
    const formulario = evento.target.closest('[data-volunteer-form]');
    if (!formulario) return false;

    evento.preventDefault();
    if (!formulario.checkValidity()) return false;

    const novoVoluntario = {
        nome: formulario.elements.nome.value,
        cpf: formulario.elements.cpf.value,
        nascimento: formulario.elements.nascimento.value,
        email: formulario.elements.email.value,
        telefone: formulario.elements.telefone.value,
        cep: formulario.elements.cep.value
    };
    const voluntarios = obterVoluntarios();
    voluntarios.push(novoVoluntario);

    try {
        window.localStorage.setItem(CHAVE_VOLUNTARIOS, JSON.stringify(voluntarios));
    } catch {
        window.Swal?.fire({
            title: 'Não foi possível salvar',
            text: 'Verifique as permissões de armazenamento do navegador e tente novamente.',
            icon: 'error',
            confirmButtonText: 'Fechar'
        });
        return false;
    }

    formulario.reset();
    atualizarEstadoEnvio(formulario);
    window.Swal?.fire({
        title: 'Cadastro Concluído!',
        text: 'Obrigado por se voluntariar. Entraremos em contato em breve.',
        icon: 'success',
        confirmButtonText: 'Fechar',
        confirmButtonColor: '#198754'
    });
    return true;
}
