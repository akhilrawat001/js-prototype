'use strict';
(function () {

	// let myFunction = function () {}
	// let a = {firstName:'Jim'}
	// display(myFunction.prototype)
	// display(a.prototype)
	// display(a.__proto__)
	function Person(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	display(Person.prototype)
	let jim = new Person('Jim', 'Cooper');
	display(jim.__proto__);
	display(display.prototype);
	display(Person.prototype === jim.__proto__)
//	if two objects are equal they are actually the exact same instance in memory
})();
