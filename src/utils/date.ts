export const formatDateTime = (
  dateTimeString: string,
  format?: 'date' | 'time' | 'dataTime',
): string => {
  const dt: Date = new Date(dateTimeString);

  if (isNaN(dt.getTime())) {
    return '';
  }

  const year = dt.getFullYear().toString();
  const month = (dt.getMonth() + 1).toString().padStart(2, '0');
  const day = dt.getDate().toString().padStart(2, '0');
  const hour = dt.getHours().toString().padStart(2, '0');
  const minute = dt.getMinutes().toString().padStart(2, '0');
  const second = dt.getSeconds().toString().padStart(2, '0');

  if (format === 'date') {
    return `${year}-${month}-${day} `;
  } else if (format === 'time') {
    return `${hour}:${minute}:${second}`;
  } else {
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
};
