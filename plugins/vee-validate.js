import Vue from 'vue';
import {ValidationObserver,ValidationProvider,extend} from 'vee-validate'
import {regex} from 'vee-validate/dist/rules'

Vue.component('ValidationObserver',ValidationObserver)
Vue.component('ValidationProvider',ValidationProvider)

extend('regex',{
    ...regex,
    message: 'aaaaa'
});