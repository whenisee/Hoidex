Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 控制菜单的登录注册显示
        online: false,
        // 币种搜索
        home_datas: [],
        // 首页tab栏缓存数据
        usdt_datas: [],
        btc_datas: [],
        // 首页tab栏缓存分类
        sort: {
            order: 'id',
            sort: 'desc',
        },
        market: 'BTC',
        symbol: 'usdt',
        market_symbol: 'BTC/USDT',
        // 多语言
        langShow: 0,
        locale: 'zh',
        // 默认白天
        mode: true
    },
    mutations: {
        edit(state, bool) {
            state.online = bool
        },
        // 首页获取的socket数据
        getSocket(state, res) {
            if (res.type == 'home') {
                state.home_datas = res.datas
            }
            if (res.type == 'usdt') {
                state.usdt_datas = res.datas
            }
            if (res.type == 'btc') {
                state.btc_datas = res.datas
            }
        },
        // 传递websocket的param
        handleParam(state, obj) {
            state.sort = obj
        },
        tradingView(state, obj) {
            state.TradingView = obj
        },
        // 处理market和symbol
        addMarket(state, val) {
            var arr = val.split('/')
            state.market = arr[0]
            state.symbol = arr[1]
            state.market_symbol = arr[0] + '/' + arr[1].toUpperCase()
        },
        // 改变语言的选择箭头
        changeLang(state, val) {
            state.langShow = val
        },
        // 记录多语言
        handleLocale(state, val) {
            state.locale = val
        },
        // 模式选择
        handleMode(state, bool) {
            state.mode = bool
        }
    }
})
export default store