<template>
    <v-container class="container px-4 d-flex justify-center" style="max-width: 900px">
        <v-card style="max-width: 900px"
            class="first-card rounded-xl mb-4 text-center d-flex flex-column justify-center align-center">
            <v-card-title class="font-weight-light"
                :style="{ 'font-size: 22px': w < 600, 'font-size: 32px': w == 960 }">
                Введите базовую валюту
            </v-card-title>
            <v-card-text class="subtitle-1"> Например, EUR</v-card-text>

            <ValidationObserver ref="observer">
                <v-container :class="'d-flex px-5 justify-center'">
                    <ValidationProvider v-slot="v" :rules="{ required: true, alpha: true, max: 3 }">
                        <v-text-field v-model="baseCurrency" :error="Boolean(v.errors[0])" tabindex="1"
                            style="max-width: 100px"
                            class="first-currency pr-5 headline primary--text centered-input my-input"
                            color="primary"></v-text-field>
                    </ValidationProvider>

                    <v-btn tabindex="2" class="align-self-center" color="accent" @click="getRates">Узнать курсы</v-btn>
                </v-container>
            </ValidationObserver>
        </v-card>
        <v-card class="px-4 rounded-xl mb-4 py-4" style="max-width: 300px">
            <RatesList v-if="rates" :data-json="dataRates" />
            <div v-else class="skeleton-list" style="overflow-y: auto; overflow-x: hidden; max-height: 60vh">
                <v-skeleton-loader v-for="n in 10" :key="n" class="rounded-xl px-0" type="list-item"
                    style="width: 270px"></v-skeleton-loader>
            </div>
        </v-card>
        <v-snackbar v-model="snackbar">
            Пожалуйста, проверьте правильность значений
            <template #action="{ attrs }">
                <v-btn color="error" text v-bind="attrs" @click="snackbar = false">
                    Закрыть
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            baseCurrency: this.$store.state.ratesBase,
            snackbar: false,
            rates: false,
            dataRates: null
        }
    },
    mounted() {
        if (this.$store.state.latestRates.jsonData) {
            this.rates = true;
            this.dataRates = this.$store.state.latestRates.jsonData
        };
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
    watch: {
        '$store.state.latestRates.jsonData'(newValue) {
            if (newValue) {
                this.rates = true;
                this.dataRates = this.$store.state.latestRates.jsonData
            }
        },
    },
    methods: {
        getRates() {
            this.$refs.observer.validate().then((result) => {
                if (this.$store.state.latestRates.base.toUpperCase()
                    !== this.baseCurrency.toUpperCase()) {
                    // is valid, different currency, this currency exists 
                    if (result
                        && this.$store.state.latestRates.jsonData.data[this.baseCurrency.toUpperCase()]) {
                        this.requestRates();
                    } else {
                        this.snackbar = true
                    }
                }
            })
        },
        async requestRates() {
            let url1 = 'https://api.currencyapi.com/v3/latest?apikey=mECXec0IwIt52Ik75EuwAHKMDCfMQNEB9oHEgi23&base_currency=';
            url1 += this.baseCurrency.toUpperCase().trim();
            const options1 = {
                method: 'GET',
            };

            const latestRatesResponse = await fetch(url1, options1);
            if (latestRatesResponse.ok) {
                const json = await latestRatesResponse.json();
                console.log(json);
                this.rates = true;
                this.dataRates = json;
                this.$store.commit('setlatestRates', json, this.baseCurrency.toUpperCase().trim())
            } else {
                alert("Ошибка API latestRates: " + latestRatesResponse.status);
            }
        }
    },
}
</script>

<style scoped>
.first-card {
    margin-right: 25px;
}

@media (max-width: 680px) {
    .first-card {
        margin-right: 5px;
    }
}

@media (max-width: 600px) {
    .first-card {
        margin-right: 0px;
    }

    .container {
        flex-direction: column;
        align-items: center;
    }

    .first-currency {
        padding-right: 0 !important;
    }
}
</style>
