<template>
    <v-card style="max-width:400px; width: 100%;" flat class="flat pa-5 ma-4 d-flex flex-column align-center">

        <v-card-title class="title">
            {{ currency }}
        </v-card-title>
        <ValidationProvider v-slot="v" :rules="{ regex: /^\d*\.?\d*$/ }">
            <v-text-field :error="Boolean(v.errors[0])" v-model="val" style="max-width:300px; width: 100%;"
                class="px-0 headline primary--text my-input centered-input" color="primary" :loading="isLoading"
                ></v-text-field>
        </ValidationProvider>
    </v-card>
</template>

<script>
export default {
    props: {
        currency: { type: String, default: 'USD' },
        num: { type: String, default: '' }
    },
    data() {
        return {
            isLoading: false,
            val:null
        }
    },
    watch: {
        num: {
            immediate: true,
            deep: true,
            handler(newValue) {
                this.setValueToProp(newValue) 
            }
        }
    },
    methods: {
        setValueToProp(valueToSet) {
            this.val = valueToSet
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