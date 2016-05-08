export function List(array){
  this.arr = array
}

List.prototype.toArray = function() {
  return this.arr
}

List.prototype.unit = function(arr) {
  return new List(arr)
}

List.prototype.concat = function(other) {
  return new List(this.arr.concat(other.toArray()))
}

List.prototype.bind = function(func) {
  var result = this.unit([])
  this.arr.forEach((ele) => {
    result = result.concat(func(ele))
  })
  return result
}

List.prototype.filter = function(predicate) {
  return this.bind((ele) => predicate(ele) ? new List([ele]) : new List([]))
}

List.prototype.map = function(func) {
  return this.bind((ele) => new List([func(ele)]))
}

