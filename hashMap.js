import LinkedList from './linkedList.js';

const INITIAL_ARRAY_SIZE = 16;
const LOAD_FACTOR = 0.75; // Load capacity at which we will expand the hash map
const GROWTH_FACTOR = 2; // Multiplier used to expand the size of the hash map when the LOAD_FACTOR is reached

const hashMap = (() => {
    let buckets = new Array(INITIAL_ARRAY_SIZE)
        .fill(null)
        .map(() => new LinkedList());
    let currentSize = INITIAL_ARRAY_SIZE;

    const hash = (key) => {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % currentSize;
        }

        if (hashCode < 0 || hashCode > currentSize) {
            throw new Error('Trying to access index out of bound');
        } else {
            return hashCode;
        }
    };

    const expand = () => {
        currentSize *= GROWTH_FACTOR;

        // Create a new, larger hashmap of linked lists
        const newBuckets = new Array(currentSize)
            .fill(null)
            .map(() => new LinkedList());

        // Copy all existing elements to the new hashmap, where they will be rehashed and sorted into linked lists.
        for (let i = 0; i < buckets.length; i++) {
            if (buckets[i].getSize() > 0) {
                buckets[i]
                    .getAll()
                    .forEach((node) => newBuckets[hash(node.key)].append(node));
            }
        }

        buckets = newBuckets;
    };

    const set = (key, value) => {
        let bucket = buckets[hash(key)];

        /* 
            First we check if adding another item will cause our hashmap to exceed the load factor.
            If this is the case, we expand the hashmap.
        */
        if (bucket.getSize() === 0) {
            const load = (length() + 1) / buckets.length;
            if (load >= LOAD_FACTOR) expand();

            bucket = buckets[hash(key)];
        }

        /* 
            Next we check if the bucket already contains a node with this key.
            If so, update the node in place. Otherwise append a new node.
        */
        const { index, node } = bucket.findByKey(key);
        if (node) {
            return bucket.updateAt(index, { key, value });
        }

        return bucket.append({ key, value });
    };

    const get = (key) => {
        const bucket = buckets[hash(key)];
        if (!bucket) return null;

        return bucket.findByKey(key);
    };

    const has = (key) => {
        const index = hash(key);
        const bucket = buckets[index];
        return bucket.containsKey(key);
    };

    const remove = (key) => {
        const index = hash(key);
        const bucket = buckets[index];

        const node = get(key);
        if (!node) return false;
        else {
            bucket.removeAt(node.index);
            return true;
        }
    };

    // Number of stored keys in the hashmap.
    // getSize() counts the bucket's linked list elements.
    const length = () => {
        return buckets.reduce((count, bucket) => {
            if (bucket) {
                return (count += bucket.getSize());
            }
            return count;
        }, 0);
    };

    // Wipe the hashmap
    const clear = () => {
        for (let i = 0; i < buckets.length; i++) {
            buckets[i] = new LinkedList();
        }
    };

    // Return an array of all keys in the hashmap
    const keys = () => {
        return buckets.reduce((keys, bucket) => {
            if (bucket) {
                return keys.concat(bucket.getAll().map((node) => node.key));
            }
            return keys;
        }, []);
    };

    // Return an array of all values in the hashmap
    const values = () => {
        return buckets.reduce((values, bucket) => {
            if (bucket) {
                return values.concat(bucket.getAll().map((node) => node.value));
            }
            return values;
        }, []);
    };

    // Return an array of all { key, value } pairs
    const entries = () => {
        return buckets.reduce((entries, bucket) => {
            if (bucket) {
                return entries.concat(
                    bucket.getAll().map((node) => Object.values(node))
                );
            }
            return entries;
        }, []);
    };

    const reverseList = () => buckets.forEach((bucket) => bucket.reverseList());

    const printMap = () =>
        buckets.forEach((bucket) => console.log(bucket.toString()));

    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries,
        expand,
        reverseList,
        printMap,
    };
})();

export default hashMap;
