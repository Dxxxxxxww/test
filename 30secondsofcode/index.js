/**
 * @description get params from url 获取 url 参数  window.location 方法里也有属性可以看看
 * @param {*} url
 * @returns {}  {key: value}
 */
const getUrlParams = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (o, v) => (
      (o[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), o
    ),
    {}
  )

/**
 * @description get base url  window.location 方法里也有属性可以看看
 * @param {*} url
 * @return baseurl
 */
const getBaseUrl = (url) =>
  url.includes('?') ? url.slice(0, url.indexOf('?')) : url
