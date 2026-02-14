export function formatDate(date: string): string {
  const data = new Date(Number(date));
  const day = data.getDate();
  const month = data.getMonth();
  const year = data.getFullYear();
  const hours = data.getHours() > 9 ? data.getHours() : data.getHours().toString().padStart(2, '0');

  const minutes =
    data.getMinutes() > 9 ? data.getMinutes() : data.getMinutes().toString().padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}
