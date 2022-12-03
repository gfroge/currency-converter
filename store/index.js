export const state = () => ({
  converterInput: {
    num: '',
    from: '',
    to: '',
  },
  converterConvert: {
    from: 'AED',
    fromSum: '1',
    to: 'ALL',
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
  setlatestRatesConverter(state, json) {
    state.latestRatesConverter.jsonData = json
  },
  setlatestRates(state, json, base=false) {
    state.latestRates.jsonData = json
    if(base) state.latestRates.base = base
  },
  sethistoricalRates(state, json) {
    state.historicalRates.jsonData = json
  },
}

export const actions = {
  // async fetchCounter({ state }) {
  //   // make request
  //   const res = { data: 10 };
  //   state.counter = res.data;
  //   return res.data;
  // }
  // ! remove before prod
  getSampleData({ commit }) {
    const sampleData = require('@@/static/sample.json')
    const sampleHistoricalData = require('@@/static/historical.sample.json')
    commit('setlatestRates', sampleData)
    commit('setlatestRatesConverter', sampleData)
    commit('sethistoricalRates', sampleHistoricalData)
  },
  // fetch latest rates, then historical for graph
}
