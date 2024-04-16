const getArgs = () =>
  process.argv.reduce((args, arg) => {
    // long arg
    if (arg.slice(0, 2) === '--') {
      const longArg = arg.split('=')
      const longArgFlag = longArg[0].slice(2)
      const longArgValue = longArg.length > 1 ? longArg[1] : true
      args[longArgFlag] = longArgValue
    }
    return args
  }, {})

const valueArg = getArgs().value ? Number(getArgs().value) : 0
const checkNaN = !isNaN(valueArg) ? valueArg : 0

console.log(Number(getArgs().value), getArgs().value, getArgs())

/**
 * @param {number} n
 * @returns {number}
 * @description Use for loop
 */
const sum_to_n_a = function (n) {
  if (n < 1) return 'n must a number and bigger than 1'

  let result = 0
  for (let i = 0; i <= n; i++) {
    result += i
  }
  return result
}

/**
 * @param {number} n
 * @returns {number}
 * @description Use formula ```result = ((1 + n) * n) / 2```
 */
const sum_to_n_b = function (n) {
  if (n < 1) return 'n must a number and bigger than 1'

  return ((1 + n) * n) / 2
}

/**
 * @param {number} n
 * @returns {number}
 * @description Use recursion
 */
const sum_to_n_c = function (n) {
  if (n < 1) return 'n must a number and bigger than 1'

  if (n === 1) return n
  else return n + sum_to_n_c(n - 1)
}

console.log('🚀 ~ sum_to_n_a(checkNaN):: ', sum_to_n_a(checkNaN))
console.log('🚀 ~ sum_to_n_b(checkNaN):: ', sum_to_n_b(checkNaN))
console.log('🚀 ~ sum_to_n_c(checkNaN):: ', sum_to_n_c(checkNaN))
