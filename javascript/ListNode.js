function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
//1.题意：删除链表中等于给定值 val 的所有节点。
// 示例 
// 输入：head = [1,2,6,3,4,5,6], val = 6
// 输出：[1,2,3,4,5]
//新建一个头节点，最后返回头节点的next
var removeElements = function(head,val){
    const ret = new ListNode(0,head);
    let pre = ret;
    let node = ret.next;
    while(node){
        if(node.val===val){
            pre.next = node.next;
            node = node.next;
        }else{
            pre = node;
            node = node.next;
        }
    }
    return ret.next;
}
//自己实现，兼容head为空或head一个或多个单head的val相等
var delList = function(head,val){
    //链表为空或者只有一个
    if(!head||!head.next){
        if(!head||head.val===val) return null;
        return head;
    }
    let pre = head;
    let node = head.next;
    while(node){
        let next = node.next;
        if(node.val===val){
            pre.next = next;
            node = next;
        }else{
            pre = node;
            node = node.next;
        }
    }
    if(head.val===val){
        head = head.next;
    }
    return head;
}


//2.反转链表
// 题意：反转一个单链表。
// 示例: 输入: 1->2->3->4->5->NULL 输出: 5->4->3->2->1->NULL
//1).双指针法
var reverseList = function(head){
    if(!head || !head.next) return head;
    let pre = null;
    let cur = head;
    while(cur){
        let temp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = temp;
    }
    return pre;
}
//2).递归法
var reverseList = function(head){
    function reverse(pre, head) {
        if(!head) return pre;
        const temp = head.next;
        head.next = pre;
        pre = head
        return reverse(pre, temp);
    }
    return reverse(null,head)
}

//3.两两交换链表中的节点
// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
// 示例 输入[1,2,3,4] 输出[2,1,4,3]
//使用虚拟头节点
var exchangeList = function(head){
    let ret = new ListNode(0,head);
    let temp = ret;
    //有两个next节点，则两个next才可以交换
    while(temp.next&&temp.next.next){
        let pre = temp.next;
        let cur = temp.next.next;
        pre.next = cur.next;
        cur.next = pre;
        temp.next = cur;
        temp = pre;
    }
    return ret.next;
}

//4.删除链表的倒数第N个节点
//输入：head = [1,2,3,4,5], n = 2 输出：[1,2,3,5]
// 思路:双指针的经典应用，如果要删除倒数第n个节点，让fast移动n步，然后让fast和slow同时移动，直到fast指向链表末尾。删掉slow所指向的节点就可以了。
var deleteList = function(head,n){
    let ret = new ListNode(0,head);
    let fast = ret;
    let slow = ret;
    while(n--) fast = fast.next;
    while (fast.next !== null) {
        fast = fast.next; 
        slow = slow.next
    };
    slow.next = slow.next.next;
    return ret.next;
}

//5.链表相交
// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。
// 简单来说，就是求两个链表交点节点的指针。 这里同学们要注意，交点不是数值相等，而是指针相等。
// 为了方便举例，假设节点元素数值相等，则节点指针相等。

//链表长度
var getListLen = function(head) {
    let len = 0, cur = head;
    while(cur) {
       len++;
       cur = cur.next;
    }
    return len;
} 
var getIntersectionNode = function(headA, headB) {
    let curA = headA,curB = headB, 
        lenA = getListLen(headA),
        lenB = getListLen(headB);
    if(lenA < lenB) {
        // 下面交换变量注意加 “分号” ，两个数组交换变量在同一个作用域下时
        // 如果不加分号，下面两条代码等同于一条代码: [curA, curB] = [lenB, lenA]
        [curA, curB] = [curB, curA];
        [lenA, lenB] = [lenB, lenA];
    }
    let i = lenA - lenB;
    while(i-- > 0) {
        curA = curA.next;
    }
    while(curA && curA !== curB) {
        curA = curA.next;
        curB = curB.next;
    }
    return curA;
};

// 6.环形链表II
// 题意： 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
// 为了表示给定链表中的环，使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。
//双指针法，快慢指针相遇则环形链表
// 可以使用快慢指针法，分别定义 fast 和 slow 指针，从头结点出发，fast指针每次移动两个节点，slow指针每次移动一个节点，如果 fast 和 slow指针在途中相遇 ，说明这个链表有环。
var loopList = function(head){
    if(!head||!head.next) return null;
    let slow = head;
    let fast = head;
    while(fast&&fast.next){
        slow = slow.next;
        fast = fast.next.next;
        //相等则是环形链表
        if(slow === fast){
            slow = head;
            //慢指针从头开始，与快指针相遇的节点就是入口节点
            while(slow !== fast){
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    return null;
}
var detectCycle = function(head) {
    if(!head || !head.next) return null;
    let slow =head.next, fast = head.next.next;
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if(fast == slow) {
            //慢指针从头开始，与快指针相遇的节点就是入口节点
            slow = head;
            while (fast !== slow) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    return null;
};






