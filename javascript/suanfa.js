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


// 12、给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
// 输入: nums = [-1,0,3,5,9,12], target = 9     
// 输出: 4       
// 解释: 9 出现在 nums 中并且下标为 4
// 二分查找，因为是有序且不重复数组，可以使用二分查找（区间）
var search = function(nums,target){
    let left = 0;//区间左下标
    let right = nums.length-1;//区间右下标
    while(left<=right){
        let mid = left + Math.floor((right-left)/2);//找出区间中间下标
        if(nums[mid]<target){//如果中间值小于target，证明target在中间值的右侧
            //把区间左下标设置成中间值的右侧第一个
            left = mid+1;
        }else if(nums[mid]>target){//如果中间值大于target，证明target在中间值的左侧，则把区间右下标设置成中间值的左侧第一个
            right = mid-1;
        }else{
            return mid;
        }
    }
    return -1;
}

// 13、移除元素
// 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须仅使用 $O(1)$ 额外空间并原地修改输入数组。
//1)这个题目暴力的解法就是两层for循环，一个for循环遍历数组元素 ，第二个for循环更新数组。
var removeElement = function(nums,val){
    let size = nums.length;
    for(let i =0; i<size;i++){
        if(nums[i]===val){
            for(let j = i;j<size;j++){
                nums[j] = nums[j+1];
            }
            i--; // 因为下标i以后的数值都向前移动了一位，所以i也向前移动一位
            size--;// 此时数组的大小-1
        }
    }
    return size;
}
//2)双指针法（快慢指针法）： 通过一个快指针和慢指针在一个for循环下完成两个for循环的工作。
var removeElement = function(nums,val){
    let slow = 0;//慢指针
    //快指针
    for(let fast = 0;fast<nums.length;fast++){
        if(nums[fast]!==val){
            nums[slow++] = nums[fast];
        }
    }
    return slow;
}


//14、有序数组的平方
// 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

// 示例 1： 输入：nums = [-4,-1,0,3,10] 输出：[0,1,9,16,100] 解释：平方后，数组变为 [16,1,0,9,100]，排序后，数组变为 [0,1,9,16,100]
//1)先平方在排序
var sortedSquares = function(nums){
    for(let i=0;i<nums.length;i++){
        num[i] = Math.pow(nums[i],2);
    }
    return nums.sort((a,b)=>a-b);
}
//2)双指针法
// 数组其实是有序的， 只不过负数平方之后可能成为最大数了。
// 那么数组平方的最大值就在数组的两端，不是最左边就是最右边，不可能是中间。
// 此时可以考虑双指针法了，i指向起始位置，j指向终止位置。
// 定义一个新数组result
var sortedSquares = function(nums){
    let i = 0,j = nums.length-1,arr = [];
    while(i<=j){
        if(Math.pow(nums[j],2)>Math.pow(nums[i],2)){
            arr.unshift(Math.pow(nums[j],2));
            j--;
        }else{
            arr.unshift(Math.pow(nums[i],2));
            i++;
        }
    }
    return arr;
}


//15、长度最小的子数组
// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。
// 示例：
// 输入：s = 7, nums = [2,3,1,2,4,3] 输出：2 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
//1)两个for循环，然后不断的寻找符合条件的子序列
var minSubArrayLen = function(nums,s){
    let result = Infinity;
    let sum = 0;
    for(let i=0;i<nums.length;i++){
        sum = 0;
        for(let j = i;j<nums.length;j++){
            sum += nums[j];
            if(sum>=s){
                result = Math.min(result,j-i+1);
                break;
            }
        }
    }
    return result===Infinity?0:result;
}
//2)滑动窗口(双指针)
var minSubArrayLen = function(nums,s){
    let start = 0; // 滑动窗口起始位置
    let result = Infinity;//滑动窗口长度
    let sum = 0;//滑动窗口数值之和
    for(let i=0;i<nums.length;i++){
        sum+=nums[i];
        while(sum>=s){
            //取滑动窗口的长度
            result = Math.min(result,i-start+1);
            sum -= nums[start++];//这里体现出滑动窗口的精髓之处，不断变更start（子序列的起始位置）
        }
    }
    return result===Infinity?0:result;
}

//16、螺旋矩阵II
//https://programmercarl.com/0059.%E8%9E%BA%E6%97%8B%E7%9F%A9%E9%98%B5II.html#%E6%80%9D%E8%B7%AF
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
/**
 * @param {number} n
 * @return {number[[][]]}
 */
