export class LinkedList {
   head = null;
   size = 0;
}

class Node {
   constructor(data) {
      this.data = data;
      this.next = null;
   }
}

LinkedList.prototype.prepend = function(value) {
   if(this.head === null) {
      this.head = new Node(value);
   } else {
      const temp = this.head;
      this.head = new Node(value);
      this.head.next = temp;
   }
   this.size++;
}

LinkedList.prototype.append = function(value) {
   if(this.head === null) {
      this.head = new Node(value);
      this.size++;
      return;
   }

   let currentHead = this.head;

   while(currentHead.next !== null) {
      currentHead = currentHead.next;
   }

   currentHead.next = new Node(value);

   this.size++;
}

LinkedList.prototype.sizes = function() {
   return this.size;
}

LinkedList.prototype.headItem = function() {
   return this.head;
}

LinkedList.prototype.tailItem = function() {
   let currentHead = this.head;

   while(currentHead.next !== null) {
      currentHead = currentHead.next
   }

   return currentHead;
}

LinkedList.prototype.at = function(number) {
   let currentHead = this.head;
   let count = 0;

   while (currentHead !== null) {
      if (count === number) {
         return currentHead.data;
      }
      currentHead = currentHead.next;
      count++;
   }
   return null;
};


LinkedList.prototype.pop = function() {
   if(this.size === 0) {
      return; // Do nothing if the list is empty
   }
   let currentHead = this.head;

   if(this.size === 1) {
      this.head = null;
      this.size--;
      return;
   }

   while(currentHead.next.next !== null) {
      currentHead = currentHead.next;
   }
   currentHead.next = null;
   this.size--;
};


LinkedList.prototype.contains = function(value) {
   let currentHead = this.head;
   while (currentHead !== null) {
      if (currentHead.data === value) {
         return true;
      }
      currentHead = currentHead.next;
   }
   return false; // Return false if value is not found
};


LinkedList.prototype.find = function(value) {
   let currentHead = this.head;
   let currentSize = this.size;

   let index = 0;

   while(currentSize !== 0) {
      if(currentHead.data == value) {
         return index;
      } else {
         currentHead = currentHead.next;
         currentSize--;
         index++;
      }
   }

   return null;
}

LinkedList.prototype.toString = function() {
   let array = [];
   let currentHead = this.head;
   array.push(currentHead.data);

   while(currentHead.next !== null) {
      currentHead = currentHead.next;
      array.push(currentHead.data);
   }

   array.push(null);

   let newArray = array.map(e => `( ${e} )`).join(' -> ');
   return newArray;

}

LinkedList.prototype.insertAt = function(value, index) {
   let currentHead = this.head;
   let count = 0;
   let previous = null
   let newNode = new Node(value);

   if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      this.size++;
      return;
   }

   while(currentHead !== null && count < index) {
      previous = currentHead;
      currentHead = currentHead.next;
      count++;
   }

      if(index == count) {
         newNode.next = currentHead
         previous.next = newNode;
         this.size++;
      }
}

LinkedList.prototype.removeAt = function(index) {
   if (index < 0 || index >= this.size) {
      return;
   }

   let currentHead = this.head;
   let previous = null;
   let count = 0;

   if(index == 0) {
      this.head = currentHead.next;
      this.size--; 
      return;
   }

   while(currentHead !== null && count < index) {
      previous = currentHead;
      currentHead = currentHead.next
      count++;
   }

   if(count == index){
      previous.next = currentHead.next;
      this.size--;
   }
}
