const _pessoa = new Pessoa();
const _transportadora = new Transportadora();
const _medidas = new Medidas();

const fetchDestinatario = async destinatario => {
    return new Promise((resolve, reject) => {
        const pessoaDestinatario = _pessoa.getDestinatario(destinatario);

        if (pessoaDestinatario.success) resolve(pessoaDestinatario)
        else {
            const { status } = pessoaDestinatario;

            reject({
                pessoa: 'destinatario',
                status
            });
        }

    });
}

const fetchRemetente = async remetente => {
    return new Promise((resolve, reject) => {
        const pessoaRemetente = _remetente.getRemetente(remetente);

        if (pessoaRemetente.success) resolve(pessoaRemetente)
        else {

            const { status } = pessoaRemetente;

            reject({
                pessoa: 'remetente',
                status
            });
        }

    });
}

const fetchSetMedidas = async objMedidas => {
    return new Promise((resolve, reject) => {
        const medidas = _medidas.setMedidas(objMedidas);

        if (medidas.success) resolve(medidas);
        else reject(medidas);

    });
}

const fetchGetMedidas = async _ => {
    return new Promise((resolve, reject) => {
        const medidas = _medidas.getMedidas();

        if (medidas.success) resolve(medidas);
        else reject(medidas);

    });
}

const fetchAllTransportadoras = async _ => {
    return new Promise((resolve, reject) => {
        const transportadoras = _transportadora.getAllTransportadora();

        if (transportadoras.success) resolve({ transportadoras });
        else reject(transportadoras.status);

    });
}

const calculaFrete = async (objPessoas, objMedidas) => {
    const { destinatario, remetente } = objPessoas;
    const medidas = objMedidas;

    try {
        const dataDestinatario = await fetchDestinatario(destinatario);
        const dataRemetente = await fetchRemetente(remetente);
        const { success } = await fetchSetMedidas(medidas);

        console.log(await fetchGetMedidas())

        const dataMedidas = success ? await fetchGetMedidas() : '';        

        return ({ dataDestinatario, dataRemetente, dataMedidas })
    } catch (err) {
        console.log(err)
    }

}

const showCardCalculo = calculo => {
    const card = $('.card-calculo-frete');
    const formSimulacao = $('#form-simulacao');
    const cardText = card.find('.card-text');
    const { dataDestinatario, dataRemetente, dataMedidas } = calculo;

    const infoDestinatario = `Destinatario: ${dataDestinatario.pessoa.name} - ${dataDestinatario.pessoa.cep}
         - ${dataDestinatario.pessoa.logradouro}`;
    const infoRemetente = `Remetente: ${dataRemetente.pessoa.name} - ${dataRemetente.pessoa.cep}
         - ${dataRemetente.pessoa.logradouro}`;
    const infoMedidas = `Altura: ${dataMedidas.medidas.altura} - Largura: ${dataMedidas.medidas.largura}
         - Comprimento: ${dataMedidas.medidas.comprimento} - Peso: ${dataMedidas.medidas.peso} - Valor: ${dataMedidas.medidas.valor}`;


    cardText.html(`${infoDestinatario}<br>${infoRemetente}<br>${infoMedidas}`);

    formSimulacao.fadeOut('slow', _ => card.fadeIn('slow'));

}

const showCardTransportadoras = allTransportadoras => {
    const card = $('.card-transportadoras');
    const cardText = card.find('.card-text');

    const arr_transportadoras = allTransportadoras.transportadoras.transportadora;
    let infoTransportadora = '';

    arr_transportadoras.map(transportadora => {
        infoTransportadora += createTransportadora(transportadora);
    });

    cardText.html(infoTransportadora);

    card.fadeIn('slow');
}

const elementInvalid = message => {
    return `<div class="invalid-feedback">${message}</div>`
}

const validateForm = objPessoas => {
    const { destinatario, remetente } = objPessoas;
    let isInvalid = false;

    if (destinatario == 0) {
        const elementDestinatario = $('#destinatario');
        elementDestinatario.addClass('is-invalid');

        elementDestinatario.after(elementInvalid('Campo vazio'));

        isInvalid = true;
    } else if (remetente == 0) {
        const elementRemetente = $('#remetente');
        elementRemetente.addClass('is-invalid');

        elementRemetente.after(elementInvalid('Campo vazio'));

        isInvalid = true;
    }

    return isInvalid;
}

$('#calcular-frete').on('click', async e => {
    e.preventDefault();

    const destinatario = $('#destinatario').val();
    const remetente = $('#remetente').val();
    const altura = $('#altura').val();
    const largura = $('#largura').val();
    const comprimento = $('#comprimento').val();
    const peso = $('#peso').val();
    const valor = $('#valor').val();

    const objPessoas = { destinatario, remetente };
    const objMedidas = { altura, largura, comprimento, peso, valor };

    const isInvalid = validateForm(objPessoas);

    if (!isInvalid) {
        try {
            const calculo = await calculaFrete(objPessoas, objMedidas);
            const allTransportadoras = await fetchAllTransportadoras();

            showCardCalculo(calculo);

            showCardTransportadoras(allTransportadoras);
        } catch (err) {
            console.log(err)
        }
    }

});