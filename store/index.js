export const state = () => ({
    converterInput: {
        num: '',
        from: '',
        to: '',
    },
    converterConvert: {
        from: 'USD',
        fromSum: '1',
        to: 'RUB',
        toSum: '',
    },
    ratesBase: 'USD',
    latestRatesConverter: {
        base: 'USD',
        jsonData: null,
    },
    latestRates: {
        base: 'USD',
        jsonData: null,
    },
    historicalRates: {
        base: 'USD',
        jsonData: null,
    },
})

export const getters = {

}

export const mutations = {
    setConverterInput(state, { num, from, to }) {
        state.converterInput.num = num
        state.converterInput.from = from
        state.converterInput.to = to
    },
    setConverterConvert(state, { from, fromSum, to, toSum }) {
        state.converterConvert.from = from
        state.converterConvert.fromSum = fromSum
        state.converterConvert.to = to
        state.converterConvert.toSum = toSum
    },
    setlatestRatesConverter(state, json, base = false) {
        state.latestRatesConverter.jsonData = json
        if (base) state.latestRatesConverter.base = base
    },
    setlatestRates(state, json, base = false) {
        state.latestRates.jsonData = json
        if (base) state.latestRates.base = base
    },
    sethistoricalRates(state, json) {
        state.historicalRates.jsonData = json
    },
    pushhistoricalRates(state, obj) {
        state.historicalRates.jsonData.data.push(obj)
    },
    setHistoricalBase(state, newBase){
        state.historicalRates.base = newBase
    }
}

export const actions = {
    async getInitialData({commit}) {
        const url = 'https://api.currencyapi.com/v3/latest?apikey=mECXec0IwIt52Ik75EuwAHKMDCfMQNEB9oHEgi23'
        const options = {
            method: 'GET', 
        };

        const latestRatesResponse = await fetch(url, options);
        if (latestRatesResponse.ok) {
            const json = await latestRatesResponse.json();
            commit('setlatestRates', json)
            commit('setlatestRatesConverter', json)
        } else {
            alert("Ошибка API latestRates: " + latestRatesResponse.status);
        }

    },

    async getInitialHistorical({commit}){
        commit('sethistoricalRates', {"data":[]});
        const options = {
            method: 'GET',
        };
        for(let i=1; i<=12; i++){
            const url = `https://api.currencybeacon.com/v1/historical?base=USD&date=2022-${i>=10?i:`0${i}`}-01&api_key=a54189304372aeabe2941ffaecf3ea97`
            const ratesResponse = await fetch(url, options);
            if (ratesResponse.ok) {
                const json = await ratesResponse.json();
                commit('pushhistoricalRates', json.response);
            } else {
                console.log("Ошибка API latestRates: " + ratesResponse.status);
            }
        }

    },

    async getHistoricalData({commit},newBase){
        commit('sethistoricalRates', {"data":[]});
        const options = {
            method: 'GET',
        };
        for(let i=1; i<=12; i++){
            const url = `https://api.currencybeacon.com/v1/historical?base=${newBase.trim()}&date=2022-${i>=10?i:`0${i}`}-01&api_key=a54189304372aeabe2941ffaecf3ea97`
            const ratesResponse = await fetch(url, options);
            if (ratesResponse.ok) {
                const json = await ratesResponse.json();
                commit('pushhistoricalRates', json.response);
            } else {
                console.log("Ошибка API latestRates: " + ratesResponse.status);
            }
        }
    }
}
