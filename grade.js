// input
const data = [
    'evan|50000|D',
    'jefry|70000|C',
    'rizky|30000|D',
    'hanson|10000|B',
    'candra|30000|A',
    'goklas|20000|A',
    'hendra|20000|B',
    'surya|30000|A',
]

const modifiedData = data.map(obj => {
    let splitted = obj.split('|')
    
    let newObj = {
        name: splitted[0],
        point: splitted[1],
        grade: splitted[2],
    }

    return newObj
}).sort((a, b) => {
    if (a.grade === b.grade){
        return a.point > b.point ? -1 : 1
      } else {
        return a.grade < b.grade ? -1 : 1
      }
})
.map(obj => {
    return obj.name
})

// output
console.log(modifiedData)