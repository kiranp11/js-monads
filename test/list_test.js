import { List } from 'list'
describe("the list monad", () => {
  let first = new List([1])
  let second = new List([3,4])
  let upTo10 = new List([1,2,3,4,5,6,7,8,9,10])
  let byTwo = (ele) => new List( [ele * 2])
  let byThree = (ele) => new List( [ele * 3])
  let noOp = (ele) => new List( [] )

  it("should create a list", () => {
    expect(new List([1,2,3])).to.be.truthy
    expect(new List([1]).toArray()).to.be.deep.equal([1])
    expect(new List([[1]]).toArray()).to.be.deep.equal([[1]])
    expect(new List([1,2,3]).bind(noOp)).to.be.truthy
  })

  it("should append a list", ()=>{
    expect(first.toArray()).to.deep.equal([1])
    expect(first.concat(second).toArray()).to.deep.equal([1,3,4])
  })

  it('should flat map', () => {
    expect(first.bind(byTwo).toArray()).to.deep.equal([2])
    expect(first.bind(byTwo).bind(byThree).toArray()).to.deep.equal([6])
    expect(second.bind(byTwo).toArray()).to.deep.equal([6,8])
  })

  it('should filter', () => {
    let evens = (ele) => { return ele % 2 == 0 ? true : false }
    let odds = (ele) => { return ele % 2 == 0 ? false : true }
    expect(upTo10.filter(evens).toArray()).to.deep.equal([2,4,6,8,10])
    expect(upTo10.filter(evens).filter(odds).filter(odds).toArray()).to.deep.equal([])
    expect(upTo10.toArray()).to.deep.equal([1,2,3,4,5,6,7,8,9,10])
  })

  it("should map", () => {
    expect(second.map((ele) => ele.toString()).toArray()).to.deep.equal(["3", "4"])
    expect(second.map((ele) => [ele]).toArray()).to.deep.equal([[3], [4]])
  })
})
