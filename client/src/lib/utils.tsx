/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */

// copied from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array (Fisher–Yates shuffle algorithm.)
export function shuffle(a: Array<any>) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Generates initials from a string.
 * @param {string} name
 */

// copied from https://www.codegrepper.com/code-examples/javascript/get+initials+from+name+javascript
export const getInitials = (name: string) => {
  let initials: any = name.split(" ");

  if (initials.length > 1) {
    initials = initials.shift().charAt(0) + initials.pop().charAt(0);
  } else {
    initials = name.substring(0, 2);
  }

  return initials.toUpperCase();
};
