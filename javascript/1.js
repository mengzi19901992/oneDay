function ListNode(val,next){
    this.val = val !== undefined ?val:0;
    this.next = next !== undefined ? next : null;
}
//删除链表中所有值等于val的节点，新增虚拟头节点,双指针(上一个，当前一个)
var removeElements = function(head,val){
    let ret = new ListNode(0,head);
    let pre = ret;
    let node = ret.next;
    while(node){
        if(node.val === val){
            node = node.next;
            pre.next = node;
        }else{
            pre = node;
            node = node.next;
        }
    }
    return ret.next;
}
//反转链表，双指针(上一个，当前一个)
var reverseList = function(head){
    if(!head||!head.next) return head;
    let pre = null;
    let cur = head;
    if(cur){
        let temp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = temp;
    }
    return pre;
}
//两两交换链表中的节点，示例 输入[1,2,3,4] 输出[2,1,4,3]
//使用虚拟头节点，节点有两个next才可以交换（两个next交换）,最后返回虚拟头的next
var exchangeList = function(head){
    let ret = new ListNode(0,head);
    let temp = ret;
    while(temp.next&&temp.next.next){
        //交换当前两个节点
        let pre = temp.next;
        let cur = temp.next.next;
        pre.next = cur.next;
        cur.next = pre;
        temp.next = cur;
        temp = pre;
    }
    return ret.next;
}
//删除链表的倒数第N个节点
//双指针（快慢指针），快指针先走n个，然后慢指针再走，快指针走到头慢指针就是指向倒数第n个节点
var deleteList = function(head,n){
    //新增虚拟头，防止倒数n是head
    let ret = new ListNode(0,head);
    let slow = ret;
    let fast = ret;
    while(fast.next){
        if(n>0){
            fast = fast.next;
            n--;
        }else{
            fast = fast.next;
            slow = slow.next;
        }
    }
    slow.next = slow.next.next;
    return ret.next;
}
//链表相交
//给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。
//如果相交，则后边长度相等，所以把长度长的前边的节点去掉，从短的节点开始相比较
function getLength(head){
    let len = 0;
    let cur = head
    if(cur){
        cur = cur.next;
        len ++;
    }
    return len;
}

var getIntersectionNode = function(headA,headB){
    let curA = headA,curB = headB;
    let lenA = getLength(curA),lenB = getLength(curB);
    if(lenA<lenB){
        [curA,curB] = [curB,curA];
        [lenA,lenB] = [lenB,lenA];
    }
    let i = lenA-lenB;
    while(i-->0){
        curA = curA.next;
    }
    while(curA&&curA!==curB){
        curA = curA.next;
        curB = curB.next;
    }
    return curA;
}

