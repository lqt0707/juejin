// 用一个 map 来维护左括号和右括号的对应关系
const leftToRight = {
  "(": ")",
  "[": "]",
  "{": "}",
};

/**
 * 典型真题快速上手-“有效括号”问题
题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足： 左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:
输入: "()"
输出: true

示例 2:
输入: "()[]{}"
输出: true

示例 3:
输入: "(]"
输出: false

示例 4:
输入: "([)]"
输出: false
示例 5:
输入: "{[]}"
输出: true
 * @param {*} s 
 * @returns 
 */
const isValidate = function (s) {
  // 空字符串判为true
  if (!s) {
    return true;
  }

  const stack = [];

  const len = s.length;

  for (let i = 0; i < len; i++) {
    const ch = s[i];
    // 判断是否是左括号，将对应的右括号存到栈中
    if (ch === "(" || ch === "{" || ch === "[") {
      stack.push(leftToRight[ch]);
    } else {
      // 如果栈为空，或者出栈的字符跟当前字符没匹配上，判为无效
      if (!stack.length || stack.pop() !== ch) {
        return false;
      }
    }
  }
  return !stack.length;
};

console.log(isValidate("{{}}"));
console.log(isValidate("{{}】}"));
