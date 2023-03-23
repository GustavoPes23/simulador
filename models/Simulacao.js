class Simulacao {
    constructor() {
        this._simulacao;
    }
    
    /**
     * @param {{ idDestinatario: number; idRemetente: number; idTransp: number; }} objSimulacao
     */
    set setSimulacao(objSimulacao) {
        this._simulacao = objSimulacao
    }

    get getSimulacao () {
        return this._simulacao
    }
    
    async insert() {
        const simulacao = this.getSimulacao;
        const objSimulacao = {
            id: this.getRandomId(),
            ...simulacao
        };

        let result = '';

        try {
            const response = await fetch(`http://localhost:3000/simulacao/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(objSimulacao)
            });
            const json = await response.json();

            result = {
                json,
                status: 200
            };

        } catch (err) {

            result = {
                err,
                status: 500
            };

        }       

        return result;
    }

    getRandomId() {
        return Math.random();
    }
  
}