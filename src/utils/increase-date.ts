export const increaseDate = (date: Date, increaseMinutes: number) => {
  return new Date(date.getTime() + (increaseMinutes * 60 * 1000));
};
