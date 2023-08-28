/**
 * 真题描述： 设计一个支持以下两种操作的数据结构：
void addWord(word)
bool search(word)
search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
. 可以表示任何一个字母。

示例: addWord("bad")
addWord("dad")
addWord("mad")
search("pad") -> false
search("bad") -> true
search(".ad") -> true
search("b..") -> true
说明:
你可以假设所有单词都是由小写字母 a-z 组成的。
 */

/**
 * 构造函数
 */
const WorkDictionary = function () {
  // 初始化一个对象字面量，承担map的角色
  this.words = {};
};

/**
 * 添加字符串的方法
 */
WorkDictionary.prototype.addWord = function (word) {
  // 若该字符串对应长度的数组已经存在，则只做添加
  if (this.words[word.length]) {
    this.words[word.length].push(word);
  } else {
    // 不存在则先创建
    this.words[word.length] = [word];
  }
};

/**
 * 搜索方法
 */
WorkDictionary.prototype.search = function (word) {
  // 若该字符串长度在 Map 中对应的数组根本不存在，则可判断该字符串不存在
  if (!this.words[word.length]) {
    return false;
  }
  // 缓存目标字符串的长度
  const len = word.length;
  // 如果字符串中不包含‘.’，那么一定是普通字符串
  if (!word.includes(".")) {
    // 定位到和目标字符串长度一致的字符串数组，在其中查找是否存在该字符串
    return this.words[len].includes(word);
  }
  // 否则是正则表达式，要先创建正则表达式对象
  const reg = new RegExp(word);

  // 只要数组中有一个匹配正则表达式的字符串，就返回true
  return this.words[len].some((item) => {
    return reg.test(item);
  });
};
const diction = new WorkDictionary();
diction.addWord("bad");
diction.addWord("dad");
diction.addWord("mad");

console.log(diction.search("pad"));
console.log(diction.search("bad"));
console.log(diction.search(".ad"));
console.log(diction.search("b.."));
