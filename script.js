class HashMap {
   constructor(initialCapacity = 16, load = 0.8) {
      this.initialCapacity = initialCapacity;
      this.loadFactor = load;
      this.bucket = new Array(this.initialCapacity.length).fill(null);
      this.size = 0;
   }
   

   #hash(key) {
      let hashCode = 0;
         
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
      }
   
      return hashCode;
   }

   #getBucketIndex(key) {
      let key = this.#hash(key);
      return Math.abs(key % this.initialCapacity);
   }



   set(key, value) {
      if(this.bucket[this.#getBucketIndex] == null && this.bucket[this.#getBucketIndex] !== undefined) {
         
      }
   }
}

export class LinkedList {
   head = null;
   size = 0;
}

class Node {
   constructor(key, value) {
      this.key = key
      this.value = value;
      this.next = null;
   }
}



let man = new HashMap();
