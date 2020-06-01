let debounce = (func, wait) => {
    let timeout = null;
    return () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func()
        }, wait)
    }
}
export default debounce