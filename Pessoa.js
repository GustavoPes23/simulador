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

    retrive() {
        // const { name = undefined, cep = null, logradouro = null } = this._pessoa;
        const data = this._data || '';

        let query = ''

        if (this._pessoa?.name) query = this._pessoa?.name;
        if (this._pessoa?.cep) query = this._pessoa?.cep;
        if (this._pessoa?.logradouro) query = this._pessoa?.logradouro;
        if (data) query = data;

        let result = '';

        fetch(`http://localhost:3000/pessoa`, {
            method: "GET",
        })
        .then(result => result.json())
        .then(data => {
            return data;
        })
    }
}


const pessoa = new Pessoa();
pessoa.setData = 'Gustavo';
console.log(pessoa.retrive())