<template>
  <v-card
    style="max-width: 900px"
    class="rounded-xl mb-4 text-center d-flex flex-column justify-center align-center"
  >
    <v-card-title class="font-weight-light" style="font-size: 32px">
      Введите запрос
    </v-card-title>
    <v-card-text class="subtitle-1"> Например, 10 USD in RUB </v-card-text>

    <ValidationObserver ref="observer">
      <v-container grid-list-xs class="d-flex px-9 justify-center">
        <ValidationProvider
          v-slot="v"
          :rules="{ regex: /^\d*\.?\d*$/, required: true }"
        >
          <v-text-field
            v-model="num"
            :error="Boolean(v.errors[0])"
            tabindex="1"
            style="max-width: 235px"
            class="px-5 headline primary--text my-input centered-input"
            color="primary"
          ></v-text-field>
        </ValidationProvider>
        <div style="max-width: 214px" class="d-flex justify-space-between pr-5">
          <ValidationProvider
            v-slot="v"
            :rules="{ required: true, alpha: true }"
          >
            <v-text-field
              v-model="from"
              :error="Boolean(v.errors[0])"
              max-length="3"
              tabindex="2"
              style="max-width: 100px"
              class="pr-5 headline primary--text my-input centered-input"
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
            :rules="{ required: true, alpha: true }"
          >
            <v-text-field
              v-model="to"
              :error="Boolean(v.errors[0])"
              max-length="3"
              tabindex="3"
              style="max-width: 100px"
              class="text-uppercase pl-5 headline primary--text my-input centered-input"
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
  data() {
    return {
      from: '',
      to: '',
      num: null,
    }
  },
  methods: {
    calc() {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.$emit('request', {
            from: this.from,
            to: this.to,
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
