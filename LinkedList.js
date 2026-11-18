class LinkedList {
    constructor() {
        this.head = null
    }

    append(value) {
        const node = new Node(value);

        if(this.head == null) {
            this.head = node;
            return;
        }
        
        let current = this.head;
        while(current.nextNode != null) {
            current = current.nextNode;
        }
        current.nextNode = node;
    }

    prepend(value) {
        const node = new Node(value);
        node.nextNode = this.head;
        this.head = node;
    }

    size() {
        let current = this.head;
        let size = 0;
        if (current === null) return 0;
        else while (current.nextNode !== null) {
            size++;
            current = current.nextNode;
        } 
        return ++size; // We increment to include the tail
    }
    
    getHead() {
        if (this.head === null) return undefined;
        else return this.head;
    }

    getTail() {
        if (this.head === null) return undefined;
        else {
            let current = this.head;
            while (current.nextNode !== null) {
                current = current.nextNode;
            }
            return current;
        }
    }

    at(index) {
        if (this.head === null) return undefined;
        let i = 0;
        let current = this.head;
        while (i <= index && current.nextNode !== null) {
            if(i === index) return current;
            else current = current.nextNode;
            i++;
        }
        if(i === index) return current;
        else return undefined;
    }

    pop() {
        const current = this.head;
        this.head = this.head.nextNode;
        return current;
    }

    contains(value) {
        let current = this.head;
        if(this.head === null) return false;
        else {
            while(current.nextNode !== null) {
                if(current.value === value) return true;
                current = current.nextNode;
            }
        }
        return false;
    }

    findIndex(value) {
        let i = 0;
        let current = this.head;
        if(current === null) return -1;
        else {
            while(current.nextNode !== null) {
                if(current.value === value) return i;
                else {
                    i++;
                    current = current.nextNode;
                }
            }
            return -1;
        }
    }
    
    toString() {
        let current = this.head;
        let str = ""
        if(current === null) {
            return str
        } else {
            while(current.nextNode !== null) {
                str += `( ${current.value} ) -> `;
                current = current.nextNode;
            }
            str += `( ${current.value} ) -> ( null )`;
            return str;
        }
    }

    insertAt(index, ...values) {
        if(index < 0 || index > this.size()) throw RangeError
        else if(index === 0) {
            for(let value of values.toReversed()) {
                this.prepend(value)
            }
        } else if(index === this.size()) {
            for(let value of values) {
                this.append(value)
            }
        } else {
            const currentTail = this.getTail();
            const insertionPoint = this.at(index - 1);
            const postInsertionPoint = this.at(index);
            let firstValue = values[0];
            let lastValue = values.at(-1);
    
            for(let value of values) {
                this.append(value);
                // if this is the start or end of the insertion values get a 
                // reference to the actual nodes
                if(value === firstValue) firstValue = this.getTail();
                else if(value === lastValue) lastValue = this.getTail();
            }
            
            insertionPoint.nextNode = firstValue;
            lastValue.nextNode = postInsertionPoint;
            currentTail.nextNode = null;
        }
    }

    removeAt(index) {
        if(index < 0 || index > this.size()) throw RangeError

        if(index === 0) {
            this.head = this.getHead().nextNode
        } else if(index === this.size()) {
            this.at(index - 1).nextNode = null;
        } else {
            let current = this.at(index - 1)
            current.nextNode = this.at(index).nextNode;
        }
    }
}

class Node {
    

    constructor(value = null, nextNode = null) {
        this.value = value
        this.nextNode = nextNode
    }
}

export { LinkedList }