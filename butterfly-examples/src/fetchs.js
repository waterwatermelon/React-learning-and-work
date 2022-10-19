export function getNodeState() {

}


export function delay(time) {
  return new Promise((res, rej) => {
    setTimeout(res, time);
  });
}