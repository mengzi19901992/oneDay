// console.log(1)
// async function getStockPriceByName(name) {
//   console.log(2)
//   const symbol = await 'b';
//   console.log(3)
//   const stockPrice = await 'a';
//   return stockPrice;
// }
// console.log(4)
// getStockPriceByName('goog').then(function (result) {
//   console.log(result);
// });
// 1 4 2 3 a

// async function asyncPrint(value, ms) {
//     await new Promise((resolve) => {
//       setTimeout(resolve, ms);
//     });
//     console.log(value);
// }
// asyncPrint('hello world', 1000);

async function f() {
  return 'hello world';
}
console.log(f()) 
//Promise { 'hello world' }
