const createTransportadora = props => {
    const { id, name, tempo, frete } = props;

    return `
    <a href="${id}">
        <div class="card mb-2">
            <div class="card-body">
                <div class="row justify-content-between">
                    <div class="z-auto">
                        ${name}
                    </div>
                    <div class="col-auto">
                        ${isFastIcon(tempo)} ${tempo} dias
                    </div>
                    <div class="col-auto">
                        R$ ${frete}
                    </div>
                    <div class="col-auto">
                        <i class="fa-solid fa-truck-fast"></i>
                    </div>
                </div>
            </div>
        </div>
    </a>`;
}

const isFastIcon = tempo  => {
    if(tempo < 5) return '<i class="fa-solid fa-bolt"></i>'

    return '';
}