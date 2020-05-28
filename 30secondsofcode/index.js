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
// '?a=1&b=2'.match(/([^?=&]+)(=([^&]*))/g) ["a=1", "b=2"]

/**
 * @description get base url  window.location 方法里也有属性可以看看
 * @param {*} url
 * @return baseurl
 */
const getBaseUrl = (url) =>
  url.includes('?') ? url.slice(0, url.indexOf('?')) : url

/**
 * @description if protocol is not https, redirect to https://xxxx
 */
const httpsRedirect = () => {
  if (location.protocol !== 'https:')
    location.replace('https://' + location.href.split('//')[1])
}

/**
 * @description 传入一个对象，转化成 url 的 param
 * @param {*} param
 */
const objectToQueryString = (param) => {
  return param
    ? Object.entries(param).reduce((queryString, [key, value]) => {
        const symbol = queryString.length === 0 ? '?' : '&'
        queryString +=
          typeof value === 'string' ? `${symbol}${key}=${value}` : ''
        return queryString
      }, '')
    : ''
}
objectToQueryString({ page: '1', size: '2kg', key: undefined }) // ?page=1&size=2kg