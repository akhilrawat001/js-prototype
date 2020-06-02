'use strict';
(function () {

	// let myFunction = function () {}
	// let a = {firstName:'Jim'}
	// display(myFunction.prototype)
	// display(a.prototype)
	// display(a.__proto__)
	//
	// let person = {
	// 	firstName: 'Akhil',
	// 	lastName: 'Rawat',
	// 	age: 18,
	// 	isAdult: function () {
	// 		return this.age >= 18;
	// 	}
	// }
	// person.age = 19;
	// display(person.isAdult())
	// person.age = 12;
	// display(person.isAdult())
	// display(person)
	// display(Object.keys(person))
	// for (let propertyName in person) {
	// 	display(propertyName)
	// }
	// display("42" == 42);
	//
	// display(0 == false);
	//
	// display(null == undefined);
	//
	// display('' == 0);
	//
	// display([1, 2] == "1,2");

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
display(person.fullName);
person.fullName = 'Fred Jones';
display(person.fullName);
display(person.name.first);
display(person.name.last);
display(person.name)
// person.name.firstName = 'Akhil'; // check console
// display(person.name.firstName);


	// function mergeHealthStatsModified(person, healthStats) {
	// 	return Object.assign({}, person, healthStats)
	// }

	// function Person(firstName, lastName) {
	// 	this.firstName = firstName;
	// 	this.lastName = lastName;
	// }
	//
	// display(Person.prototype)
	// let jim = new Person('Jim', 'Cooper');
	// display(jim.__proto__);
	// display(display.prototype);
	// display(Person.prototype === jim.__proto__)
//	if two objects are equal they are actually the exact same instance in memory
})();
