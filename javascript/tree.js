let treeList = {
    data:1,
    left:{
        data:2,
        left:{
            data:4
        },
        right:{
            data:5
        }
    },
    right:{
        data:3,
        left:{
            data:6,
            left:{
                data:8
            }
        },
        right:{
            data:7,
            right:{
                data:9
            }
        }
    }
}

//遍历
//先序遍历 递归
function bftraversal(node){
    if(!node) return;
    console.log(node.data);
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
        console.log(cur_node.data);
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








