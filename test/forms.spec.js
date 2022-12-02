import { mount } from '@vue/test-utils'
import ConverterInputTitle from '@/components/ConverterInputTitle.vue'

describe('ConverterInputTitle', () => {
    test('error appears after incorrect currency name input', async () => {
        const mainInputWrap = mount(ConverterInputTitle, {
            mocks: {
                $vuetify: { breakpoint: {} }
            }
        });
        await mainInputWrap.find('.first-currency').setValue('aaaa')
        await mainInputWrap.find('.second-currency').setValue('AED')
        await mainInputWrap.find('v-btn').trigger('click')

        expect(mainInputWrap.emitted()).toHaveProperty('snack')
    })
})