/**
 *去除数组中重复元素
 *
 * @param {*} array 有重复元素的数组
 * @returns 返回一个没有重复元素的新数组
 */
function uniqueArr(array){
    var r = [];
    for(var i = 0; i < array.length; i++) {
        for(var j = i + 1; j < array.length; j++){
            if (array[i] === array[j]) {
                j = ++i;
            }
        }
        r.push(array[i]);
    }
    return r;
}