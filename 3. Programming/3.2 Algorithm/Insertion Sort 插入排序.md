> https://github.com/muwenzi/Program-Blog/issues/26

## 算法思想

1. 把数组分为[已排序]和[未排序]两部分,第一个数为[已排序]，其余为[未排序]
2. 从[未排序]抽出第一个数，和[已排序]部分比较，插入到合适的位置

## 图形展示
![3](https://user-images.githubusercontent.com/12554487/29343569-85ee5840-8264-11e7-87c5-aaf5aa01a0ed.gif)

## JS代码
```js
function insertionSort(myArray) {

    let len = myArray.length;     // 数组的长度
    let value;   // 当前比较的值
    let i;   // 未排序部分的当前位置
    let j;   // 已排序部分的当前位置

    for (i=0; i < len; i++) {

        // 储存当前位置的值
        value = myArray[i];

        /*
         * 当已排序部分的当前元素大于value，
         * 就将当前元素向后移一位，再将前一位与value比较
         */
        for (j=i-1; j > -1 && myArray[j] > value; j--) {
            myArray[j+1] = myArray[j];
        }

        myArray[j+1] = value;
    }

    return myArray;
}
```

时间复杂度 O(n2)，稳定

**参考资料**
1. [常见排序算法之JavaScript实现 by 河马](https://zhuanlan.zhihu.com/p/28130533)
1. [常用排序算法时间复杂度和空间复杂度](http://blog.csdn.net/xiexievv/article/details/45795719)