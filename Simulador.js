const _pessoa = new Pessoa();
const _transportadora = new Transportadora();
const _volumetria = new Volumetria();
const _simulacao = new Simulacao();
const idsDestinatario = [];
let objPessoa = {};

const fetchPessoa = async (pessoaData) => {
    let result = '';

    try {

        _pessoa.setData = pessoaData;
        result = await _pessoa.retrive();

    } catch (err) {
        result = err;
    }

    return result;
}

const fetchVolumetria = async (objMedidas) => {
    let result = '';

    try {

        _volumetria.setVolumetria = objMedidas;
        result = await _volumetria.retrive();

    } catch (err) {
        result = err;
    }

    return result;
}

const fetchTransportadora = async (idsTransportadoras) => {
    let result = '';

    try {

        _transportadora.setIds = idsTransportadoras;
        result = await _transportadora.retrive();

    } catch (err) {
        result = err;
    }

    return result;
}

const fetchInsertSimulacao = async (objSimulacao) => {
    let result = '';

    try {

        _simulacao.setSimulacao = objSimulacao;
        result = await _simulacao.insert();

    } catch (err) {
        result = err;
    }

    return result;
}

const showCardCalculo = volumetria => {
    const card = $('.card-calculo-frete');
    const formSimulacao = $('#form-simulacao');
    const cardText = card.find('.card-text');

    const infoDestinatario = `Destinatario: ${objPessoa['destinatario'].name} - ${objPessoa['destinatario'].cep}
         - ${objPessoa['destinatario'].logradouro}`;
    const infoRemetente = `Remetente: ${objPessoa['remetente'].name} - ${objPessoa['remetente'].cep}
         - ${objPessoa['remetente'].logradouro}`;
    const infoMedidas = `Altura: ${volumetria.json[0].altura} - Largura: ${volumetria.json[0].largura}
         - Comprimento: ${volumetria.json[0].comprimento} - Peso: ${volumetria.json[0].peso} - Valor: ${volumetria.json[0].valor}`;


    cardText.html(`${infoDestinatario}<br>${infoRemetente}<br>${infoMedidas}`);

    formSimulacao.fadeOut('slow', _ => card.fadeIn('slow'));

}

const showCardTransportadoras = allTransportadoras => {
    const card = $('.card-transportadoras');
    const cardText = card.find('.card-text');

    const arr_transportadoras = allTransportadoras.json;
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

const removeBadge = (badge) => {
    badge.fadeOut('slow', function () {
        $(this).remove();
    });
}

$(document).ready(() => {

    $('.accordion-body').append(createFormSimulacao());

    $('body').on('click', '#calcular-frete', async e => {
        e.preventDefault();

        const destinatario = $('#destinatario').val();
        const remetente = $('#remetente').val();
        const altura = Number($('#altura').val());
        const largura = Number($('#largura').val());
        const comprimento = Number($('#comprimento').val());
        const peso = Number($('#peso').val());
        const valor = Number($('#valor').val());

        const objPessoas = { destinatario, remetente };
        const objMedidas = { altura, largura, comprimento, peso, valor };

        const isInvalid = validateForm(objPessoas);

        if (!isInvalid) {
            try {
                const volumetria = await fetchVolumetria(objMedidas);
                const idsTransportadoras = [];
                const volumeJson = volumetria.json;

                volumeJson.map(volume => {
                    idsTransportadoras.push(volume.idTransp);
                });

                const allTransportadoras = await fetchTransportadora(idsTransportadoras);

                showCardCalculo(volumetria);

                showCardTransportadoras(allTransportadoras);
            } catch (err) {
                console.log(err)
            }
        }

    });

    $('body').on('keyup', '#destinatario, #remetente', async e => {
        let pessoa = e.target.value;

        if (pessoa.split(' '))
            pessoa = pessoa.split(' ')[0];

        const tipo = $(e.target).attr('id');

        if (pessoa.length > 0) {
            try {

                const destinatario = await fetchPessoa(pessoa);
                const { status, json = null } = destinatario;

                if (status === 200) {

                    json.map(data => {
                        const { id } = data;

                        if (!idsDestinatario.includes(id)) {

                            $(e.target).after(createBadge({ data, tipo }));

                            idsDestinatario.push(id);
                        }

                    });

                }

            } catch (err) {
                console.log(err)
            }
        } else {
            removeBadge($(`.badge-pessoa[data-tipo="${tipo}"]`));
        }

    });

    $('body').on('click', '.badge-pessoa', e => {
        const badge = $(e.target);
        const pessoaTipo = badge.attr('data-tipo');
        const closestInput = $(`#${pessoaTipo}`);

        objPessoa[pessoaTipo] = {
            id: badge.attr('data-id'),
            name: badge.attr('data-name'),
            logradouro: badge.attr('data-logradouro'),
            cep: badge.attr('data-cep'),
        }

        closestInput.val(badge.text());

        removeBadge(badge);
    });

    $('#btn-voltar').on('click', () => {
        removeBadge($('.badge'));

        $('.card-transportadoras').fadeOut('slow', () => {
            $('.card-transportadora-each').remove();

            $('.card-calculo-frete').fadeOut('slow', function () {
                $(this).find('.card-text').text('');

                $('#form-simulacao').fadeIn('slow');
            })
        })
    });

    $('body').on('click', '.card-transportadora-each', async (e) => {
        const self = $(e.target);
        const idTransp = $(e.target).attr('data-id');
        const { destinatario, remetente } = objPessoa;

        const objSimulacao = {
            idDestinatario: destinatario.id,
            idRemetente: remetente.id,
            idTransp
        };

        fetchInsertSimulacao();

        const simulacao = await fetchInsertSimulacao(objSimulacao);
        const { status, json = null } = simulacao;

        if(status === 200) {
            createToast();
        }

    });

});