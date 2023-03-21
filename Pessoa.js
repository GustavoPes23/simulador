class Pessoa {
    constructor() {
        this._pessoa;
        this._data;
    }

    /**
     * @param {{ id: number; name: string; cep: string; logradouro: string; }} objPessoa
     */
    set setPessoa(objPessoa) {
        this._pessoa = objPessoa
    }

    /**
     * @param {number} id
     */
    set setId(id) {
        this._pessoa.id = id;
    }

    /**
     * @param {string} name
     */
    set setName(name) {
        this._pessoa.name = name;
    }

    /**
     * @param {string} cep
     */
    set setCep(cep) {
        this._pessoa.cep = cep;
    }

    /**
     * @param {string} logradouro
     */
    set setLogradouro(logradouro) {
        this._pessoa.logradouro = logradouro;
    }

    /**
     * @param {string} data
     */
    set setData(data) {
        this._data = data;
    }

    get getPessoa() {
        return this._pessoa
    }

    get getData() {
        return this._data;
    }

    async retrive() {
        const data = this.getData || '';
        let query = ''
        let result = '';

        if (data) query = `?q=${data}`;

        try {
            const response = await fetch(`http://localhost:3000/pessoa${query}`);
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
}
