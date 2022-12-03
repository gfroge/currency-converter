export const state = () => ({
    converterInput: {
        num: '',
        from: '',
        to:'',
    },
    converterConvert: {
        from: 'USD',
        fromSum: '1',
        to: 'RUB',
        toSum:'60'
    },
    ratesBase: 'USD'
  })
  
  export const getters = {
    // getCounter(state) {
    //   return state.counter
    // }
  }
  
  export const mutations = {
    setConverterInput(state,{num,from,to}){
        state.converterInput.num = num;
        state.converterInput.from = from;
        state.converterInput.to = to;
    },
    setConverterConvert(state,{from, fromSum, to,toSum}){
        state.converterConvert.from = from;
        state.converterConvert.fromSum = fromSum;
        state.converterConvert.to = to;
        state.converterConvert.toSum = toSum;
    },
    setRatesBase(state,base){
        state.ratesBase = base;
    }
  }
  
  export const actions = {
    // async fetchCounter({ state }) {
    //   // make request
    //   const res = { data: 10 };
    //   state.counter = res.data;
    //   return res.data;
    // }
  }
  