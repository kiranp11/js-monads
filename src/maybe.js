exports.maybe = function(value) {
  const monad = Object.create(null)
  monad.bind = (func) => {
    return value ? func(value.valueOf()) : undefined
  }
  return monad
}

