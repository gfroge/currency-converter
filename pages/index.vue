<template>
  <v-container class="px-4" style="max-width: 900px">
    <converter-input-title @request="assignValues" @snack="snackbar = true" />

    <ValidationObserver ref="observer">
      <v-card class="convert-card mb-4 rounded-xl d-flex justify-space-between align-center flex-column flex-md-row">
        <ConverterCurrencyCard :currency="currencyFrom" :num="num1" @valueChange="setNewValue($event, 1)" />
        <div class="">
          <v-btn icon class="pa-7 button-to" @click="convertManully('right')">
            <v-icon dark large> mdi-arrow-right </v-icon>
          </v-btn>
          <v-btn icon class="pa-7 button-to" @click="convertManully('left')">
            <v-icon dark large> mdi-arrow-left </v-icon>
          </v-btn>
        </div>
        <ConverterCurrencyCard :currency="currencyTo" :num="num2" @valueChange="setNewValue($event, 2)" />
      </v-card>
    </ValidationObserver>

    <v-snackbar v-model="snackbar">
      {{ text }}
      <template #action="{ attrs }">
        <v-btn color="error" text v-bind="attrs" @click="snackbar = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>

    <CurrencyGraph v-if="chartData" :currencyData="chartData" />
    <v-skeleton-loader v-if="!chartData" class="mx-auto rounded-xl" type="image"></v-skeleton-loader>
    

  </v-container>
</template>

<script>

export default {
  name: 'IndexPage',
  props: {
    usdData: {
      type: String,
    },
  },
  data() {
    return {
      currencyFrom: 'AED',
      currencyTo: 'ALL',
      num1: '1',
      num2: '60',
      snackbar: false,
      text: `Пожалуйста, проверьте правильность значений`,
      chartData: null
    }
  },
  methods: {
    assignValues(obj) {
      const { from, to, num } = obj
      const sampleData = require('@@/static/sample.json');
      if (sampleData.data[from.toUpperCase()] && sampleData.data[to.toUpperCase()]) {
        this.currencyFrom = from.toUpperCase()
        this.currencyTo = to.toUpperCase()
        this.num1 = num
        this.calc(from.toUpperCase(), to.toUpperCase(), num, 'right', sampleData)
        this.printBar()
      }
      else {
        this.snackbar = true;
      }
    },
    calc(from, to, num, side = 'right', sampleData) {
      if (!sampleData) {
        sampleData = require('@@/static/sample.json');
      }
      const val1 = sampleData.data[from].value
      const val2 = (sampleData.data[to].value / val1) * num
      if (side === 'right') {
        this.num2 = Number(val2).toFixed(4)
      } else {
        this.num1 = Number(val2).toFixed(4)
      }
    },
    convertManully(side) {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          if (side === 'right') {
            this.calc(this.currencyFrom, this.currencyTo, this.num1, side)
          } else {
            this.calc(this.currencyTo, this.currencyFrom, this.num2, side)
          }
        } else {
          this.snackbar = true
        }
      })
    },
    setNewValue(val, numberOfCard) {
      numberOfCard === 2 ? (this.num2 = val) : (this.num1 = val)
    },
    printBar() {
      // fetch historical data with base currency of currency2
      this.chartData = [];
      const sampleData = require('@@/static/historical.sample.json');

      sampleData.data.forEach(month => {
        this.chartData.push(month.currencies[this.currencyFrom].value);
      });


    }
  },
}
</script>
<style scoped>
.convert-card {
  max-width: 900px;
}

@media(max-width:960px) {
  .button-to {
    transform: rotate(90deg);
  }

  .convert-card {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>