<template>

  <v-container class="px-4" style="max-width:900px">
    <converter-input-title @request="assignValues"/>

    <v-card style="max-width:900px" class="rounded-xl d-flex justify-space-between align-center">

      <ConverterCurrencyCard :currency="currencyFrom" :num="num1"/>
      <v-btn icon class="pa-7">
        <v-icon dark large>
          mdi-arrow-left-right
        </v-icon>
      </v-btn>
      <ConverterCurrencyCard :currency="currencyTo" :num="num2"/>

    </v-card>

  </v-container>


</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      currencyFrom: 'USD',
      currencyTo: 'RUB',
      num1: '1',
      num2: '60'
    }
  },
  methods: {
    assignValues(obj) {
      const {from, to, num} = obj
      this.currencyFrom = from.toUpperCase();
      this.currencyTo = to.toUpperCase();
      this.num1 = num;
      this.calc(from.toUpperCase(), to.toUpperCase(), num)
    },
    calc(from, to, num) {
      const sampleData = require('@@/static/sample.json');
      const val1 = sampleData.data[from].value;
      const val2 = sampleData.data[to].value / val1 * num;

      this.num2 = Number(val2).toFixed(2);
    }
  },
}
</script>
