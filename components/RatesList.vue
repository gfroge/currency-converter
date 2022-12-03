<template>
    <v-card v-if="dataJson" class="px-4 rounded-xl mb-4 py-4" style="max-width: 300px">
        <v-list outlined class="list my-0 mx-auto" style="width:250px">
            <v-list-item v-for="(currency, index) in dataJson.data" :key="index" class="list__item">
                <v-list-item-content>
                    <v-list-item-title class="d-flex justify-space-between" style="font-size: 24px;">
                        <span class="primary--text">1 {{ currency.code }}=</span>
                        <span class="d-flex align-center ml-4" style="font-size: 21px; overflow-x: auto">
                            {{ getValidNumber(currency.value) }}
                        </span>
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
    methods: {
        getValidNumber(val) {
            let fix = 4;
            let result = (1 / val).toFixed(fix)

            // 1: 50.0000 -> 50
            // 2: 0.0000 -> 0.0000002
            if (result[0] !== '0') {
                while ((result[result.length - 1] === '0') && (fix > 0)) {
                    fix--;
                    result = Number(result).toFixed(fix);
                }
            }
            else if ((result[result.length - 1] === '0')) {
                while ((result[result.length - 1] === '0') && (fix < 100)) {
                    fix++;
                    result = (1 / val).toFixed(fix);
                }
            }
            return result;
        }
    },
}
</script>

<style scoped>
.list {
    max-height: 60vh;
    overflow-y: auto;
    border-radius: 20px;
}

.list__item {
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