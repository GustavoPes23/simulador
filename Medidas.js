class Volumetria {
    constructor() {
        this._volumetria;
    }

    /**
     * @param {{ id: number; altura: number; largura: number; comprimento: number; peso: number; valor: number; }} objVolumetria
     */
    set setVolumetria (objVolumetria) {
        this._volumetria = objVolumetria
    }

    get getVolumetria() {
        return this._volumetria
    }
}

class Medidas extends Volumetria {
    constructor() {
        super();
    }

    setMedidas (objMedidas) {
        let result = '';

        try {
            const randomId = this.getRandomId();

            this.setVolumetria = {
                id: randomId,
                ...objMedidas
            }

            result = {
                status: 200,
                success: true,
            }
        } catch (err) {
            result = {
                err,
                status: 500,
                success: false,
            }
        }

        return result;
        
    }

    getRandomId() {
        return Math.random();
    }
  
    getMedidas () {
        const medidas = this.getVolumetria;
        let result = '';

        try {
            result = {
                medidas,
                status: 200,
                success: true
            };
        } catch (err) {
            result = {
                status: 500,
                success: false
            };
        }

        return result;
    }
  
}