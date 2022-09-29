## 安装
```
yarn add linklist-lib
```

## 导入
```
import LinkedList from "linklist-lib";
```

## 使用
let list = new LinkedList<string>([]) // ts
let list = new LinkedList(); // js

getFirst() 返回此列表中的第一个元素。

getLast() 返回此列表中的最后一个元素。

removeFirst() 移除并返回此列表中的第一个元素。

removeLast() 移除并返回此列表中的最后一个元素。

addFirst() 在此列表的开始处插入指定的元素。

addLast() 将指定的元素列表的结束。

size() 返回此列表中元素的数目。

add() 将指定的元素列表的结束。

remove(Object o) 从该列表中移除指定元素的第一个。

clear() 从这个列表中移除所有的元素。

get(int index) 返回此列表中指定位置的元素。

set(int index,E element) 用指定元素替换此列表中指定位置的元素。

...