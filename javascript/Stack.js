//栈：先入后出(后入先出)
function Stack(){
    var items = [];
    //入栈
    this.push = function(item){
        items.push(item);
    }
    //出栈
    this.pop = function(){
        return items.pop();
    }
    //取栈顶
    this.top = function(){
        return items[items.length-1];
    }
    //栈是否为空
    this.isEmpty = function(){
        return items.length === 0;
    }
    //栈的大小
    this.size = function(){
        return items.length;
    }
}

//使用栈实现一个判责字符串中左右括号数是否合法
//思路：当遇到左括号时，执行入栈操作。当遇到右括号时候执行出栈操作，如果出栈时栈为空，则括号数不合法，否则执行到最后栈为空则括号数合法
function isHaveRight(str){
    var stack = new Stack();
    for(var i=0;i<str.length;i++){
        var item = str[i];
        if(item == '('){
            stack.push(item);
        }else if(item == ')'){
            if(stack.isEmpty()){
                return false;
            }else{
                stack.pop();
            }
        }
    }
    return stack.isEmpty();
}
// console.log(isHaveRight('(dd(ere(dafdf)d))'));
// console.log(isHaveRight('(dkfjk)dfd((dfd0e0ee9(dfd)df)dfe(d0)'));
// console.log(isHaveRight('(dd(ere(dafdf)d))(dd(ere(dafdf)d))(dd(ere(dafdf)d))'));

//使用数组实现
function isHaveRight1(str){
    var arr = [];
    for(var i=0;i<str.length;i++){
        var item = str[i];
        if(item == '('){
            arr.push('(');
        }else if(item == ')'){
            if(!arr.length){
                return false;
            }else{
                arr.pop();
            }
        }
    }
    return !arr.length;
}

console.log(isHaveRight1('((dd(ere(dafdf)d))'));