var generateMatrix = function(n) {
    let startX = startY = 0;   // 起始位置
    let loop = Math.floor(n/2);   // 旋转圈数
    let mid = Math.floor(n/2);    // 中间位置
    let offset = 1;    // 控制每一层少填充元素个数
    let count = 1;     // 更新填充数字
    //创建二维数组，填充0
    let res = new Array(n).fill(0).map(() => new Array(n).fill(0));

    while (loop--) {
        let row = startX, col = startY;
        // 上行从左到右（左闭右开）
        for (; col < startY + n - offset; col++) {
            res[row][col] = count++;
        }
        // 右列从上到下（左闭右开）
        for (; row < startX + n - offset; row++) {
            res[row][col] = count++;
        }
        // 下行从右到左（左闭右开）
        for (; col > startX; col--) {
            res[row][col] = count++;
        }
        // 左列做下到上（左闭右开）
        for (; row > startY; row--) {
            res[row][col] = count++;
        }

        // 更新起始位置
        startX++;
        startY++;

        // 更新offset
        offset += 2;
    }
    // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
    if (n % 2 === 1) {
        res[mid][mid] = count;
    }
    return res;
};

var generateMatrix = function(n){
    let startX = 0;//起始位置x位置，横向坐标
    let startY = 0;//起始位置y位置，纵向坐标
    let loop = Math.floor(n/2);//循环圈数
    let mid = Math.floor(n/2);//中间位置
    let count = 1;//填充数字
    let offset = 1;//每层减少填充元素个数
    //填充二维数组
    let res = new Array(n).fill(0).map((item)=>new Array(n).fill(0));
    while(loop--){
        //每一层循环的起始位置
        let x = startX;
        let y = startY;
        //上行从左向右（左闭右开）
        for(;y<startY+n-offset;y++){
            res[x][y] = count++;
        }
        //右列从上到下（左闭右开）
        for(;x<startX+n-offset;x++){
            res[x][y] = count++;
        }
        //下行从右到左（左闭右开）
        for(;y>startY;y--){
            res[x][y] = count++;
        }
        //左列从下到上（左闭右开）
        for(;x>startX;x--){
            res[x][y] = count++;
        }

        //下一层循环
        // 更新起始位置
        startX++;
        startY++;
        // 更新每层减少填充的元素个数
        offset += 2;
    }
    // 如果n是奇数，需要给矩阵中间位置单独赋值
    if(n%2===1){
        res[mid][mid] = count;
    }
    return res;
}


//17、排序
//输入:[5,3,6,1,4,2]；输出:[1,2,3,4,5,6]
//1）选择排序 暴力方法，两个for循环
//通过比较首先选出最小的数放在第一个位置上，然后在其余的数中选出次小数放在第二个位置上,依此类推,直到所有的数成为有序序列。
var sortArr = function(arr){
    for(let i=0;i<arr.length;i++){
        for(let j = i+1;j<arr.length;j++){
            if(arr[i]>arr[j]){
                let num = arr[i]
                arr[i] = arr[j];
                arr[j] = num;
            }
        }
    }
    return arr;
}
//2)快速排序  二分法
// 先从数列中取出一个数作为基准数
// 分区过程，将比这个数大的数全放到它的右边，小于或等于它的数全放到它的左边
// 再对左右区间重复第二步，直到各区间只有一个数
var quickSort = function(arr){
    if(arr.length<=1) return arr;//递归终止条件
    let midIndex = Math.floor(arr.length/2);//中间数字下标
    let mid = arr.splice(midIndex,1)[0];//取出中间的数字
    let left = [],right = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i]<mid){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([mid],quickSort(right));//递归，再把左数组分成两半进行排序，右数组同理。
}
//3）冒泡排序
var bubbleSort = function(arr){
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length-i-1;j++){
            if(arr[j]>arr[j+1]){//相邻元素两两对比
                let num = arr[j];//元素交换   
                arr[j]=arr[j+1];
                arr[j+1]=num;
            }
        }
    }
    return arr;
}

console.log(bubbleSort([5,3,6,1,4,2]))


// 例如：

// A -> 1
// B -> 2
// C -> 3
// ...
// Z -> 26
// AA -> 27
// AB -> 28
// ...

// 示例 1：

// 输入：columnNumber = 1
// 输出："A"
// 示例 2：

// 输入：columnNumber = 28
// 输出："AB"
// 示例 3：

// 输入：columnNumber = 701
// 输出："ZY"
// 示例 4：

// 输入：columnNumber = 2147483647
// 输出："FXSHRXW"