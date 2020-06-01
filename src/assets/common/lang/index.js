Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh',    // 语言标识
  messages: {
    'zh': require('./zh'),   // 中文语言包
    'en': require('./en'),    // 英文语言包
    'jp': require('./jp'),
    'ko': require('./ko')
  }
})
sessionStorage.setItem('locale', i18n.locale)
export default i18n