# Prototypes
```javascript
let myFunction = function () {
}
display(myFunction.prototype)
let person = {firstName: 'Akhil'};
display(person.prototype)
display(person.__proto__)
```
## Function's Prototype
A function’s prototype is the object **instance** that will become the prototype for all objects created using this function as a constructor.
## Objects's Prototype
An object’s prototype is the object **instance** from which the object is inherited.

## Prototype
- A prototype, whether it is a function's prototype or an object's prototype, is an instance of an object in memory.
- So when a function is created a new prototype object is created in memory and attached to the function behind the scenes.
- If that function is then used as a constructor function with the **new** keyword, the new object that is created has a ```__proto__``` property
that is pointing to the same object in memory that is the function's prototype.
```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.age = 19;

display(Person.prototype)
let akhil = new Person('Akhil', 'Rawat');
let ben = new Person('Ben', 'Ten');
display(akhil.__proto__);
display(ben.__proto__);
// ben.__proto__.age = 15;
display(Person.prototype === akhil.__proto__)
```
- Object Instance that is the function's prototype becomes the prototype for all objects created from that prototype.

### Prototype Chain
```javascript
function Person(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
}

Person.prototype.age = 19;
let john = new Person('John', 'Doe');
let jane = new Person('Jane', 'Doe');
display(john.hasOwnProperty('age'))
john.age = 10;
display(john.age);
display(jane.__proto__.age);
Person.prototype.age = 50;
display(jane.__proto__.age);
display(jane.age);
```
- When we created a Person function, js also created another object in memory. Let's call it A.
- Right Now : ```A = {}```
- After creating **A** js updates the function's prototype property to point to this new object **A**.
- We can manipulate the properties on the function's prototype object like this ```Person.prototype.age = 19``` or for better understanding ```A.age  = 29```
- Right Now : ``` A = {age:29}```
- Let's create a new person object using the ```Person()``` function
- ```let john = new Person('John','Doe');```
- When we do this the new keyword creates an object for us ```john = {}``` but it also does something else behind the scenes it adds a ```__proto__``` property to john and that property is a pointer to our Person function's prototype object i.e. **A**.
- Then the new keyword executes the ```Person()``` function and the ```this``` keyword in this context is pointing to ```john```. So it adds the``` firstName``` and ```lastName ``` property to ```john```.
- If we create another instance of ```Person()``` the same process is followed.
	- ```let jane = new Person('Jane','Doe');```
	- A new object is created.
	- Its ```__proto__``` property is created and is pointed to the function's ```prototype```.
	- Finally the ```instance``` properties are added.
- At this point ```john``` object does not have the ```age``` property. Only it prototype does.
- If we ```console.log(john.age)``` js will look for an age property in ```john``` and it won't find it, it will then check its ```prototype``` parent. Js will find the age propery in the ```prototype``` or **A** and ```29``` will be logged.
- Now if we add John's age ```john.age = 18``` and ```console.log(john.age)```
- ```18``` will be logged, js will check ```john``` object for an age propery and it will find it. Never going to the Parent ```prototype```.
-  So, **instance** properties override the **prototype** property.
```javascript
Person.prototype.age = 12;
console.log(john.age) // 18
console.log(jane.age) // 12
```
*Go over the Definitions Again*

```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.age = 19;
let john = new Person('John', 'Doe');
let jane = new Person('Jane', 'Doe');
Person.prototype = {age: 18}
let jack = new Person('Jack', 'Doe');
display(john.age);
display(jane.age);
display(jack.age);
```
- When we created  ```jane``` and ```john``` objects their ```__proto__``` property was pointing ```Person()```'s prototype.
- Lets call it A.
- Later we changed the ```Person()```'s prototype to ```{age: 18}```, a different object, lets call it B.
- ```john``` and ```jane```'s ```__proto__``` property are both pointing to **A** while ```jack```'s ,the new object's, ```__proto__``` property is pointing to the new prototype **B**.

# Inheritance
```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.age = 19;
let john = new Person('John', 'Doe');
display(john.__proto__); // Person's Prototype
display(john.__proto__.__proto__); //Person's Prototype's Prototype = Object
display(john.__proto__.__proto__.__proto__); // Object Prototype = null
```
- All Objects in JavaScript inherit from ```Object``` and ```Object``` has no prototype.
- This shows multiple level *inheritance*.

### Inheritance Chain
```javascript
function Person(firstName, lastName, age) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		Object.defineProperty(this, 'fullName', {
			get: function () {
				return this.firstName + " " + this.lastName;
			},
			enumerable: true
		});
	}

function Student(firstName, lastName, age) {
    Person.call(this, firstName, lastName, age);
    this._enrolledCourses = [];
    this.enroll = function (courseId) {
        this._enrolledCourses.push(courseId)
    };
    this.getCourse = function () {
        return this.fullName + "'s enrolled coursers are: " + this._enrolledCourses.join(', ')
    }
}

// display(Student.prototype.constructor)
Student.prototype = Object.create(Person.prototype);
// display(Student.prototype.constructor) // ToDo: side effect (remove)
/**
 * using object.create instead of new as we don't want to create a new person object
 * Object.create just creates a new object with person as its prototype.
 * We set the new object as student function's prototype
 */
Student.prototype.constructor = Student;
/**
 * All prototypes have a constructor property that points to the function that was used to create it.
 * Undo the side effect
 * we created an new object from the person prototype which has the  person function as it constructor and then set that prototype
 * for our student object.
 * this make things technically correct
 */

let jim = new Student('Jim', 'Cooper', 29);
display(jim)
display(jim.__proto__);
display(jim.__proto__.__proto__);
jim.enroll('History')
jim.enroll('Physics')
jim.enroll('Maths')
display(jim.getCourse())
```
