export const rand = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
}