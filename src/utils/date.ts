export const formatDateTime = (
  dateTimeString: string,
  format?: 'date' | 'time' | 'dataTime' | 'relative',
): string => {
  const dt: Date = new Date(dateTimeString);

  if (isNaN(dt.getTime())) {
    return '';
  }

  const now: Date = new Date();
  const diffInMs: number = now.getTime() - dt.getTime();
  const diffInMinutes: number = Math.floor(diffInMs / (1000 * 60));
  const diffInHours: number = Math.floor(diffInMs / (1000 * 60 * 60));

  const year = dt.getFullYear().toString();
  const month = (dt.getMonth() + 1).toString().padStart(2, '0');
  const day = dt.getDate().toString().padStart(2, '0');
  const hour = dt.getHours().toString().padStart(2, '0');
  const minute = dt.getMinutes().toString().padStart(2, '0');
  const second = dt.getSeconds().toString().padStart(2, '0');

  if (format === 'relative') {
    if (diffInMinutes < 1) {
      return '방금 전';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return `${year}-${month}-${day}`;
    }
  } else if (format === 'date') {
    return `${year}-${month}-${day}`;
  } else if (format === 'time') {
    return `${hour}:${minute}:${second}`;
  } else {
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
};
