export function getWeekDates(currentDate: Date): Date[] {
  const dates = [];
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(date);
  }

  return dates;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatDateForSchedule(date: Date): string {
  return date.toISOString().split("T")[0];
}
