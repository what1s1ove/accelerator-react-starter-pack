export const formatDate = (date: Date) => new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: 'long',
}).format(date);
