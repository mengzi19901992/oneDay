//https://programmercarl.com/

//1.土豪招聘贴身保镖，为提高吸引力，设置了特殊的工资计划。第一天，保镖只能够得到100元的报酬；随后的两天中，每天会得到200元报酬；随后的三天中，每天会得到300元报酬……后续以此类推。
// 请你帮忙编写一个程序，在给定天数内能够得到多少报酬。
// 输入：天数；输出：累计报酬
const sum = (n) => {
    let i = 1 // 循环次数,递增天数
    let num = 0 // 总天数
    const arr = [] // 天数列表 [1,2,3,4...]
    while (n > num) {
        arr.push(i)
        num += i
        i+=1
    }
    arr[arr.length - 1] = arr[arr.length - 1] - (num - n)
    const result = arr.reduce((total, item, index) => {
        return total + item * (index + 1) * 100
    }, 0)
    return result;
}

sum(1)//100
sum(4)//800

// 2.给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
// 你可以按任意顺序返回答案。
// 输入：nums = [3,2,4], target = 6
// 输出：[1,2] 输入：nums[1]+nums[2]=6
var twoSum = function(nums, target) {
    for(let i = 0;i<nums.length;i++){
        for(let j = i+1;j<num.length;j++){
            if(nums[i]+num[j]===target){
                return [i,j]
            }
        }
    }
    return []
};

// 3.给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 输入：s = "()[]{}"
// 输出：true
 var isValid = function(s) {
    let leftArr = [];
    if(!s.length) return false;
    let arr = s.split('');
    for(let i=0; i<arr.length; i++){
        if(['(','[','{'].includes(arr[i])){
            leftArr.push(arr[i])
        }else{
            let last = leftArr[leftArr.length-1];
            if(arr[i]===')'&&last==='('){
                leftArr.pop();
            }else if(arr[i]===']'&&last==='['){
                leftArr.pop();
            }else if(arr[i]==='}'&&last==='{'){
                leftArr.pop();
            }else{
                return false;
            }
        }
    }
    return Boolean(!leftArr.length);
};

//4.最大子数组和
// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
// 子数组 是数组中的一个连续部分。
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
var maxSubArray = function(nums){
    let res = nums[0];//记忆一个最大值
    let sum = 0;//累加值，只保留正数，负数抛弃
    for(let i=0;i<nums.length;i++){
        if(sum>0){
            sum += nums[i];
        }else{
            sum = nums[i];
        }
        res = Math.max(res,sum);//取每次累加的最大值
    }
    return res;
}

//5.爬楼梯
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
//1:1, 1
//2:2，1 1；2
//3:3  1 2；1 1 1； 2 1
//4:5
//每一阶等于前两阶梯方法的和（因为每次你可以爬 1 或 2 个台阶，所以前两阶梯的方法数都可以通过+1或+2得到后一阶梯方法数）

//1）递归，容易溢出
var climbStairs = function(n) {
    if(n===1||n===2)return n;
    return climbStairs(n-1)+climbStairs(n-2);
}
//2）动态规划
var climbStairs = function(n){
    if(n===1||n===2)return n;
    let l1 = 1,l2 = 2;//记录两个阶梯的方法数
    for(let i= 3; i<n; i++){
        let l = l1;//记录上上一个阶梯数
        //动态更新两个阶梯方法数
        l1 = l2;
        l2 = l + l2;
    }
    return l2;
}



//         1
//     2       3
// 4     5   6

//6.二叉树的中序遍历
// 给定一个二叉树的根节点 root ，返回它的 中序 遍历。
var inorderTraversal = function(root) {
    //stack记录节点，list记录val;优先遍历root左子树，插入stack
    let stack = [],list = [];
    while(root||stack.length){
        if(root){
            stack.push(root)
            root = root.left;
        }else{
            root = stack.pop();
            list.push(root.val);
            root = root.right
        }
    }
    return list;
};



//7.给你一个二叉树的根节点 root ， 检查它是否轴对称。
//左右完全对称，左子节点等于右子节点，且左子节点的左子树等于右子节点的右子树，且左子节点的右子树等于右子节点的左子树
var isSymmetric = function(root) {
    if(!root) return true;
    function fn(node1,node2){
        if(!node1&&!node2) return true;
        if(!node1||!node2) return false;
        if(node1.val!==node2.val) return false;
        return fn(node1.left,node2.right)&&fn(node1.right,node2.left);
    }
    return fn(root.left,root.right);
};

//8.给定一个二叉树，找出其最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
//递归查找左右子树，找到末尾节点0+加当前层级1
var maxDepth = function(root) {
    if(!root) return 0;
    let left = maxDepth(root.left);
    let right = maxDepth(root.right);
    return Math.max(left,right)+1;
};

//         1
//     2       3
// 4     5   6
//借助队列(数组存放当前层级的所有数据),一个变量记录层级
var maxDepth = function(root){
    if(!root) return 0;
    let queue = [];
    let level = 0;//层级
    queue.push(root);
    while(queue.length){
        //当前层级的数据长度
        let len = queue.length;
        for(let i=0;i<len;i++){
            //删除当前层级数据
            const node = queue.shift();
            //添加下一层级数据
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        level++;
    }
    return level;
}


//9.买卖股票的最佳时机
// 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
// 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
// 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

// 输入：[7,1,5,3,6,4]
// 输出：5
// 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
//      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

//1) 一个变量记录每天买卖股票利润，一个变量记录取最大值
// 两个for循环，时间复杂度o n*n，超出时间限制
var maxProfit = function(prices) {
    let num = 0;
    let max = 0;
    for(let i=0;i<prices.length;i++){
        for(let j=i+1; j<prices.length;j++){
            num = prices[j]-prices[i];
            max = Math.max(max,num);
        }
    }
    return max;
};
//2）动态规划,一个值记录今天之前的最小值（可以算出今天最大利润），一个值记录最大利润
// 计算【今天之前最小值买入，今天卖出的获利】，也即【今天卖出的最大获利】
// 比较【每天的最大获利】，取最大值即可
// 时间复杂度o(n)
var maxProfit = function(prices){
    let max = 0;//最大利润
    let l = prices[0];//今天之前的最小值
    for(let i=1;i<prices.length;i++){
        max = Math.max(max,prices[i]-l);
        l = Math.min(l,prices[i]);
    }
    return max;
}

//10.只出现一次的数字
// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 说明：
// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
// 输入: [4,1,2,1,2]
// 输出: 4
//利用对象key值的唯一性
var singleNumber = function(nums) {
    var obj = {};
    for(let i=0;i<nums.length;i++){
        if(obj[nums[i]]){
            delete obj[nums[i]];
        }else{
            obj[nums[i]] = 1;
        }
    }
    return Object.keys(obj)[0];
};
//不实用额外空间，操作当前数组
var singleNumber = function(nums) {
    return nums.reduce((a,b)=>a^b);
};


// 11、给你一个链表的头节点 head ，判断链表中是否有环。

// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，
// 评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。
// 如果链表中存在环 ，则返回 true 。 否则，返回 false 。

// 使用快慢指针，快慢指针相遇，说明有环
var hasCycle = function(head) {
    let fast = head;//快指针
    let slow = head;//慢指针
    while(fast != null && fast.next != null){
        slow = slow.next;
        fast = fast.next.next;
        //快慢指针相遇，说明有环
        if(slow == fast) return true;
    }
    return false;
};