const counterObj = {};

const getCountForKey = (key) => {
	if (counterObj[key]) {
		return ++counterObj[key];
	}

	counterObj[key] = 1;

	return counterObj[key];
};

const named = (object, groupName) => {
	if (!_.isObject(object) || _.isEmpty(object)) return console.error('Input for namedLogger should be only object');
	const keys = _.keys(object);

	const count = getCountForKey(keys.join('_'));

	if (keys.length === 1) return console.log(`${keys[0]}`, object[keys[0]]);

	console.group(groupName || `#${count} call for this group`);
	keys.forEach(key => console.log(`${key}`, object[key]));
	console.groupEnd();
};

const info = (input) => {
	const getType = (elem) => {
		if (_.isArray(elem)) return 'array';
		if (moment.isMoment()) return 'moment';
		if (_.isObject(elem)) return 'object';

		return typeof elem;
	};
	const getStringBody = (elem) => {
		const additional = getAdditional(elem);

		return `TYPE: ${getType(elem)}, BOOL: ${Boolean(elem)}, ${additional ? `${additional}, ` : ''}VALUE:`;
	};
	const getAdditional = (elem) => {
		if (_.isArray(elem) || _.isString(elem)) {
			return `LENGTH: ${elem.length}`;
		}
		if (moment.isMoment(elem)) {
			return `FORMATTED: ${elem.format()}`;
		}
	};

	if (!_.isObject(input) || moment.isMoment(input)) {
		console.log(
			getStringBody(input),
			input
		);

		return;
	}
	const keys = _.keys(input);

	console.group(getType(input));
	keys.forEach(key => {
		const currentElement = input[key];
		console.log(
			getStringBody(currentElement),
			currentElement
		);
	});
	console.groupEnd();
};

export default {
	named,
	info,
};

// try it

// window.l = {
// 	named,
// 	info,
// };

// l.info('test');
// l.info(1);
// l.info([1, 2, 3, 4, 5]);
// l.info({key: 0, key1: 1, key2: 2});

// test = {key: 0, key1: 1, key2: 2};
// test2 = 1;
// test3 = [1, 2, 4, 6];
// l.named({test, test2, test3});
