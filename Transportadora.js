class Transportadora {
    constructor() {
        this._transportadora;
        this._data;
    }

     /**
     * @param {{ id: number; name: string }} objTransportadora
     */
    set setTransportadora (objTransportadora) {
        this._transportadora = objTransportadora
    }

    
     /**
     * @param {{ id: Array }} arrIds
     */
    set setIds (arrIds) {
        this._ids = arrIds
    }

    /**
     * @param {string} data
     */
    set setData(data) {
        this._data = data;
    }

    get getTransportadora () {
        return this._transportadora
    }

    get getIds () {
        return this._ids
    }

    get getData() {
        return this._data;
    }

    async retrive() {
        const data = this.getData || '';
        const ids = this.getIds || '';
        let query = ''
        let result = '';

        if (data) query = `?q=${data}`;
        
        ids.map((id, index) => {
            let concat = index == 0 ? '?' : '&';
            query += `${concat}id=${id}`
        });

        try {
            const response = await fetch(`http://localhost:3000/transportadora${query}`);
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