export default class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    append(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.size++;
        return node;
    }

    prepend(data) {
        const node = new Node(data);
        node.next = this.head;
        this.head = node;
        this.size++;
    }

    getSize() {
        return this.size;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    // Retreive element at index
    at(index) {
        if (index > this.size - 1) return null;

        let currentIndex = 0;
        let nodeAtIndex = this.head;
        while (currentIndex < index) {
            nodeAtIndex = nodeAtIndex.next;
            currentIndex++;
        }
        return nodeAtIndex;
    }

    // Remove last element from list
    pop() {
        this.tail = null;

        if (this.size === 1) {
            this.head = null;
            this.size = 0;
            return;
        }

        this.size -= 1;

        this.tail = this.at(this.size - 1);
        this.tail.next = null;
    }

    // Check if list contains value
    containsValue(value) {
        let node = this.head;

        while (node !== null) {
            if (node.data.value === value) return true;
            node = node.next;
        }

        return false;
    }

    // Check if list contains key (for use with hashmap)
    containsKey(key) {
        let node = this.head;

        while (node !== null) {
            if (node.data.key === key) return true;
            node = node.next;
        }

        return false;
    }

    // Retrieve element by value
    findByValue(value) {
        let node = this.head;
        let index = 0;

        while (node !== null) {
            if (node.data.value === value) return { index, node };
            node = node.next;
            index++;
        }

        return false;
    }

    // Retrieve element by key (for use with hashmap)
    findByKey(key) {
        let node = this.head;
        let index = 0;

        while (node !== null) {
            if (node.data?.key === key) return { index, node };
            node = node.next;
            index++;
        }

        return false;
    }

    // Retrieve all node values in the linked list
    getAll() {
        let node = this.head;
        let index = 0;
        let nodes = [];

        while (node !== null) {
            nodes.push(node.data);
            node = node.next;
            index++;
        }

        return nodes;
    }

    toString() {
        let node = this.head;
        let result = '';

        while (node !== null) {
            result += `${node.data.value} -> `;
            node = node.next;
        }

        result += 'null';
        return result;
    }

    /*
        We will need the current node at the index,
        as well as the node immediately prior so that we can point it to our new node.
    */
    insertAt(data, index) {
        if (index > this.size - 1) return this.append(data);
        if (index === 0) return this.prepend(data);

        const nodeAtIndex = this.at(index);
        const newNode = new Node(data);

        let currentIndex = 0;
        let nodePriorToIndex = this.head;
        while (currentIndex < index - 1) {
            nodePriorToIndex = nodePriorToIndex.next;
            currentIndex++;
        }

        // Insert our new node at the specified index
        nodePriorToIndex.next = newNode;
        newNode.next = nodeAtIndex;

        this.size++;
    }

    updateAt(index, data) {
        const node = this.at(index);
        node.data = data;
        return node;
    }

    removeAt(index) {
        if (index === 0) {
            this.head = this.at(1);
            this.size -= 1;
            return;
        } else if (index === this.size - 1) {
            this.tail = this.at(this.size - 2);
        }

        const priorNode = this.at(index - 1);
        const nextNode = this.at(index + 1);

        priorNode.next = nextNode;
        this.size -= 1;
    }

    reverseList() {
        let current = this.head;
        let prev = null;

        while (current !== null) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        this.tail = this.head;
        this.head = prev;
    }
}

class Node {
    constructor(data = null, next = null) {
        this.data = data;
        this.next = next;
    }
}
