const createBadge = props => {
    const { data, tipo } = props;
    const { id, cep, name, logradouro } = data;

    return `<span class="badge badge-pessoa rounded-pill bg-primary mt-2" style="cursor: pointer"
    data-id=${id} data-tipo="${tipo}" data-name="${name}" data-logradouro="${logradouro}"
    data-cep="${cep}">${name} | ${logradouro} - ${cep}</span>`;
}