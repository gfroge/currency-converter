<template>

  <v-container class="px-4" style="max-width:900px">

    <converter-input-title @request="calc"/>

    <v-card style="max-width:900px" class="rounded-xl d-flex justify-space-between align-center">

      <ConverterCurrencyCard :currency="currencyFrom" :num="num"/>
      <v-btn icon class="pa-7">
        <v-icon dark large>
          mdi-arrow-left-right
        </v-icon>
      </v-btn>
      <ConverterCurrencyCard :currency="currencyTo"/>

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
      num: 0
    }
  },
  methods: {
    calc(obj) {
      const {from, to, num} = obj
      this.currencyFrom = from;
      this.currencyTo = to;
      this.num = Number(num);
      console.log(from,to,num);
    }
  },
}
</script>
