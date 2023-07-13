const getCurrentDate = (): string => {
  const currentDate = new Date();

  const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayOfWeek: string = daysOfWeek[currentDate.getUTCDay()];
  const dayOfMonth: number = currentDate.getUTCDate();
  const month: string = monthsOfYear[currentDate.getUTCMonth()];

  return `${dayOfWeek} ${dayOfMonth} ${month}`;
}

export default getCurrentDate;
