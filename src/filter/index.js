Vue.filter('handleUpper', (value) => {
    if (value) {
        return value.toUpperCase()
    }
})
Vue.filter('handleNum', (value) => {
    if (value) {
        if (value > 0) {
            var sum = '+' + value
            return sum
        }
        return value
    }
})
// 替换*
Vue.filter('reg', (val, index, len) => {
    if (val) {
        var str = val.slice(index, index + len)
        var star = '*'
        for (var i = 0; i < len; i++) {
            star += '*'
        }
        return val.replace(str, star)
    }
})

// 时间戳
Vue.filter('handleFormat', (val) => {
    Date.prototype.toLocaleString = function () {
        var y = this.getFullYear()
        var m = (this.getMonth() + 1) > 9 ? (this.getMonth() + 1) : ('0' + (this.getMonth() + 1))
        var d = this.getDate()
        var h = this.getHours()
        var minutes = (this.getMinutes() + 1) > 9 ? (this.getMinutes() + 1) : ('0' + (this.getMinutes() + 1))
        var s = (this.getSeconds() + 1) > 9 ? (this.getSeconds() + 1) : ('0' + (this.getSeconds() + 1))
        return y + "-" + m + "-" + d + " " + h + ":" + minutes + ":" + s;
    };
    var data = new Date(val * 1000);
    var commonTime = data.toLocaleString()
    return commonTime
})

// 转换成人民币
Vue.filter('handleMoney', (val) => {
    return val
})

// 小写字母转换成大写字母
Vue.filter('handleTrans', (val) => {
    if (val) {
        return val.toUpperCase()
    }
})
// 数值加上正负
Vue.filter('handleNumAll', (val) => {
    if (val) {
        if (val > 0) {
            return '+' + val
        }
        return val
    }
})
Vue.filter('handleDecimal', (val, num) => {
    if (val) {
        return Number(val).toFixed(num)
    }
})