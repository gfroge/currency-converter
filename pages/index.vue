<template>

  <v-container class="px-4" style="max-width:900px">

    <converter-input-title/>

    <v-card style="max-width:900px" class="d-flex justify-space-between align-center">

      <ConverterCurrencyCard></ConverterCurrencyCard>
      <v-btn icon class="pa-7">
        <v-icon dark large>
          mdi-arrow-left-right
        </v-icon>
      </v-btn>
      <ConverterCurrencyCard></ConverterCurrencyCard>

    </v-card>

  </v-container>


</template>

<script>

export default {
  name: "IndexPage",
}
</script>
