import { LinkedList } from "./linkedlist.js";

export class HashMap {
   #loadFactor;
   #initialCapacity;
   constructor(initialCapacity = 16, load = 0.75) {
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
      return this.size;
   }

   clear() {
      this.buckets = new Array(this.#initialCapacity).fill(null);
      this.size = 0;
   }

   keys() {
      let keyArray = [];
      for(let element of this.buckets) {

         if(element !== null) {
            let elementNode = element.head;
            while(elementNode !== null) {
      
               keyArray.push(elementNode.key);
               elementNode = elementNode.next;
            }
         }
      }
      return keyArray;
   }

   values() {
      let keyArray = [];
      for(let element of this.buckets) {

         if(element !== null) {
            let elementNode = element.head;
            while(elementNode !== null) {
      
               keyArray.push(elementNode.value);
               elementNode = elementNode.next;
            }
         }
      }
      return keyArray;
   }

   entries() {
      let keyArray = [];
      for(let element of this.buckets) {

         if(element !== null) {
            let elementNode = element.head;
            while(elementNode !== null) {
      
               keyArray.push([elementNode.key,elementNode.value]);
               elementNode = elementNode.next;
            }
         }
      }
      return keyArray;
   }
   #resize() {
      const oldBuckets = this.buckets;
      this.#initialCapacity *= 2; 
      this.buckets = Array(this.#initialCapacity).fill(null);
      this.size = 0;

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
