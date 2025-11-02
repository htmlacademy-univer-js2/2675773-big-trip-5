const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  return `${month} ${day}`;
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const calculateDuration = (dateFrom, dateTo) => {
  const from = new Date(dateFrom);
  const to = new Date(dateTo);
  const diffMs = to - from;
  const diffMins = Math.floor(diffMs / 60000);
  
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
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export {formatDate, formatTime, calculateDuration, formatDateForInput};

