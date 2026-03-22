function formatDateTime(iso: string) {
  const monthsShort = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ];
  const dt = new Date(iso);
  const day = String(dt.getDate()).padStart(2, '0');
  const month = monthsShort[dt.getMonth()];
  const year = dt.getFullYear();

  const formatted = `${day} / ${month} `;
  const formattedFull = `${day} / ${month} / ${year}`;

  return {
    date: formatted,
    full: formattedFull,
  };
}

export default formatDateTime;
