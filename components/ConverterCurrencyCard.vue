<template>
    <v-card style="max-width:400px; width: 100%;" flat class="flat pa-5 ma-4 d-flex flex-column align-center">

        <v-card-title class="title">
            {{currency}}
        </v-card-title>

        <v-text-field style="max-width:300px; width: 100%;" class="px-0 headline primary--text my-input centered-input"
            color="primary" :loading="isLoading" :value="num"></v-text-field>
    </v-card>
</template>

<script>
export default {
    props: {
        currency: { type: String, default: 'USD'},
        num: {type: Number, default: 0}
    },

    data() {
        return {
            isLoading: false,
        }
    },
}
</script>
<style>
.my-input .v-text-field__slot input {
    color: #3EB983 !important;
}

.centered-input input {
    text-align: center !important
}
</style>