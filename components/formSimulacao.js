const createFormSimulacao = () => {
    return `<form id="form-simulacao">

    <div class="card">

        <div class="card-body">

            <div class="row">

                <div class="col-12 mb-3 form-floating">

                    <input type="text" class="form-control" id="destinatario"
                        placeholder="Nome, CEP ou logradouro do destinatário"
                        aria-describedby="Destinatário">
                    <label for="destinatario" class="px-4">Destinatário</label>

                </div>

                <div class="col-12 mb-3 form-floating">

                    <input type="text" class="form-control" id="remetente"
                        placeholder="Nome, CEP ou logradouro do remetente"
                        aria-describedby="Remetente">
                    <label for="remetente" class="px-4">Remetente</label>

                </div>

                <div class="col-2 form-floating">

                    <input type="text" class="form-control" id="altura" placeholder="Altura (CM)"
                        aria-describedby="altura">
                    <label for="altura" class="px-4">Altura (CM)</label>

                </div>

                <div class="col-2 form-floating">

                    <input type="text" class="form-control" id="largura" placeholder="Largura (CM)"
                        aria-describedby="largura">
                    <label for="largura" class="px-4">Largura (CM)</label>

                </div>

                <div class="col-2 form-floating">

                    <input type="text" class="form-control" id="comprimento"
                        placeholder="Comprimento (CM)" aria-describedby="comprimento">
                    <label for="comprimento" class="px-4">Comprimento (CM)</label>

                </div>

                <div class="col-2 form-floating">

                    <input type="text" class="form-control" id="peso" placeholder="Peso (CM)"
                        aria-describedby="peso">
                    <label for="peso" class="px-4">Peso (CM)</label>

                </div>

                <div class="col-2 form-floating">

                    <input type="text" class="form-control" id="valor" placeholder="Valor (R$)"
                        aria-describedby="valor">
                    <label for="valor" class="px-4">Valor (R$)</label>

                </div>

                <div class="col-2">

                    <button type="submit" id="calcular-frete"
                        class="btn btn-primary h-100 w-100">
                        <i class="fa-solid fa-truck-fast me-2"></i>
                        Calcular Frete
                    </button>

                </div>

            </div>

        </div>

    </div>

</form>`;
}