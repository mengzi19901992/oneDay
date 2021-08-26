//队列：先进先出
function Queue(){
    var items = [];
    //入队/尾部
    this.enqueue = function(item){
        items.push(item);
    }
    //出队/头部
    this.dequeue = function(){
        return items.shift();
    }
    //返回头部元素
    this.head = function(){
        return items[0];
    }
    this.size = function(){
        return items.length;
    }
    this.clear = function(){
        items = [];
    }
    this.isEmpty = function(){
        return items.length===0;
    }
    this.tail = function(){
        return items[items.length-1];
    }
}

//斐波那契数列，求第n个值
//1 1 2 3 5 8 13 21 
//递归，复杂度 n² n^2
function recursion(n){
    if(n==0||n==1){
        return 1;
    }
    return recursion(n-2)+recursion(n-1);
}
//队列 复杂度n
function queuePlus(n){
    let queue = new Queue();
    let index = 0;
    queue.enqueue(1);
    queue.enqueue(1);
    while(index<n-1){
        let del_item = queue.dequeue();
        head_item = queue.head();
        queue.enqueue(del_item+head_item);
        index++;
    }
    return queue.tail();
}
console.log(111)
console.log(recursion(20))
console.log(queuePlus(20))

//数组 复杂度n
function arrPlus(n){
    let arr = [1,1];
    let index = 0;
    // while(index<n-1){
    //     arr.push(arr.shift()+arr[0]);
    //     index++;
    // }
    // return arr[1];
    while(index<n-1){
        arr.push(arr[index]+arr[index+1]);
        index++;
    }
    return arr[n];
}
console.log(arrPlus(20))








