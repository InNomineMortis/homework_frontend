'use strict';

QUnit.module('Тестируем функцию get', function () {
	QUnit.test('get работает правильно c объектами с существующими свойствами', function (assert) {
		const object = {
			foo: 'bar',
			deep: {
				hested: {
					field: 'baz'
				}
			}
		};

		assert.strictEqual(get(object, '.foo'), object.foo);
		assert.strictEqual(get(object, '.deep.hested.field'), object.deep.hested.field);
		assert.deepEqual(get(object, '.deep.hested'), object.deep.hested);
		assert.deepEqual(get(object, '.deep'), object.deep);
		assert.deepEqual(get(object, '.'), object);
	});

	QUnit.test('get работает правильно c массивами', function (assert) {
		const object = {
			foo: 'bar',
			baz: [ 1, 2, 3 ],
			deep: [
				{foobar: '42'}
			]
		};

		assert.strictEqual(get(object, '.foo.0'), object.foo[ 0 ]);
		assert.strictEqual(get(object, '.foo.length'), object.foo.length);
		assert.strictEqual(get(object, '.baz.0'), object.baz[ 0 ]);
		assert.strictEqual(get(object, '.baz.length'), object.baz.length);
		assert.strictEqual(get(object, '.deep.0.foobar'), object.deep[ 0 ].foobar);
	});

	QUnit.test('get работает правильно c объектами без свойств', function (assert) {
		const object = {
			foo: {
				bar: 42
			}
		};

		assert.strictEqual(get(object, '.foobar'), undefined);
		assert.strictEqual(get(object, '.foo.baz'), undefined);
		assert.strictEqual(get(object, '.baz.0'), undefined);
		assert.strictEqual(get(object, '.baz.length'), undefined);
		assert.strictEqual(get(object, '.0.1.2'), undefined);
	});

	QUnit.test('get работает правильно c пустыми объектами ', function (assert) {
		const object = {
			name : null,
		};

		assert.strictEqual(get(object, '.'), object);
		assert.strictEqual(get(object, 'object'), undefined);
		assert.strictEqual(get(object, '.0'), undefined);
		assert.strictEqual(get(object, '.name'), object.name);
		assert.strictEqual(get(object, '.null'), undefined);
	});
	QUnit.test('get не работает если объект не объект', function (assert) {
		const object = '.';
		assert.strictEqual(get(object, '.'), undefined);
		const object_1 = 12;
		assert.strictEqual(get(object_1, 'object'), undefined);
		const object_2 = null;
		assert.strictEqual(get(object_2, '.null'), undefined);
	});

	QUnit.test('get не работает если поле не строка', function (assert) {
		const object = {
			foo: {
				bar: 42
			}
		};
		assert.strictEqual(get(object, 12), undefined);
		assert.strictEqual(get(object, null), undefined);
		assert.strictEqual(get(object, undefined), undefined);
		assert.strictEqual(get(object, NaN), undefined);
	});
});
