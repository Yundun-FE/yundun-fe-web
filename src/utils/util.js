export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}

  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object') {
      targetObj[key] = source[key].constructor === Array ? [] : {}
      targetObj[key] = deepClone(source[key])
    } else {
      targetObj[key] = source[key]
    }
  }
  return targetObj
}

export function listToObj(list, key) {
  const obj = {}
  list.forEach(item => {
    obj[item[key]] = item
  })
  return obj
}
