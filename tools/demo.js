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

// display(john.hasOwnProperty('age'))
// john.age = 10;
// display(john.age);
// display(jane.__proto__.age);
// Person.prototype.age = 50;
// display(jane.__proto__.age);
// display(jane.age);

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
