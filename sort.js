// input
const input = '12 5 7 17 8 0 -1 16 7'

const arrayNumber = input.split(' ').map((str) => {
    return parseInt(str)
})

let sortedArray = arrayNumber.sort((a, b) => {
    return b-a
})

// output
console.log('input = ', input)
console.log('output = ', sortedArray[1])