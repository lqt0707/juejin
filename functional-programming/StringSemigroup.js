const StringSemigroup = (s1) => ({
  value: s1,
  concat: (s2) => StringSemigroup(s1 + s2.value),
});


// 创建两个字符串 Semigroup
const str1 = StringSemigroup('Hello, ')
const str2 = StringSemigroup('world!')  

// 拼接字符串
const str3 = str1.concat(str2);

// 输出："Hello, world!"
console.log(str3.value)