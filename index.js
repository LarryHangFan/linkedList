"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var LinkedList = /** @class */ (function () {
    function LinkedList(data) {
        this.head = undefined; // 链表头
        this.length = 0; //链表长度
        this.init(data);
    }
    /**
     * @desc 创建一个节点
     * @param data 节点数据
     * @returns 节点
     */
    LinkedList.prototype.node = function (data) {
        return {
            data: data,
            next: undefined
        };
    };
    /**
     * @param data 初始化数据（数组）
     */
    LinkedList.prototype.init = function (data) {
        if (!data)
            return;
        var index = 0;
        data = data;
        var current;
        while (index < data.length) {
            if (index === 0) {
                this.head = this.node(data[index]);
                current = this.head;
            }
            else {
                if (current) {
                    current.next = this.node(data[index]);
                    current = current.next;
                }
            }
            index++;
        }
        this.length = index;
    };
    /**
     * @param data 添加到链表的数据
     */
    LinkedList.prototype.add = function (data) {
        if (!this.head) {
            this.head = this.node(data);
        }
        else {
            var current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = this.node(data);
        }
        this.length++;
    };
    /**
     * @description 返回此列表中的最后一个节点
     */
    LinkedList.prototype.getLastNode = function () {
        var current = this.head;
        while (current === null || current === void 0 ? void 0 : current.next) {
            current = current.next;
        }
        return current;
    };
    /**
     * @description 返回此列表中的最后一个元素
     */
    LinkedList.prototype.getLast = function () {
        var _a;
        return (_a = this.getNode(this.length - 1)) === null || _a === void 0 ? void 0 : _a.data;
    };
    /**
     * @description 返回此列表中的第一个元素
     */
    LinkedList.prototype.getFirst = function () {
        var _a;
        return (_a = this.head) === null || _a === void 0 ? void 0 : _a.data;
    };
    /**
    * @description 移除并返回此列表中的第一个元素。
    */
    LinkedList.prototype.removeFirst = function () {
        if (this.length <= 0)
            return;
        var current = LinkedList.deepClone(this.head);
        this.head = current.next;
        this.length--;
        return current === null || current === void 0 ? void 0 : current.data;
    };
    /**
    * @description 移除并返回此列表中的最后一个元素
    */
    LinkedList.prototype.removeLast = function () {
        if (this.length <= 0)
            return;
        // 获取倒数第二的节点
        var penultimate = this.getNode(this.length - 2);
        var last = LinkedList.deepClone(penultimate === null || penultimate === void 0 ? void 0 : penultimate.next);
        penultimate && (penultimate.next = undefined);
        this.length--;
        return last === null || last === void 0 ? void 0 : last.data;
    };
    LinkedList.prototype.size = function () {
        return this.length;
    };
    /**
     * @description 返回此列表中对应下标的一个节点
     */
    LinkedList.prototype.getNode = function (index) {
        if (index > this.length + 1)
            return;
        if (index === 0)
            return this.head;
        var i = 0;
        var node = this.head;
        while (i++ < index) {
            node = node === null || node === void 0 ? void 0 : node.next;
        }
        return node;
    };
    /**
     * @description 返回此列表中对应下标的一个节点的数据
     */
    LinkedList.prototype.get = function (index) {
        var _a;
        return (_a = this.getNode(index)) === null || _a === void 0 ? void 0 : _a.data;
    };
    /**
     * @description 用指定元素替换此列表中指定位置的元素。
     */
    LinkedList.prototype.set = function (index, data) {
        if (index < 0 || index > this.length - 1)
            throw new Error("下标超出范围");
        var current = this.getNode(index);
        if (current)
            current.data = data;
    };
    /**
     * @description 移除此列表中指定位置的元素。所有后续元素左移（下标减1）
     */
    LinkedList.prototype.remove = function (index) {
        if (index < 0 || index > this.length - 1)
            throw new Error("下标超出范围");
        if (index === 0) {
            this.head = undefined;
        }
        else {
            // 获取index-1的节点
            var prevNode = this.getNode(index - 1);
            var currentNode = prevNode === null || prevNode === void 0 ? void 0 : prevNode.next;
            prevNode && (prevNode.next = currentNode === null || currentNode === void 0 ? void 0 : currentNode.next);
        }
        this.length--;
    };
    /**
     * @description 从这个列表中移除所有的元素。
     */
    LinkedList.prototype.clear = function () {
        this.head = undefined;
        this.length = 0;
    };
    /**
     * @description 返回此列表中指定元素的第一个出现的索引
     */
    LinkedList.prototype.indexOf = function (data) {
        var current = this.head;
        var i = 0;
        while (i >= 0) {
            if (i > this.length - 1)
                return -1;
            if ((current === null || current === void 0 ? void 0 : current.data) && current.data == data) {
                return i;
            }
            current = current === null || current === void 0 ? void 0 : current.next;
            i++;
        }
        return -1;
    };
    /**
     * @description 特定位置插入一个新的项
     */
    LinkedList.prototype.insert = function (index, data) {
        if (index < 0 || index > this.length - 1)
            throw new Error("下标超出范围");
        if (index === 0) {
            var newNode = this.node(data);
            newNode.next = this.head;
            this.head = newNode;
        }
        else {
            // 获取index-1的节点
            var prev = this.getNode(index - 1);
            var current = prev === null || prev === void 0 ? void 0 : prev.next;
            var newNode = this.node(data);
            newNode.next = current;
            prev && (prev.next = newNode);
        }
        this.length++;
    };
    /**
     *
     * @param source 原数据
     * @param cache 是否缓存
     * @returns copy的数据
     */
    LinkedList.deepClone = function (source, cache) {
        if (!cache) {
            cache = new Map();
        }
        if (source instanceof Object) { // 不考虑跨 iframe
            if (cache.get(source)) {
                return cache.get(source);
            }
            var result = void 0;
            if (source instanceof Function) {
                if (source.prototype) { // 有 prototype 就是普通函数
                    result = function () {
                        return source.apply(this, arguments);
                    };
                }
                else {
                    result = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return source.call.apply(source, __spreadArray([undefined], args, false));
                    };
                }
            }
            else if (source instanceof Array) {
                result = [];
            }
            else if (source instanceof Date) {
                result = new Date(source - 0);
            }
            else if (source instanceof RegExp) {
                source = source;
                result = new RegExp(source.source, source.flags);
            }
            else {
                result = {};
            }
            cache.set(source, result);
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    result[key] = LinkedList.deepClone(source[key], cache);
                }
            }
            return result;
        }
        else {
            return source;
        }
    };
    return LinkedList;
}());
exports["default"] = LinkedList;
