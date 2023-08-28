/**
 * 判断一个字符串是否是回文字符串
 */
// function isPalindrome(str) {
//     // 先反转字符串
//     const reversedStr = str.split('').reverse().join('')
//     // 判断反转前后是否相等
//     return reversedStr===str
// }

function isPalindrome(str) {
  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false;
    }
  }
  return true;
}

console.log(isPalindrome("abba"));
