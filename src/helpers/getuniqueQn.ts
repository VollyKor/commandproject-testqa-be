// Function that return 12 unique questions from array
// ================================================
export default function getuniqueQns<T>(array: T[]): T[] {
  const newArray = [];

  (function getItem() {
    const randomNumber = Math.round(Math.random() * (array.length - 1));

    if (newArray.length >= 12) return;

    if (newArray.includes(array[randomNumber])) {
      return getItem();
    }

    newArray.push(array[randomNumber]);

    return getItem();
  })();
  return newArray;
}
