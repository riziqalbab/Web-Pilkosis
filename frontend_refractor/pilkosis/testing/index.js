const myArray = [
   {
      id: 1,
      name: 'John',
      age: 25
   },
   {
      id: 2,
      name: 'Jane',
      age: 22
   },
   {
      id: 3,
      name: 'Doe',
      age: 30
   }
]

myArray.__proto__.deleteById = function (id) {
   this.splice(this.findIndex(item => item.id === id), 1);
}

console.log(myArray);

myArray.deleteById(2);

console.log(myArray);