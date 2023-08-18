// 使用展开符来获取数组格式的 pipe 参数
function compose(...funcs) {
    function callback(input, func) {
      return func(input)
    }  
  
    return function(param) {
      return funcs.reduceRight(callback,param)
    }
  }
    