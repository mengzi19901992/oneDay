// 1.反转字符串
// 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。
// 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 $O(1)$ 的额外空间解决这一问题。
// 示例 1：
// 输入：["h","e","l","l","o"]
// 输出：["o","l","l","e","h"]
//双指针法
var reverseString = function(arr){
    let left = 0,right = arr.length-1;
    while(left<right){
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
    return arr;
}
//2.反转字符串II
// 给定一个字符串 s 和一个整数 k，你需要对从字符串开头算起的每隔 2k 个字符的前 k 个字符进行反转。
// 如果剩余字符少于 k 个，则将剩余字符全部反转。
// 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
// 示例:
// 输入: s = "abcdefg", k = 2
// 输出: "bacdfeg"
//思路：按照k的长度拆分，奇数反转，偶数不反转
var reverseStr = function(s,k){
    let arr = [];
    for(let i=0;i<s.length;i+=k){
        arr.push(s.substr(i,k));
    }
    for(let i=0;i<arr.length;i++){
        if(i%2==0){
            arr[i] = arr[i].split('').reverse().join('');
        }
    }
    return arr.join('');
}
//3.替换空格
// 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
// 示例 1： 输入：s = "We are happy."
// 输出："We%20are%20happy."
var strTrim = function(s){
    // return s.replace(/\s/g,'%20');
    let arr = s.split(' ');
    return arr.join('%20');
}
//首先扩充数组到每个空格替换成"%20"之后的大小。然后从后向前替换空格，也就是双指针法
var replaceSpace = function(s) {
    // 字符串转为数组
   const strArr = Array.from(s);
   let count = 0;
   // 计算空格数量
   for(let i = 0; i < strArr.length; i++) {
     if (strArr[i] === ' ') {
       count++;
     }
   }
   let left = strArr.length - 1;
   let right = strArr.length + count * 2 - 1;
   while(left >= 0) {
     if (strArr[left] === ' ') {
       strArr[right--] = '0';
       strArr[right--] = '2';
       strArr[right--] = '%';
       left--;
     } else {
       strArr[right--] = strArr[left--];
     }
   }
   // 数组转字符串
   return strArr.join('');
};

//3.给定一个字符串，逐个翻转字符串中的每个单词。
// 示例 1：
// 输入: "the sky  is   blue"
// 输出: "blue is sky the"
var strReverse = function(s){
    let arr = s.split(' ');
    arr = arr.filter((item)=>item != '').reverse();
    return arr.join(' ');
}
//解题思路如下：
// 拆分数组移除多余空格
// 数组反转
// 数组拼接
var strReverse = function(s){
    let arr = s.split(' ');
    //删除多余空格
    let slow=0;
    //双指针，快慢指针
    for(let i = 0;i<arr.length;i++){
        if(arr[i]!==''){
            arr[slow] = arr[i];
            slow++;
        }
    }
    console.log(arr);
    //这一步很关键，把后边多余数组项的删除
    arr.length = slow;
    console.log(arr);
    //数组反转,双指针,左右指针
    let left = 0,right = arr.length-1;
    while(left<right){
        let temp = arr[left];
        arr[left] = arr[right]
        arr[right] = temp;
        left++;
        right--;
    }
    return arr.join(' ');
}

//4.左旋转字符串
// 字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。

// 示例 1：
// 输入: s = "abcdefg", k = 2
// 输出: "cdefgab"
var leftReverse = function(s,k){
    let arr = Array.from(s);
    len = arr.length;
    arr.length = arr.length+k;
    //增加数组长度,把数组前几项后移
    for(let i=0;i<k;i++){
        arr[len+i] = arr[i];
        arr[i] = '';
    }
    //双指针，删除多余''//或者使用arr.splice(0,k);
    let slow = 0;
    for(let i=0;i<arr.length;i++){
        if(arr[i] !== ''){
            arr[slow] = arr[i];
            slow++;
        }
    }
    arr.length = len;
    return arr.join('');
}
// 输入: s = "abcdefg", k = 2
// 输出: "cdefgab"
// 思路：把字符串后length-k个一个一个放到前边，然后截取length个
var reverseLeftWords = function(s,k){
    const len = s.length;
    let i = 0;
    while(i< len-k){
        s = s[len-1]+s;
        i++;
    }
    return s.slice(0,len)
}

//5.实现 strStr() 函数 //todo
// 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
// 示例 1: 输入: haystack = "hello", needle = "ll" 输出: 2
//KMP的经典思想就是:当出现字符串不匹配时，可以记录一部分之前已经匹配的文本内容，利用这些信息避免从头再去做匹配。
var strStr = function (haystack, needle) {
    if (needle.length === 0) return 0;
    const getNext = (needle) => {
        let next = [];
        let j = -1;
        next.push(j);

        for (let i = 1; i < needle.length; i++) {
            while (j >= 0 && needle[i] !== needle[j + 1]){
                j = next[j];
            }
            if (needle[i] === needle[j + 1]){
                j++;
            }
            next.push(j);
        }
        return next;
    }

    let next = getNext(needle);
    let j = -1;
    for (let i = 0; i < haystack.length; i++) {
        while (j >= 0 && haystack[i] !== needle[j + 1]){
            j = next[j];
        }
        if (haystack[i] === needle[j + 1]){
            j++;
        }
        if (j === needle.length - 1){
            return (i - needle.length + 1);
        }   
    }
    return -1;
};
var strStr = function(haystack, needle){
    if(needle.length===0)return 0;
    let res = -1;
    for(let i = 0;i<haystack.length;i++){
        if(haystack[i]===needle[0]&&haystack.substr(i,needle.length)===needle){
            res = i;
        }
    }
    return res;
}
strStr('hello','ll')//2

//6.重复的子字符串 //todo
// 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。
// 示例 1:
// 输入: "abab" 
// 输出: True
// 解释: 可由子字符串 "ab" 重复两次构成。
// 输入: "abcabcabcabc"
// 输出: True
var repeatedSubstringPattern = function (s) {
    if (s.length === 0)
        return false;

    const getNext = (s) => {
        let next = [];
        let j = -1;

        next.push(j);

        for (let i = 1; i < s.length; ++i) {
            while (j >= 0 && s[i] !== s[j + 1])
                j = next[j];
            if (s[i] === s[j + 1])
                j++;
            next.push(j);
        }

        return next;
    }

    let next = getNext(s);

    if (next[next.length - 1] !== -1 && s.length % (s.length - (next[next.length - 1] + 1)) === 0)
        return true;
    return false;
};









