import _ from 'lodash';

const propertyActions = [
  {
    type: 'nested',
    check: (key, data1, data2) => (_.isObject(data1[key]) && _.isObject(data2[key])),
    process: (key, data1, data2, f) => ({ type: 'nested', key, children: f(data1[key], data2[key]) }),
  },
  {
    type: 'deleted',
    check: (key, data1, data2) => (_.has(data1, key) && !_.has(data2, key)),
    process: (key, data1) => ({ type: 'deleted', key, value: data1[key] }),
  },
  {
    type: 'added',
    check: (key, data1, data2) => (_.has(data2, key) && !_.has(data1, key)),
    process: (key, data1, data2) => ({ type: 'added', key, value: data2[key] }),
  },
  {
    type: 'unchanged',
    check: (key, data1, data2) => (data1[key] === data2[key]),
    process: (key, data1) => ({ type: 'unchanged', key, value: data1[key] }),
  },
  {
    type: 'changed',
    check: (key, data1, data2) => (_.has(data2, key) && _.has(data1, key)
      && data1[key] !== data2[key]),
    process: (key, data1, data2) => ({
      type: 'changed',
      key,
      value: [data1[key], data2[key]],
    }),
  },
];

const parse = (data1 = {}, data2 = {}) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const result = keys.map(key => propertyActions.find(({ check }) => check(key, data1, data2))
    .process(key, data1, data2, parse));
  // console.log(result);
  return result;
};

export default parse;
