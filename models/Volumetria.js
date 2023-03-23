class Volumetria {
    constructor() {
        this._volumetria;
        this._data;
    }

    /**
    * @param {{ altura: number; largura: number; comprimento: number; peso: number; valor: number; }} objVolumetria
    */
    set setVolumetria(objVolumetria) {
        this._volumetria = objVolumetria
    }

    /**
     * @param {string} data
     */
    set setData(data) {
        this._data = data;
    }

    get getVolumetria() {
        return this._volumetria
    }

    get getData() {
        return this._data;
    }

    async retrive() {
        const volumetria = this.getVolumetria || '';
        let query = ''
        let result = '';

        if (volumetria) {
            const { altura, largura, comprimento, peso, valor } = volumetria;

            query = `?altura=${altura}&largura=${largura}&comprimento=${comprimento}&peso=${peso}&valor=${valor}`;

        }

        try {
            const response = await fetch(`http://localhost:3000/volumetria${query}`, {
                method: 'GET'
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
}