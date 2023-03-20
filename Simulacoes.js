class Simulacoes {
    constructor() {
        this._simulacoes;
    }

    get getTransportadora () {
        return this._simulacoes
    }

    getSimulacaoById (valor) {
        const objTransportadora = {
            id: 1,
            name: 'Correios',
            frete: 12.9,
            tempo: '12 dias'
        }
  
        this.setTransportadora = objTransportadora;

        const transportadora = this.getTransportadora;
        let result = '';

        try {
            if(Object.values(transportadora).includes(valor)) {

                result = {
                    transportadora,
                    status: 200,
                    success: true
                };

            } else {

                result = {
                    status: 404,
                    success: false
                };

            }
        } catch (err) {
            result = {
                err,
                success: false
            };
        }

        return result;
    }

    getAllTransportadora () {
        const randomIdCorreios = this.getRandomId();
        const randomIdLoggi = this.getRandomId();

        const objTransportadora = [
            {
                id: randomIdCorreios,
                name: 'Correios',
                frete: 12.9,
                tempo: 4
            },
            {
                id: randomIdLoggi,
                name: 'Loggi',
                frete: 11,
                tempo: 10
            }
        ]
  
        this.setTransportadora = objTransportadora;

        const transportadora = this.getTransportadora;
        let result = '';

        try {
            result = {
                transportadora,
                status: 200,
                success: true
            };
        } catch (err) {
            result = {
                err,
                success: false
            };
        }

        return result;
    }

    getRandomId() {
        return Math.random();
    }
  
}