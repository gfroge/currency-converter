<template>
    <div>
        <Bar :chart-data="chartData" />
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
        }
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

</style>