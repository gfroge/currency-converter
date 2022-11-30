<template>
    <v-card style="max-width:900px" class="mb-4 text-center d-flex flex-column justify-center align-center">

        <v-card-title class="font-weight-light" style="font-size: 36px;">
            Введите запрос
        </v-card-title>
        <v-card-text class="subtitle-1">
            Например, 10 USD in RUB
        </v-card-text>

        <v-container grid-list-xs class="d-flex px-9 justify-center">
            <v-text-field style="max-width:235px;" class="px-5 headline primary--text my-input centered-input"
                color="primary" value="10"></v-text-field>
            <div style="max-width:214px;" class="d-flex justify-space-between pr-5">
                <v-text-field style="max-width:100px;" class="pr-5 headline primary--text my-input centered-input"
                    color="primary" value="USD"></v-text-field>
                <v-card-text style="max-width:20px;" class="headline pa-0 d-flex align-center justify-center">
                    in
                </v-card-text>
                <v-text-field style="max-width:100px;" class="pl-5 headline primary--text my-input centered-input"
                    color="primary" value="RUB"></v-text-field>
            </div>
        </v-container>

    </v-card>
</template>

<script>
export default {

}
</script>
