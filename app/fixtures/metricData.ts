
type ChartData = {
  datetime: string,
  iops_read: number,
  iops_write: number,
  throughput_read: number,
  throughput_write: number,
}

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

export const getRandomData = (days = 7) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const size = 1000000
  const data = [] as ChartData[];
  let day = 0;
  while (day < days) {
    let hour = 0;
    while (hour < 24) {
      const d = new Date();
      d.setDate(d.getDate() - (day + 1));
      data.push({
        datetime: `${months[d.getMonth()]} ${d.getDate()}`,
        iops_read: getRandomInt(100000),
        iops_write: getRandomInt(100000),
        throughput_read: getRandomInt(2000000000),
        throughput_write: getRandomInt(2000000000),
      });
      hour++;
    }
    day++;
  };
  return data;
}