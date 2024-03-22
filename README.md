
# Dynamic Hash Map

This project is a learning exercise focused on implementing a dynamic hash map with a load balancer. Each bucket in the hash map is a linked list, allowing for efficient storage and retrieval of key-value pairs.

## Features

- **Dynamic Hash Map**: The hash map dynamically adjusts its size to accommodate an increasing number of elements.

- **Linked List Buckets**: Each bucket in the hash map is implemented as a linked list, solving for potential collisions and enabling efficient insertion, deletion, and retrieval operations.

## Usage

1. **Import the Hash Map**: Import the hashMap object from the hashmap.js file into your project.

   ```js
   import hashMap from './hashmap.js'
   ```

2. **Perform Operations**: Use the provided methods (set, get, remove, etc.) to interact with the hash map and manage key-value pairs.

   ```js
   // Example usage
   hashMap.set('key', 'value');
   let value = hashMap.get('key');
    ```