//环形链表
//给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
//双指针（慢指针一次一步，快指针一次两步），如相遇则是环
var loopList = function(head){
    if(!head||!head.next) return null;
    let slow = head;
    let fast = head;
    while(fast&&fast.next){
        slow = slow.next;
        fast = fast.next.next;
        //相遇则是环形链表
        if(slow === fast){
            // return true;
            //慢指针从头开始，与快指针相遇的节点就是入口节点
            slow = head;
            while(slow!=fast){
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    return null;
}

//反转字符串（反转数组）
//转换成数组，双指针（头尾指针交换）
var reverseString = function(str){
    let arr = str.split('');
    let left = 0,right = arr.length-1;
    while(left<right){
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
    return arr.join('');
}

//反转字符串II
//给定一个字符串 s 和一个整数 k，你需要对从字符串开头算起的每隔 2k 个字符的前 k 个字符进行反转。
//如果剩余字符少于 k 个，则将剩余字符全部反转。
//如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
// 示例:
// 输入: s = "abcdefg", k = 2
// 输出: "bacdfeg"
//按照k的长度拆分成数组，奇数反转，偶数不反转
var reverseStr = function(str,k){
    let arr = [];
    for(let i=0;i<str.length;i+=k){
        arr.push(str.substr(i,k));
    }
    for(let i =o;i<arr.length;i++){
        if(i%2===0){
            arr[i] = arr[i].split('').reverse().join('');
        }
    }
    return arr.join('');
}
//替换空格
// 请实现一个函数，把字符串 s 中的每个空格替换成"%20"
//首先扩充数组到每个空格替换成"%20"之后的大小。然后从后向前替换空格，也就是双指针法
//双指针（慢指针指向原数组元素，快指针指向新数组）
var replaceSpace = function(str){
    let arr = Array.from(str);
    let count = 0;
    //计算空格数量
    for(let i =0;i<arr.length;i++){
        if(arr[i]===' '){
            count++;
        }
    }
    let slow = arr.length-1;
    let fast = arr.length-1+count*2;
    while(fast>=0){
        if(arr[slow]===' '){
            arr[fast--] = '0';
            arr[fast--] = '2';
            arr[fast--] = '%';
            slow--;
        }else{
            arr[fast--] = arr[slow--];
            // fast--;
            // slow--; 
        }
    }
    return arr.join('');
}
//给定一个字符串，逐个翻转字符串中的每个单词
var strReverse = function(str){
    //删除多余空格，双指针（快慢指针）
    let arr = str.split(' ');
    let slow = 0;
    let fast = 0;
    while(fast<arr.length){
        if(arr[fast]===' '){
            fast++;
        }else{
            arr[slow] = arr[fast]
            fast++;
            slow++;
        }
    }
    arr.length = slow;
    //数组反转,双指针,左右指针
    let left = 0;
    let right = arr.length-1;
    while(right>left){
        [arr[left],arr[right]] = [arr[right],arr[left]];
        right--;
        left++;
    }
    return arr.join(' ');
}
//左旋转字符串
//字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。
// 示例 1：
// 输入: s = "abcdefg", k = 2
// 输出: "cdefgab"
var leftReverse = function(s,k){
    //数组扩展，前几项后移
    let arr = Array.from(s);
    let len = arr.length;
    for(let i=0;i<k;i++){
        arr[len+i] = arr[i];
        arr[i] = '';
    }
    //双指针删除多余''
    let slow = 0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]!==''){
            arr[slow] = arr[i];
            slow++;
        }
    }
    arr.length = slow;
    return arr.join('');
}
var leftReverse = function(s,k){
    let len = s.length;
    let i = 0;
    while(i<len-k){
        s = s[len-1]+s;
        i++;
    }
    return s.substr(0,len);
}


//土豪招聘贴身保镖，为提高吸引力，设置了特殊的工资计划。第一天，保镖只能够得到100元的报酬；随后的两天中，每天会得到200元报酬；随后的三天中，每天会得到300元报酬……后续以此类推。
//请你帮忙编写一个程序，在给定天数内能够得到多少报酬。
var sum = function(n){
    let arr = [];//天数数组[1,2,3,4...]
    let i = 1;//循环递增天数
    let sum = 0;//总天数
    while(sum<n){
        arr.push(i);
        sum+=i;
        i++;
    }
    //减去最后一次多余天数
    arr[arr.length-1] = arr[length-1]-(sum-n);
    return arr.reduce((total,item,index)=>{
        return total+item*(index+1)*100;
    },0);
}

//给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
//输入：nums = [3,2,4], target = 6
var twoSum = function(nums,target){
    for(let i =0;i<nums.length;i++){
        for(let j = i+1;j<nums.length;j++){
            if(nums[i]+nums[j]===target){
                return [i,j];
            }
        }
    }
    return [];
}
//给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
var isValid = function(str){
    let leftArr = [];
    let arr = s.split('');
    for(let i=0;i<arr.length;i++){
        if(['(','{','['].includes(arr[i])){
            leftArr.push(arr[i]);
        }else{
            let last = leftArr[leftArr.length-1];
            if(arr[i]===')'&&last==='('){
                leftArr.pop();
            }else if(arr[i]===']'&&last===']'){
                leftArr.pop();
            }else if(arr[i]==='{'&&last==='}'){
                leftArr.pop();
            }else{
                return false;
            }
        }
    }
    return Boolean(!leftArr.length);
}
//最大子数组和
// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
// 子数组 是数组中的一个连续部分。
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
var maxSubArray = function(nums){
    let maxNum = nums[0];
    let num = 0;
    for(let i=0;i<nums.length;i++){
        if(num>O){
            num+=nums[i];
        }else{
            nums=nums[i];
        }
        maxNum = Math.max(nums,maxNum);
    }
    return maxNum;
}
//爬楼梯
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
var climbStairs = function(n){
    if(n<3) return n;
    let l1 = 1;
    let l2 = 2;
    for(let i =3;i<n;i++){
        let temp = l1;
        l1 = l2;
        l2 = temp+l2;
    }
    return l2;
}

//二叉树的遍历
// 给定一个二叉树的根节点 root ，返回它的 中序 遍历。
var inorderTraversal = function(root){
    let node = root;
    let stack = [];//放node节点
    let list = [];//放节点值
    while(node||stack.length){
        if(node){
            stack.push(node);
            node = node.left;
        }else{
            node = stack.pop();
            list.push(node.val);
            node = node.right;
        }
    }
    return list;
}
//给你一个二叉树的根节点 root ， 检查它是否轴对称。
//左右完全对称，左子节点等于右子节点，且左子节点的左子树等于右子节点的右子树，且左子节点的右子树等于右子节点的左子树
var isSymmetric = function(root){
    if(!root) return true;
    function fn(node1,node2){
        if(!node1&&!node2) return true;
        if(!node1||!node2) return false;
        if(node1.val!==node2.val) return false;
        return fn(node1.left,node2.right)&&fn(node1.right,node2.left);
    }
    return fn(root.left,root.right);
}

//给定一个二叉树，找出其最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
var maxDepth = function(root){
    if(!root) return 0;
    let left = maxDepth(root.left);
    let right = maxDepth(root.right);
    return Math.max(left,right)+1;
}
//借助队列(数组存放当前层级的所有数据),一个变量记录层级
var maxDepth = function(root){
    if(!root) return 0;
    let queue = [];
    let level = 0;
    queue.push(root);
    while(queue.length){
        //当前层级数据长度
        let len = queue.length;
        for(let i=0;i<len;i++){
            // 删除当前层级数据
            const node = queue.shift();
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
            level++;
        }
    }
    return level;
}

//买卖股票的最佳时机
// 输入：[7,1,5,3,6,4]
// 输出：5
// 动态规划,变量记录每天的最大值
var maxProfit = function(prices){
    let maxNum = 0;//最大值
    let minPrice = prices[0];//前几天的最小值
    for(let i=1;i<prices.length;i++){
        let price = prices[i]-minPrice;
        maxNum = Math.max(price,maxNum);
        minPrice = Math.min(prices[i],minPrice);
    }
    return maxNum;
}

//只出现一次的数字
var singleNumber = function(nums){
    let obj = {};
    for(let i=0;i<nums.length;i++){
        if(obj[nums[i]]){
            delete obj[nums[i]];
        }else{
            obj[nums[i]] = 1;
        }
    }
    return Object.keys(obj)[0];
}
var singleNumber = function(nums){
    return nums.reduce((a,b)=>a^b);
}
//给你一个链表的头节点 head ，判断链表中是否有环
var hasCycle = function(head){
    let slow = head;
    let fast = head;
    while(fast&&fast.next){
        slow = slow.next;
        fast = fast.next.next;
        if(slow === fast){
            return true;
        }
    }
    return false;
}

//给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
// 输入: nums = [-1,0,3,5,9,12], target = 9     
// 输出: 4  
var search = function(nums,target){
    //循环遍历
    for(let i=0;i<nums.length;i++){
        if(nums[i]===target){
            return i;
        }
    }
    //二分查找,(区间法，找中间值)
    let left = 0;//区间左边界
    let right = nums.length-1;//区间右边界
    while(left<=right){
        let mid = Math.floor((right-left/2));
        if(nums[mid]<target){
            left = mid+1;
        }else if(nums[mid]>target){
            right = mid-1;
        }else{
            return mid;
        }
    }
    return -1;
}
//移除元素
var removeElement = function(nums,val){
    //双指针，快慢指针
    let slow = 0;
    for(let i=0;i<nums.length;i++){
        if(nums[i]!=val){
            nums[slow] = nums[i];
            slow++;
        }
    }
    nums.length = slow;
    return slow;
}
//有序数组的平方
var sortedSquares = function(nums){
    //双指针，最大值一定在两边
    let res = [];
    let left = 0;
    let right = nums.length-1;
    while(left<=right){
        let num1 = Math.pow(nums[left],2);
        let num2 = Math.pow(nums[right],2);
        if(num1<num2){
            res.unshift(num2);
            right--;
        }else{
            res.unshift(num1);
            left++;
        }
    }
    return res;
}
//长度最小的子数组
// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。
var minSubArrayLen = function(nums,s){
    //双指针，（滑动窗口）
    let res = Infinity;
    let sum = 0;//滑动区间累加值
    let start = 0;//左滑动指针
    //i右滑动指针
    for(let i=0;i<nums.length;i++){
        sum+=nums[i];
        while(sum>=s){
            //滑动窗口长度
            res = Math.min(res,(i-start+1));
            //滑动指针起点滑动
            sum-=nums[start];
            start++;
        }
    }
    return res === Infinity?0:res;
}

//螺旋矩阵II
// 给定一个正整数 n，生成一个包含 1 到 $n^2$ 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。
// 示例:
// 输入: 3 输出: [ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]
// [ 1, 2, 3 ]
// [ 8, 9, 4 ]
// [ 7, 6, 5 ]
// 模拟顺时针画矩阵的过程:
// 填充上行从左到右
// 填充右列从上到下
// 填充下行从右到左
// 填充左列从下到上
var generateMatrix = function(n) {
    //创建二维数组，填充0
    let arr = new Array(n).fill(0).map((item)=>new Array(n).fill(0));
    let loop = Math.floor(n/2);//旋转圈数
    let mid = Math.floor(n/2);//中间位置
    let count = 1;//填充数字
    let offset = 1;//每层少填充数字
    let x = 0,y=0;//起始位置
    while(loop>0){
        let row = x, col = y;
        //从左到右
        for(;row<y+n-offset;col++){
            arr[row][col] = count++;
        }
        //从上到下
        for(;col<x+n-offset;col++){
            arr[row][col] = count++;
        }
        //从右到左
        for(;row>x;row--){
            arr[row][col] = count++;
        }
        //从下到上
        for(;col>y;col--){
            arr[row][col] = count++;
        }
        x++;
        y++;
        offset+=2;
        loop--;
    }
    // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
    if (n % 2 === 1) {
        arr[mid][mid] = count;
    }
    return arr;
}
//排序
//选择排序
var sortArr = function(arr){
    for(let i=0;i<arr.length;i++){
        for(let j = i+1;j<arr.length;j++){
            if(arr[i]>arr[j]){
                [arr[i],arr[j]] = [arr[j],arr[i]];
            }
        }
    }
    return arr;
}
//快速排序  二分法
var quickSort = function(arr){
    if(arr.length<=1) return arr;
    let mid = Math.floor(arr.length/2);
    let left = [],right  =[];
    for(let i=0;i<arr.length;i++){
        if(arr[i]<arr[mid]){
            left.push(arr[i])
        }else if(arr[i>arr[mid]]){
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(arr[mid],quickSort(right));
}

//冒泡排序 [2,1,4,3,5,6]
var bubbleSort = function(arr){
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length;j++){
            if(arr[j]>arr[j+1]){
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
            }
        }
    }
    return arr;
}

//实现一个new
var mynew = function(Fn,...args){
    //1.创建一个对象
    const obj = {};
    //2.对象的原型指向构造函数的原型
    obj.__proto__ = Fn.prototype;
    //3.改变构造函数this指向
    const result = Fn.apply(obj,args)
    //4.执行返回结果
    return result instanceof Object ? result : obj;
}

//深度克隆
var clone = function(origin){
    let res;
    if(typeof origin != 'object') {
        res = origin;
    }else{
        res = Array.isArray(origin)?[]:{};
        for(let key in origin){
            if(origin.hasOwnProperty(key)){
                if(typeof origin[key] === 'object'){
                    res[key] = clone(origin[key]);
                }else{
                    res[key] = origin[key];
                }
            }
        }
    }
    return res;
}

//instanceof 检测构成函数的原型属性是否出现在实例的原型链上
var instance = function(left,right){
    let proto = left.__proto__;
    let prototype = right.prototype;
    while(true){
        if(proto === null) return false;
        if(proto === prototype){
            return true;
        }
        proto = proto.__proto__;
    }
}

//防抖 time时间只执行最后一次
var debounce = function(fn,time){
    let timer = null;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
            fn.apply(this,arguments)
        },time)
    }
}
//节流 time时间只执行一次
var throttle = function(fn,time){
    let canRun = true;
    return function(){
        if(!canRun) return;
        canRun = false;
        setTimeout(function(){
            fn.apply(this,arguments);
            canRun = true;
        },time)
    }
}

