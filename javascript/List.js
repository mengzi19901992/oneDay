//链表节点
class CreateNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
//单向链表
class LinkList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }
    static createNode(data) {
        return new CreateNode(data);
    }
    //尾部插入
    append(node){
        if(!this.head){
            this.head = node;
            this.tail = node;
            this.length++;
        }else{
            let pre_node = this.tail;
            this.tail = node;
            pre_node.next = node; 
            this.length++;
        }
        return this;
    }
    //中间插入
    insert(node,index) {
        if(this.length<index){
            return false;
        }else if(index === 0){
            //插入第一个
            let next_node = this.head;
            this.head = node;
            node.next = next_node;
            this.length++;
        }else if(index===this.length){
            //插入最后一个
            this.append(node);
        }else{
            //插入中间，找到插入位置的上一个与下一个节点
            let pre_node = this.head;
            let next_node = pre_node.next;
            let num = 0;
            //找到插入节点的上一个节点
            while(num<index-1){
                pre_node = pre_node.next;
                next_node = pre_node.next;
                num++;
            }
            pre_node.next = node;
            node.next = next_node;
            this.length++;
        }
        return this;
    }
    //删除节点
    delete(index){
        if(index>=this.length){
            return false;
        }else if(index===0){
            this.head = this.head.next;
            this.length--;
        }else{
            //找到删除的上一个节点与下一个节点
            let pre_node = this.head;
            let next_node = pre_node.next.next;
            let num = 0;
            while(num<index-1){
                pre_node = pre_node.next;
                next_node = pre_node.next.next;
                num++;
            }
            pre_node.next = next_node;
            this.length--;
            return true;
        }
    }
    //查找节点
    find(index){
        if(index>=this.length){
            return false;
        }else{
            let node = this.head;
            let num = 0;
            if(num<index){
                node = node.next;
                num++;
            }
            return node;
        }
    }
}


//链表
let node1 = LinkList.createNode(1);
let node2 = LinkList.createNode(2);
let node3 = LinkList.createNode(3);
let node4 = LinkList.createNode(4);
let node5 = LinkList.createNode(5);
let linkList = new LinkList();
linkList.append(node1).append(node2).append(node3).append(node4).append(node5)

function printList (head){
    let node = head;
    while(node){
        console.log(node.data);
        node = node.next;
    }
}

// printList(linkList.head)
// console.log(linkList)

//反转链表
//递归
function reverse_digui (head){
    if(!head) return null;
    //递归终止条件
    if(head.next==null){
        return head;
    }
    //自己解决不了，甩锅下一个节点
    let new_head = reverse_digui(head.next);
    //下一个节点传递过，从下一个节点开始进行反转
    head.next.next = head;
    head.next = null;
    return new_head;
}

// let newHead = reverse_digui(linkList.head);
// printList(newHead)
//null 1-2-3-4-5

//迭代反转
function reverse_iteration(head){
    if(!head) return head;
    let prev_node = null;//前一个节点
    let node = head;//当前要反转的节点
    while(node){
       let next_node = node.next;//下一个节点
       node.next = prev_node;//对当前节点进行反转
       prev_node = node;//prev_node 向后滑动
       node = next_node;//当前节点向后滑动
    }
    //返回prev_node，当前链表循环结束时prev_node指向最后一个节点
    return prev_node;
}

let newHead1 =reverse_iteration(linkList.head)
printList(newHead1)
