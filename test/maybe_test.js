import { maybe } from 'maybe'

describe("A may be monad", () => {
  let byTwo = value => maybe(value * 2)
  let byThree = value => maybe(value * 3)
  let bySix = (value) => byThree(value).bind(byTwo)
  let noOp = value => maybe(value)

  let assertEquals = expected => (actual) => {
    expect(expected).to.be.equal(actual)
    return maybe(actual)
  }

  let assertNotEquals = expected => (actual) => {
    expect(expected).to.not.be.equal(actual)
    return maybe(actual)
  }

  it("should be byTwo by 2", () => {
    expect(maybe(2)).to.be.truthy
    expect(maybe(null).bind(byTwo)).to.be.falsy
    expect(maybe(undefined).bind(byTwo)).to.be.falsy
    maybe(2).bind(byTwo).bind(assertEquals(4)).bind(assertNotEquals(5))
    maybe(2).bind(byTwo).bind(assertNotEquals(5)).bind(assertEquals(4))
  })

  it("binds should be chainable", () => {
    maybe(2).bind(byTwo).bind(byThree).bind(assertEquals(12))
    maybe(2).bind(byTwo).bind(byThree).bind(assertNotEquals(192))
    maybe(2).bind(bySix).bind(assertEquals(12))
    maybe(null).bind(byTwo).bind(byThree).bind(assertEquals(undefined))
    maybe(undefined).bind(byTwo).bind(byThree).bind(assertEquals(undefined))
  })

  it("should do nothing", () => {
    maybe(2).bind(noOp).bind(noOp).bind(assertEquals(2))
  })
})
