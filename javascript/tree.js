let treeList = {
    val:1,
    left:{
        val:2,
        left:{
            val:4
        },
        right:{
            val:5
        }
    },
    right:{
        val:3,
        left:{
            val:6,
            left:{
                val:8
            }
        },
        right:{
            val:7,
            right:{
                val:9
            }
        }
    }
}

//遍历
//先序遍历 递归
function bftraversal(node){
    if(!node) return;
    // console.log(node.val);
    bftraversal(node.left);
    bftraversal(node.right);
}
bftraversal(treeList);

// 循环遍历
function forTraversal(node){
    if(!node) return;
    let cur_node = node;
    let stack = [];
    while(cur_node){
        // console.log(cur_node.val);
        if(cur_node.right){
            stack.push(cur_node.right);
        }
        if(cur_node.left){
            cur_node = cur_node.left;
        }else{
            cur_node = stack.pop();
        }
    } 
}
forTraversal(treeList);

//中序遍历
// 前序：根左右 -> 右左根
// 中序：左根右 -> 右根左
// 后序：左右根 -> 根右左
//         1
//     2       3
// 4        5
var inorderTraversal = function(root) {
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
let List = {
    val:1,
    left:{
        val:2,
        left:{
            val:4
        },
    },
    right:{
        val:3,
        left:{
            val:5
        },
    }
}
const a = inorderTraversal(List)
console.log(a)