//call实现
Function.prototype.myCall = function(context){
    if(typeof this != 'function') return;
    let args = [...arguments].slice(1);
    let result = null;
    context = context || window;
    context.fn = this;
    result = context.fn(...args);
    delete context.fn;
    return result;
}
//apply实现
Function.prototype.myApply = function(context){
    if(typeof this != 'function') return;
    let args = [...arguments].slice(1);
    let result = null;
    context = context || window;
    context.fn = this;
    result = context.fn(args)
    delete context.fn;
    return result;
}
//bind实现
Function.prototype.myBind = function(context){
    if(typeof this != 'function') return;
    let args = [...arguments].slice(1);
    let fn = this;
    return function(){
        fn.apply(context,args.concat([...arguments]));
    }
}

//柯里化
var curry = function(fn){
    return function currys(...args){
        if(args.length<fn.length){
            return function(){
                return currys(...args.concat([...arguments]))
            }
        }
        fn(...args);
    }
}


//promise
const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECT = 'reject';
function Promise1(fn){
    let self = this;
    self.status = PENDING;//当前状态
    self.data = undefined;//promise值
    self.onResolveCallback = [];
    self.onRejectCallback = [];

    function resolve(value){
        setTimeout(()=>{
            if(self.status === PENDING){
                self.status = RESOLVE;
                self.data = value;
                self.onResolveCallback.forEach((cb)=>cb(value));
            }
        })
    }

    function reject(value){
        setTimeout(()=>{
            if(self.status === PENDING){
                self.status = REJECT;
                self.data = value;
                self.onRejectCallback.forEach((cb)=>cb(value));
            }
        })
    }
    fn(resolve,reject);
}
Promise1.prototype.then = function(onResolve,onReject){
    let self = this;
    //三个状态
    if(self.status === RESOLVE){
        return new Promise1(function(resolve,reject){
            let res = onResolve(self.data);
            if(res instanceof Promise1){
                res.then(resolve,reject);
            }
            resolve(res);
        })
    }
    if(self.status === REJECT){
        return new Promise1(function(resolve,reject){
            let res = onReject(self.data);
            if(res instanceof Promise1){
                res.then(resolve,reject);
            }
        })
    }
    if(self.status === PENDING){
        return new Promise1(function(resolve,reject){
            self.onResolveCallback.push(function(){
                let res = onResolve(self.data);
                if(res instanceof Promise1){
                    res.then(resolve,reject);
                }
                resolve(res);
            })
            self.onRejectCallback.push(function(){
                let res = onReject(self.data);
                if(res instanceof Promise1){
                    res.then(resolve,reject);
                }
            })
        })
    }
}





