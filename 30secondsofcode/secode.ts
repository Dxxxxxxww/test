const { log } = console

interface func {
  (key: string): string
}
/**
 * @description 深度遍历传入的对象，根据规则更改对象的 key
 * @param {*} obj
 * @param {*} fn
 */
const deepMapKeys = (obj: object | Array<any> | any, fn: func) =>
  Array.isArray(obj)
    ? obj.map((v) => deepMapKeys(v, fn))
    : typeof obj === 'object'
    ? Object.keys(obj).reduce((cur, next) => {
        const key = fn(next)
        const val = obj[next]
        cur[key] =
          val !== null && typeof val === 'object' ? deepMapKeys(val, fn) : val
        return cur
      }, {})
    : obj

const o = {
  foo: '1',
  nested: {
    child: {
      withArray: [
        {
          grandChild: ['hello'],
        },
      ],
    },
  },
}

const upperKeysObj = deepMapKeys(o, (key) => key.toUpperCase())
log(upperKeysObj)

