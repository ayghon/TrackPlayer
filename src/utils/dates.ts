import { i18nKeys } from '../services';

export const isInBetweenHours = (date: Date, start: number, end: number) =>
  (date.getHours() > start && date.getHours() < end) ||
  date.getHours() === start ||
  date.getHours() === end;

export const getWelcomeMessageByPeriod = () => {
  const now = new Date();
  // 5h -> 12h
  if (isInBetweenHours(now, 5, 12)) {
    return i18nKeys.routes.tabs.home.header_title.period.morning;
  }

  // 13h -> 17h
  if (isInBetweenHours(now, 13, 17)) {
    return i18nKeys.routes.tabs.home.header_title.period.afternoon;
  }

  // 18h -> 21h
  if (isInBetweenHours(now, 18, 21)) {
    return i18nKeys.routes.tabs.home.header_title.period.evening;
  }

  // 22h -> 4h
  if (isInBetweenHours(now, 22, 4)) {
    return i18nKeys.routes.tabs.home.header_title.period.night;
  }

  return i18nKeys.routes.tabs.home.header_title.period.default;
};
