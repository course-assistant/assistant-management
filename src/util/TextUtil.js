const TextUtil = {
    /**
     * 判断字符串是否为空
     * @param {string} str 
     */
    isEmpty(str) {
        if (str === null || typeof (str) !== 'string' || str.trim() === '') {
            return true;
        }
        return false;
    }
}
export default TextUtil;