<template>

  <v-card style="max-width:700px" class="d-flex justify-space-between align-center">
    <ConverterCurrencyCard></ConverterCurrencyCard>
    <v-btn icon class="pa-7">
      <v-icon dark large>
        mdi-arrow-left-right
      </v-icon>
    </v-btn>
    <ConverterCurrencyCard></ConverterCurrencyCard>
  </v-card>


</template>

<script>

export default {
  name: "IndexPage",
}
</script>
