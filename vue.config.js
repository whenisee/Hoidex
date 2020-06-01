module.exports = {
    chainWebpack: config => {
        config.when(process.env.NODE_ENV === 'production', config => {
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'vue-router',
                axios: 'axios',
                echarts: 'echarts',
                vant: 'vant',
                'lib-flexible': 'lib-flexible',
                'vue-i18n':'vue-i18n',
                'vue-resource':'vue-resource',
                'vuex':'vuex'
            })
        })
    }
}