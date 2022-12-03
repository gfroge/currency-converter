<template>
  <v-card
    style="max-width: 900px"
    class="rounded-xl mb-4 text-center d-flex flex-column justify-center align-center"
  >
    <v-card-title
      class="font-weight-light"
      :style="w < 600 ? 'font-size: 28px' : 'font-size: 32px'"
    >
      Введите запрос
    </v-card-title>
    <v-card-text class="subtitle-1"> Например, 10 USD in RUB </v-card-text>

    <ValidationObserver ref="observer">
      <v-container
        :class="
          w < 600
            ? 'd-flex flex-column px-0 pr-2  align-center'
            : 'd-flex px-9 justify-center'
        "
      >
        <ValidationProvider
          v-slot="v"
          :rules="{ regex: /^\d*\.?\d*$/, required: true }"
        >
          <v-text-field
            v-model="num"
            :error="Boolean(v.errors[0])"
            tabindex="1"
            style="max-width: 235px"
            class="px-5 headline primary--text centered-input my-input"
            color="primary"
          ></v-text-field>
        </ValidationProvider>

        <div
          style="max-width: 214px"
          :class="
            w < 600
              ? 'd-flex justify-space-between pr-0 mb-4'
              : 'd-flex justify-space-between pr-5'
          "
        >
          <ValidationProvider
            v-slot="v"
            :rules="{ required: true, alpha: true, max: 3 }"
          >
            <v-text-field
              v-model="from"
              :error="Boolean(v.errors[0])"
              tabindex="2"
              style="max-width: 100px"
              class="first-currency pr-5 headline primary--text centered-input my-input"
              color="primary"
            ></v-text-field>
          </ValidationProvider>

          <v-card-text
            style="max-width: 20px"
            class="headline pa-0 d-flex align-center justify-center"
          >
            in
          </v-card-text>

          <ValidationProvider
            v-slot="v"
            :rules="{ required: true, alpha: true, max: 3 }"
          >
            <v-text-field
              v-model="to"
              :error="Boolean(v.errors[0])"
              tabindex="3"
              style="max-width: 100px"
              class="second-currency text-uppercase pl-5 headline primary--text centered-input my-input"
              color="primary"
            ></v-text-field>
          </ValidationProvider>
        </div>

        <v-btn
          tabindex="4"
          class="align-self-center"
          color="accent"
          @click="calc"
          >Перевести</v-btn
        >
      </v-container>
    </ValidationObserver>
  </v-card>
</template>

<script>
export default {
  name: 'ConverterInputTitle',
  data() {
    return {
      from: this.$store.state.converterInput.from,
      to: this.$store.state.converterInput.to,
      num: this.$store.state.converterInput.num,
    }
  },
  computed: {
    w() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 599
        case 'sm':
          return 600
        case 'md':
          return 960
        case 'lg':
          return 1264
        case 'xl':
          return 1904
        default:
          return 1980
      }
    },
  },
  methods: {
    calc() {
      this.$refs.observer.validate().then((result) => {
        if (result && this.from.toUpperCase() !== this.to.toUpperCase()) {
          this.$emit('request', {
            from: this.from,
            to: this.to,
            num: this.num,
          })
          this.$store.commit('setConverterInput', {
            from: this.from.toUpperCase(),
            to: this.to.toUpperCase(),
            num: this.num,
          })
        } else {
          this.$emit('snack')
        }
      })
    },
  },
}
</script>

<style>
.v-text-field__slot input {
  text-transform: uppercase !important;
}
</style>
