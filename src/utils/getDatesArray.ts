function getDatesArray(minDate: Date, maxDate: Date): Date[] {
  const dates: Date[] = [];
  const currentDate = new Date(minDate);

  // Normalize the time part to avoid unexpected results
  currentDate.setHours(0, 0, 0, 0);
  maxDate = new Date(maxDate);
  maxDate.setHours(0, 0, 0, 0);

  while (currentDate <= maxDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export default getDatesArray;
