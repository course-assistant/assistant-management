/**
 * axios vue插件
 */

import axios from 'axios';
import qs from 'qs';

const MyAxiosHttp = {};

const axios_instance = axios.create({
    baseURL: 'http://127.0.0.1:8686/',
    // baseURL: 'https://tanyiqu.top:8686/',
    timeout: 5000
});

MyAxiosHttp.install = (Vue) => {
    /**
     * 添加get方法
     * 返回一个Promise
     * 并将错误信息全部转换成字符串
     * @param {*} path 
     * @param {*} params 
     */
    Vue.prototype.$get = (path, params) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(path, {
                params: params,
                headers: {
                    token: localStorage.getItem('hncj_management_admin_token')
                }
            }).then(res => {
                if (res.data) {
                    if (res.data.code === 200) {
                        resolve(res.data);
                    } else if (res.data.code === 300) {
                        resolve(res.data);
                    } else {
                        reject(res.data.msg);
                    }
                }
            }).catch(err => {
                reject('服务器异常');
            });
        });
    }

    /**
     * 添加post方法
     * 返回一个Promise
     * 并将错误信息全部转换成字符串
     * @param {*} path 
     * @param {*} params 
     */
    Vue.prototype.$post = (path, params) => {
        return new Promise((resolve, reject) => {
            axios_instance.post(path, qs.stringify(params), {
                headers: {
                    token: localStorage.getItem('hncj_management_admin_token')
                }
            }).then(res => {
                if (res.data) {
                    if (res.data.code === 200) {
                        resolve(res.data);
                    } else if (res.data.code === 300) {
                        resolve(res.data);
                    } else {
                        reject(res.data.msg);
                    }
                }
            }).catch(err => {
                reject('服务器异常');
            });
        });
    }


    // async/await 错误处理
    Vue.prototype.$awaitWrap = (promise) => {
        return promise
            .then(data => [data, null])
            .catch(err => [null, err]);
    }

};


export default MyAxiosHttp;