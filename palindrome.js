const checkPalindrome = (name) => {
    if(name.split("").reverse().join("") == name) {
        return 'palindrome'
    } else {
        return 'not palindrom'
    }
}
const name = 'nababan'
console.log('input =', name)
console.log('output =',checkPalindrome(name))