export function sleep(time) {
  if (time < 0) {
    console.error(time);
  }
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, time);
  });
}