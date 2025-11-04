import dayjs from 'dayjs';

const formatDate = (dateString) => {
  if (!dateString) { return ''; }
  return dayjs(dateString).format('MMM D').toUpperCase();
};

const formatTime = (dateString) => {
  if (!dateString) { return ''; }
  return dayjs(dateString).format('HH:mm');
};

const calculateDuration = (dateFrom, dateTo) => {
  if (!dateFrom || !dateTo) { return ''; }
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);
  const diffMins = Math.max(0, to.diff(from, 'minute'));

  if (diffMins < 60) {
    return `${diffMins}M`;
  }

  const hours = Math.floor(diffMins / 60);
  const minutes = diffMins % 60;

  if (minutes === 0) {
    return `${hours}H`;
  }

  return `${hours}H ${minutes}M`;
};

const formatDateForInput = (dateString) => {
  if (!dateString) { return ''; }
  return dayjs(dateString).format('DD/MM/YY HH:mm');
};

export {formatDate, formatTime, calculateDuration, formatDateForInput};

