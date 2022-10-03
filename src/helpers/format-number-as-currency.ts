export const formatNumberAsCurrency = (amount: number, locale = 'ru-RU') => new Intl.NumberFormat(locale).format(amount);
