<template>
    <div class="graph-wrap">
        <Bar :chart-data="chartData" />
        <div class="d-flex justify-center">
            <v-chip v-if="(chip && w == 599)" class="ma-2" close @click:close="chip = false">
                Переверните экран, чтобы отобразить график
            </v-chip>
        </div>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    components: { Bar },
    props: {
        currencyData: {
            default: []
        },
    },
    data() {
        return {
            chartData: {
                labels: ['Январь', 'Февраль', 'Март',
                    'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
                    'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                datasets: [
                    {
                        label: 'курс за 2022 год',
                        backgroundColor: '#3EB983',
                        data: [],
                        borderRadius: 5
                    }
                ]
            },
            chip: true
        }
    },
    computed: {
        w() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 599
                case 'sm': return 600
                case 'md': return 960
                case 'lg': return 1264
                case 'xl': return 1904
                default: return 1980
            }
        },
    },
    watch: {
        currencyData: {
            immediate: true,
            deep: true,
            handler(newValue) {
                this.setValueOfProp(newValue)
            },
        },
    },
    methods: {
        setValueOfProp(valueToSet) {
            this.chartData.datasets[0].data = valueToSet
        }
    },
}
</script>

<style scoped>
.graph-wrap {
    min-height: 250px;
}
</style>