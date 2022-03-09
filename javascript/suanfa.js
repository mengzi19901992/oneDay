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