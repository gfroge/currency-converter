<template>
    <v-card v-if="dataa" class="px-4 rounded-xl mb-4 py-4" style="max-width: 300px">
        <v-card-title primary-title class="px-0 py-2 justify-center">
            1 USD =
        </v-card-title>
        <v-list outlined class="list my-0 mx-auto" style="width:250px">
            <v-list-item v-for="(currency, index) in dataa.data" :key="index" class="list__item">
                <v-list-item-content>
                    <v-list-item-title class="d-flex justify-space-between" style="font-size: 28px;">
                        <span class="primary--text"> {{ currency.code }}:</span>
                        <span>{{ (1 / currency.value).toFixed(4) }}</span>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            dataa: null
        }
    },
    props: {
        dataJson: {
            type: Object,
            required: true
        },
    },
    mounted() {
        this.name();
    },
    methods: {
        name() {
            this.dataa = require('@@/static/sample.json');
        }
    },
}
</script>

<style scoped>
.list{
    max-height: 60vh;
    overflow-y: auto;
    border-radius: 20px;
}
.list__item{
    border-bottom: 1px solid rgb(61, 61, 61);
}
* {
  scrollbar-width: thin;
}
*::-webkit-scrollbar {
  width: 12px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 20px;
  border: 3px solid;
}
</style>