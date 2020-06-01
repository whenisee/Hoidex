Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        online: false,
        marketinfo: {},
        marketDepth: [],
        home_datas: [],
        usdt_datas: [],
        btc_datas: [],
        order: 'id',
        sort: 'desc',
        TradingView: {},
        market: 'BTC',
        symbol: 'usdt',
        market_symbol: 'BTC/USDT',
        langShow: 0,
        locale: 'zh'
    },
    mutations: {
        edit(state, bool) {
            state.online = bool
        },
        // 首页获取的socket数据
        getSocket(state, res) {
            if(res.type=='home') {
                state.home_datas = res.datas
            }
            if(res.type=='usdt') {
                state.usdt_datas = res.datas
            }
            if(res.type=='btc') {
                state.btc_datas = res.datas
            }
        },
        // 交易页面下的数据
        sendMarketInfo(state, marketinfo) {
            state.marketinfo = marketinfo
        },
        sendMarketDepth(state, marketDepth) {
            marketDepth.forEach(item=>{
                if(!item.price) {
                    item.price = 0
                }
            })
            state.marketDepth = marketDepth
        },
        // 传递websocket的param
        handleParam(state, obj) {
            state.order = obj.order
            state.sort = obj.sort
        },
        tradingView(state, obj) {
            state.TradingView = obj
        },
        // 处理market和symbol
        addMarket(state, val) {
            var arr = val.split('/')
            state.market = arr[0]
            state.symbol = arr[1]
            state.market_symbol = arr[0]+ '/' + arr[1].toUpperCase()
        },
        // 改变语言的选择箭头
        changeLang(state, val) {
            state.langShow = val
        },
        // 记录多语言
        handleLocale(state, val) {
            state.locale = val
        }
    }
})
export default store