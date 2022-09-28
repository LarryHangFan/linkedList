export type LinkedListType<T = any> = T[]

export type NodeType<T = any> = {
  data: T,
  next?: NodeType<T>
}
export type HeadNode<T = any> = NodeType<T> | undefined

class LinkedList<T = any> {
  head: HeadNode = undefined; // 链表头
  length: number = 0;//链表长度
  constructor(data: LinkedListType<T>) {
    this.init(data)
  }
  /**
   * @desc 创建一个节点
   * @param data 节点数据
   * @returns 节点
   */
  node(data: T): NodeType {
    return {
      data,
      next: undefined
    }
  }
  /**
   * @param data 初始化数据（数组）
   */
  private init(data: LinkedListType<T>) {
    if (!data) return
    let index = 0
    data = data as T[]
    let current
    while (index < data.length) {
      if (index === 0) {
        this.head = this.node(data[index])
        current = this.head
      } else {
        if (current) {
          current.next = this.node(data[index])
          current = current.next
        }
      }
      index++
    }
    this.length = index
  }
  /**
   * @param data 添加到链表的数据
   */
  add(data: T) {
    if (!this.head) {
      this.head = this.node(data)
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next
      }
      current.next = this.node(data)
    }
    this.length++
  }
  /**
   * @description 返回此列表中的最后一个节点
   */
  getLastNode() {
    let current = this.head
    while (current?.next) {
      current = current.next
    }
    return current
  }
  /**
   * @description 返回此列表中的最后一个元素
   */
  getLast() {
    return this.getNode(this.length - 1)?.data
  }
  /**
   * @description 返回此列表中的第一个元素
   */
  getFirst() {
    return this.head?.data
  }
  /**
  * @description 移除并返回此列表中的第一个元素。
  */
  removeFirst() {
    if (this.length <= 0) return
    let current = LinkedList.deepClone(this.head)
    this.head = current.next
    this.length--
    return current?.data
  }
  /**
  * @description 移除并返回此列表中的最后一个元素
  */
  removeLast() {
    if (this.length <= 0) return
    // 获取倒数第二的节点
    let penultimate = this.getNode(this.length - 2)
    let last = LinkedList.deepClone(penultimate?.next)
    penultimate && (penultimate.next = undefined)
    this.length--
    return last?.data
  }
  size() {
    return this.length;
  }
  /**
   * @description 返回此列表中对应下标的一个节点
   */
  getNode(index: number): NodeType | undefined {
    if (index > this.length + 1) return;
    if (index === 0) return this.head
    let i = 0
    let node = this.head
    while (i++ < index) {
      node = node?.next
    }
    return node
  }
  /**
   * @description 返回此列表中对应下标的一个节点的数据
   */
  get(index: number) {
    return this.getNode(index)?.data
  }
  /**
   * @description 用指定元素替换此列表中指定位置的元素。
   */
  set(index: number, data: T) {
    if (index < 0 || index > this.length - 1) throw new Error("下标超出范围");
    let current = this.getNode(index)
    if (current) current.data = data
  }
  /**
   * @description 移除此列表中指定位置的元素。所有后续元素左移（下标减1）
   */
  remove(index: number) {
    if (index < 0 || index > this.length - 1) throw new Error("下标超出范围");
    if (index === 0) {
      this.head = undefined
    } else {
      // 获取index-1的节点
      let prevNode = this.getNode(index - 1)
      let currentNode = prevNode?.next
      prevNode && (prevNode.next = currentNode?.next)
    }
    this.length--
  }
  /**
   * @description 从这个列表中移除所有的元素。
   */
  clear() {
    this.head = undefined
    this.length = 0
  }
  /**
   * @description 返回此列表中指定元素的第一个出现的索引
   */
  indexOf(data: T) {
    let current = this.head
    let i = 0;
    while (i >= 0) {
      if (i > this.length - 1) return -1
      if (current?.data && current.data == data) {
        return i;
      }
      current = current?.next
      i++
    }
    return -1
  }
  /**
   * @description 返回此列表的数组形式
   */
  getLinkedArray() {
    let current = this.head
    let arr = []
    if (current) arr.push(current.data)
    while (current.next) {
      current = current.next
      arr.push(current.data)
    }
    return arr
  }
  /**
   * @description 特定位置插入一个新的项
   */
  insert(index: number, data: T) {
    if (index < 0 || index > this.length - 1) throw new Error("下标超出范围");
    if (index === 0) {
      let newNode = this.node(data)
      newNode.next = this.head
      this.head = newNode
    } else {
      // 获取index-1的节点
      let prev = this.getNode(index - 1)
      let current = prev?.next
      let newNode = this.node(data)
      newNode.next = current
      prev && (prev.next = newNode)
    }
    this.length++
  }
  /**
   * 
   * @param source 原数据
   * @param cache 是否缓存
   * @returns copy的数据
   */
  static deepClone = (source: any, cache?: any) => {
    if (!cache) {
      cache = new Map()
    }
    if (source instanceof Object) { // 不考虑跨 iframe
      if (cache.get(source)) { return cache.get(source) }
      let result: any
      if (source instanceof Function) {
        if (source.prototype) { // 有 prototype 就是普通函数
          result = function (this: any) {
            return source.apply(this, arguments)
          }
        } else {
          result = (...args: any) => { return source.call(undefined, ...args) }
        }
      } else if (source instanceof Array) {
        result = []
      } else if (source instanceof Date) {
        result = new Date(source as any - 0)
      } else if (source instanceof RegExp) {
        source = source as any
        result = new RegExp(source.source, source.flags)
      } else {
        result = {}
      }
      cache.set(source, result)
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          result[key] = LinkedList.deepClone(source[key], cache)
        }
      }
      return result
    } else {
      return source
    }
  }
}

export default LinkedList