import { LinkedList } from "./linkedlist.js";

class HashMap {
   #loadFactor;
   #initialCapacity;
   constructor(initialCapacity = 16, load = 0.8) {
      this.#initialCapacity = initialCapacity;
      this.#loadFactor = load;
      this.buckets = new Array(this.#initialCapacity).fill(null);
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
      let keys = this.#hash(key);
      return Math.abs(keys % this.#initialCapacity);
   }



   set(key, value) {
      let index = this.#getBucketIndex(key);
      if (!this.buckets[index]) {
         this.buckets[index] = new LinkedList();
      }

      let currentNode = this.buckets[index].head;

      while(currentNode !== null) {
         if(currentNode.key === key) {
            currentNode.value = value;
            this.size++;
            return;
         }
         currentNode = currentNode.next
      }

      this.buckets[index].append(key, value);

      this.size++;

      if(this.size / this.#initialCapacity > this.loadFactor) {
         this.#resize();
      }
   }

   get(key) {
      for(let element of this.buckets) {

         if(element !== null) {
            let elementNode = element.head;
            while(elementNode !== null) {
      
               if(elementNode.key === key) {
                  return elementNode.value;
               }
               elementNode = elementNode.next;
            }
         }

      }
      return null;
   }

   has(key) {
      for(let element of this.buckets) {

         if(element !== null) {
            let elementNode = element.head;
            while(elementNode !== null) {
      
               if(elementNode.key === key) {
                  return true;
               }
               elementNode = elementNode.next;
            }
         }

      }
      return false;
   }

   remove(key) {
      for(let element of this.buckets) {

         if(element !== null) {
            let elementNode = element.head;
            let index = 0;
            while(elementNode !== null) {
      
               if(elementNode.key === key) {
               element.removeAt(index);
               return true
               }
               index++;
               elementNode = elementNode.next;
            }
         }

      }
      return false;
   }

   length() {
      return this.size++;
   }

   #resize() {
      const oldBuckets = this.buckets;
      this.#initialCapacity *= 2; // Double the capacity
      this.buckets = Array(this.#initialCapacity).fill(null); // Create new bucket array
      this.size = 0; // Reset size, we will re-add elements

      // Rehash all existing key-value pairs
      for (let bucket of oldBuckets) {
         if (bucket) {

         let currentNode = bucket.head;
         while(currentNode !== null) {
            this.set(currentNode.key, currentNode.value);
            currentNode = currentNode.next;
         }
      }
      }
   }
}



let man = new HashMap();
man.set('mans', 1);
man.set('manse', 2);
man.set('masn', 1);
man.set('mane', 2);
man.set('manse', 1);
man.set('marned', 2);
man.set('mansd', 1);
man.set('manaa', 2);
man.set('masnee', 1);
man.set('maneea', 2);
man.set('mansae', 1);
man.set('maaarn', 2);
man.set('mafbnnns', 1);
man.set('mand', 2);
man.set('maszn', 1);
man.set('zmane', 2);
man.set('cmanse', 1);
man.set('cmarn', 255);
// console.log(man.buckets);
// console.log(man.size);

// console.log(man.has(null));
console.log(man.remove('cmarn'));
console.log(man.length());
