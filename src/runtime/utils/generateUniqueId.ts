export default function generateUniqueId(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  // Prefer crypto for better uniqueness when available
  const getRandom = (max: number) => {
    if (
      typeof crypto !== "undefined" &&
      typeof crypto.getRandomValues === "function"
    ) {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      return array[0] % max;
    }
    return Math.floor(Math.random() * max);
  };

  let result = "";
  for (let index = 0; index < length; index++) {
    result += characters.charAt(getRandom(charactersLength));
  }
  return result;
}
