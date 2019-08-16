import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    theme: {
        themes: {
            light: {
                header: colors.grey.darken4,
                toolbar: colors.grey.darken4,
                primary: colors.indigo.base,
                secondary: colors.indigo.lighten1,
                accent: colors.indigo.base,
                error: colors.red.base,
                warning: colors.amber.base,
                info: colors.indigo.base,
                success: colors.teal.base
            }
        }
    }
})