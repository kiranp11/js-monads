import { maybe } from 'maybe'

describe("A may be monad", () => {
  let byTwo = value => value * 2
  let byThree = value => value * 3

  it("should be byTwo by 2", () => {
    expect(maybe(2)).to.be.truthy
    expect(maybe(null).bind(byTwo)).to.be.falsy
    expect(maybe(undefined).bind(byTwo)).to.be.falsy
    expect(maybe(2).bind(byTwo)).to.equal(4)
  })

  it("binds should be chainable", function() {
    expect(maybe(2).bind(byTwo).bind(byThree)).to.equal(18)
  })
})
