## 算法思想

1. 依次比较相邻的两个数，如果第一个比第二个小，不变。如果第一个比第二个大，调换顺序。一轮下来，最后一个是最大的数

2. 对除了最后一个之外的数重复第一步，直到只剩一个数

## 图形展示
![0](https://user-images.githubusercontent.com/12554487/29298877-8904f286-819d-11e7-803c-a6322801aafa.gif)

## JS代码实现

``` javascript
function bubbleSort(a) {
    console.time('传统冒泡排序耗时');
    for (let i = 0, len = a.length; i < len; ++i) {
        for (let j = 0; j < len - 1 - i; ++j) {
            if (a[j] > a[j + 1]) { //相邻元素两两对比
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
        }
    }
    console.timeEnd('传统冒泡排序耗时');
    return a;
}
let a = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bubbleSort(a));
//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

时间复杂度 O(n2)，稳定

## 改进冒泡排序1

> 设置一标志性变量pos,用于记录每趟排序中最后一次进行交换的位置。由于pos位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到pos位置即可。

``` javascript
function bubbleSortPos(a) {
    console.time('增加pos的冒泡排序耗时');
    let i = a.length - 1 // 初始时，最后位置保持不变
    while (i > 0) {
        let pos = 0;
        for (let j = 0; j < i; ++j) {
            if (a[j] > a[j + 1]) { //相邻元素两两对比
                pos = j; // 纪录交换的位置
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
        }
        i = pos; // 为下一趟排序做准备
    }
    console.timeEnd('增加pos的冒泡排序耗时');
    return a;
}
let a = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bubbleSort1(a));
//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```
## 改进冒泡排序2

> 传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值,我们考虑利用在每趟排序中进行正向和反向两遍冒泡的方法一次可以得到两个最终值(最大者和最小者) , 从而使排序趟数几乎减少了一半。

``` javascript
function bubbleSortTwoWays(a) {
    let low = 0;
    let high = a.length - 1; //设置变量的初始值
    console.time('3.改进后冒泡排序耗时');
    while (low < high) {
        for (let j = low; j < high; ++j) { //正向冒泡,找到最大者
            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
        }
        --high; //修改high值, 前移一位
        for (let j = high; j > low; --j) { //反向冒泡,找到最小者
            if (a[j] < a[j - 1]) {
                [a[j], a[j - 1]] = [a[j - 1], a[j]];
            }
        }
        ++low; //修改low值,后移一位
    }
    console.timeEnd('3.改进后冒泡排序耗时');
    return a;
}
let a = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bubbleSortTwoWays(a)); 
//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

冒泡排序并不需要应用到实际中，它只是一个简单教学工具，便于我们理解算法以及更进一步的知识。

**参考资料**
1. [Computer science in JavaScript: Bubble sort](https://www.nczonline.net/blog/2009/05/26/computer-science-in-javascript-bubble-sort/)
1. [常见排序算法之JavaScript实现 by 河马](https://zhuanlan.zhihu.com/p/28130533)
1. [常用排序算法时间复杂度和空间复杂度](http://blog.csdn.net/xiexievv/article/details/45795719)
