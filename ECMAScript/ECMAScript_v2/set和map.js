/* const set = new Set([1,2])  
Set // {1,2}
Set 构建参数是 带有iterable的数据结构。值类型不限，值唯一
属性
Size
方法
Add delete clear has
视NaN 等于本身
迭代方法
Keys values entries foreach 默认迭代器是values


weakSet
保存对象弱引用 只能保存对象引用，gc回收时会无视weakset，即便weakset还保存引用，也会被回收。
构造函数是 WeakSet  参数是带有iterable的数据结构但是值得是对象 [[1],[2]]这样创建的weakset 保存的是[1],[2]
属性
无
方法
Add delete has
不能遍历
*/
let set = new Set([1, 2, 3, 4, 5, 6]) // Set(6) {1, 2, 3, 4, 5, 6}

/*
Map 键类型不限 
构造函数参数 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构

属性
Size 
方法
Get set delete clear has
迭代方法
Keys values entries foreach 默认迭代器是entries 
视NaN 等于本身

WeakMap 键名弱引用，不计入GC 键值为正常引用 键名只能是对象
属性
无
方法
Set get delete has
不可遍历 */
