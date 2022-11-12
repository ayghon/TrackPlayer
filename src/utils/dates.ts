export const isInBetweenHours = (date: Date, start: number, end: number) =>
  (date.getHours() > start && date.getHours() < end) ||
  date.getHours() === start ||
  date.getHours() === end;

export const getWelcomeMessageByPeriod = () => {
  const now = new Date();
  // 5h -> 12h
  if (isInBetweenHours(now, 5, 12)) {
    return 'Good morning';
  }

  // 13h -> 17h
  if (isInBetweenHours(now, 13, 17)) {
    return 'Good afternoon';
  }

  // 18h -> 21h
  if (isInBetweenHours(now, 18, 21)) {
    return 'Good evening';
  }

  // 22h -> 4h
  if (isInBetweenHours(now, 22, 4)) {
    return 'Good night';
  }

  return 'Hello World';
};
