## 算法思想
1. 找出最小的数，和第一个交换位置
2. 在剩下的数中，找出最二小的数，放在第二个
3. 依次类推，排出顺序

## 图形展示
![2](https://user-images.githubusercontent.com/12554487/29299018-610f8a6a-819e-11e7-9c55-fdaf3463ed47.gif)

## JS代码
```js
function selectionSort (myArray) {

    let len = myArray.length;
    let min;

    for (i=0; i < len; i++){

        // 将当前位置设为最小值
        min = i;

        // 检查数组其余部分是否更小
        for (j = i+1; j < len; j++){
            if (myArray[j] < myArray[min]){
                min = j;
            }
        }

        // 如果当前位置不是最小值，将其换为最小值
        if (i !== min){
            swap(myArray, i, min); 
        }
    }

    return myArray;
}
function swap(myArray, p1, p2){
    var temp = myArray[p1];
    myArray[p1] = myArray[p2];
    myArray[p2] = temp;
}
```

时间复杂度 O(n2)，不稳定

**参考资料**
1. [常见排序算法之JavaScript实现 by 河马](https://zhuanlan.zhihu.com/p/28130533)
1. [常用排序算法时间复杂度和空间复杂度](http://blog.csdn.net/xiexievv/article/details/45795719)