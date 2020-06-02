```javascript
let person = {
	firstName: 'Akhil',
	lastName: 'Rawat',
	age: 18,
	isAdult: function () {
		return this.age >= 18;
	}
}
person.age = 19;
display(person.isAdult())
person.age = 12;
display(person.isAdult())
display(person)
display(Object.keys(person))
for (let propertyName in person){
	display(propertyName)
}
```
# Points Covered
- Create an Object using Object Literal
- Adding Functions to Objects
- Object.keys() and for ...in, both do the same thing for objects.

#Equality
- == (Should be Avoided)
- === (Should always be used)
- Object.is() (Almost Identical to ===)

- == is not type safe.
```javascript
display("42" == 42);

display(0 == false);

display(null == undefined);

display('' == 0);

display([1, 2] == "1,2");
```
# ===
- type safe
- convenient
- NaN not equal to NaN
- +0 equals -0

# Object.is()
- type safe
- Verbose
- Nan equals NaN
- +0 does not equal -0

```javascript
let person1 = {
    firstName: 'Akhil',
    lastName: 'Rawat'
}
let person2 = {
    firstName: 'Akhil',
    lastName: 'Rawat'
}
display(person1 == person2) //false
display(person1 === person2) //false
display(Object.is(person1, person2)) //false

/*=====================================*/

let person1 = {
    firstName: 'Akhil',
    lastName: 'Rawat'
}
let person2 = person1
display(person1 == person2) //true
display(person1 === person2) //true
display(Object.is(person1, person2)) //true
```
- For primitive data types like strings js compares their value and for objects js compares their memory addresses.
# Objecs.assign()
```javascript
let person1 = {
    firstName: 'Akhil',
    lastName: 'Rawat',
    age: 18,
    isAdult: function () {
        return this.age >= 18;
    }
}
let person2 = {};
Object.assign(person2, person1)
display(person2)
```
```javascript
let person1 = {
    firstName: 'Akhil',
    lastName: 'Rawat',
    age: 18,
    isAdult: function () {
        return this.age >= 18;
    }
}
let healthStats = {
    height: 150,
    weight: 60
}
Object.assign(person1, healthStats)
display(person1)
```
```javascript
let person1 = {
    firstName: 'Akhil',
    lastName: 'Rawat',
    age: 18,
    isAdult: function () {
        return this.age >= 18;
    }
}
let healthStats = {
    height: 150,
    weight: 60
}

function mergeHealthStats(person, healthStats) {
    return Object.assign(person, healthStats)
}

let mergedPerson = mergeHealthStats(person1, healthStats)
display(mergedPerson)
display(person1) // person object got mutated
```
```javascript
let person1 = {
    firstName: 'Akhil',
    lastName: 'Rawat',
    age: 18,
    isAdult: function () {
        return this.age >= 18;
    }
}
let healthStats = {
    height: 150,
    weight: 60
}

function mergeHealthStats(person, healthStats) {
    return Object.assign({}, person, healthStats)
}

let mergedPerson = mergeHealthStats(person1, healthStats)
display(mergedPerson)
display(person1)
```
# Constructor Functions

```javascript
function Person(firstName, lastName, age) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.age = age;
	this.isAdult = function () {
		return this.age >= 18;
	}
}

let ranbir = new Person('Ranbir', 'Singh',19);
let ram = new Person('Ram', 'Kumar',24);
display(ranbir)
display(ram)
display(ranbir.isAdult())
display(ram.isAdult())
```
# Object.create()
```javascript
let person1 = {
    firstName: 'Akhil',
    lastName: 'Rawat',
    age: 18,
};
display(person1)
let person2 = Object.create(
    Object.prototype, {
        firstName: {value: 'Akhil', enumerable: true, writable: true, configurable: true},
        lastName: {value: 'Rawat', enumerable: true, writable: true, configurable: true},
        age: {value: 19, enumerable: true, writable: true, configurable: true},
    }
);
display(person2)
```
# Properties
```javascript
let person = {
    firstName: 'Akhil',
    lastName: 'Rawat',
    age: 18,
};
display(Object.getOwnPropertyDescriptor(person, "firstName"))
```
## Writable
```javascript
let person = {
    firstName: 'Akhil',
    lastName: 'Rawat',
    age: 18,
};
Object.defineProperty(person, 'firstName', {writable: false})
display(Object.getOwnPropertyDescriptor(person, "firstName"))
person.firstName = 'Kumar'; // check console
```
```javascript
let person = {
	name: {
		firstName: "Akhil",
		lastName: "Rawat"
	},
	age: 18,
};
Object.defineProperty(person, 'name', {writable: false})
display(Object.getOwnPropertyDescriptor(person, "name"))
display(person.name.firstName);
person.name.firstName = 'Kumar';
display(person.name.firstName);
// person.name = {}; // check console
Object.freeze(person.name);
// person.name.firstName = 'Akhil'; // check console
// display(person.name.firstName);
```
## Enumerable
```javascript
let person = {
    firstName: "Akhil",
    lastName: "Rawat",
    age: 18,
};
for (let propertyName in person) {
    display(propertyName + ': ' + person[propertyName])
}
display(Object.keys(person))
display(JSON.stringify(person))
Object.defineProperty(person, 'firstName', {enumerable: false})
display(Object.getOwnPropertyDescriptor(person, "firstName"))
for (let propertyName in person) {
    display(propertyName + ': ' + person[propertyName])
}
display(Object.keys(person))
display(JSON.stringify(person))
display(person.firstName)
```

### Configurable
```javascript
let person = {
    firstName: "Akhil",
    lastName: "Rawat",
    age: 18,
};


Object.defineProperty(person, 'firstName', {configurable: false})
// Object.defineProperty(person, 'firstName', {enumerable: false}) //check console
// Object.defineProperty(person, 'firstName', {configurable: true}) //check console
Object.defineProperty(person, 'firstName', {writable: false})
display(Object.getOwnPropertyDescriptor(person, "firstName"))
delete person.firstName; // check console
display(person)
```
# Getters and Setters
```javascript
let person = {
    name: {
        first: "Akhil",
        last: "Rawat",
    },
    age: 18,
};
Object.defineProperty(person, 'fullName', {
    get: function () {
        return this.name.first + ' ' + this.name.last;
    },
    set: function (value) {
        let nameParts = value.split(" ");
        this.name.first = nameParts[0];
        this.name.last = nameParts[1];
    }
})
// display(person.name)
display(person.fullName);
person.fullName = 'Fred Jones';
display(person.fullName);
display(person.name.first);
display(person.name.last);
display(person.name)
```
