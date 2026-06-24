const numbers = [8, 2, 3, 5];

function getFirstElement<CustomType>(array: CustomType[]): CustomType {
  return array[0];
}

const strings = ["8", "2", "3", "5"];
const firstString = getFirstElement<string>(strings);

const firstNumber = getFirstElement<number>(numbers);

function include<T>(arr: T[], item: T) {
  arr.indexOf(item) > -1 ? true : false;
}

console.log(include<number>([1, 2, 3], 3));
console.log(include<string>(["1", "2", "3"], "8"));
