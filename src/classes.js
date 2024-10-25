import { relativeTime } from "human-date";

export class TimedEvent {
  id;
  date;
  time;
  description;
  repeat;
  repeatTimes;
  active;
  constructor(date, time, description, repeat, repeatTimes, active) {
    this.id = Date.now();
    this.date = date;
    this.time = time;
    this.description = description;
    this.repeat = repeat;
    this.repeatTimes = repeatTimes;
    this.active = active;
  }

  asString = () => {
    return `${this.date} ${this.time} - ${this.description}`;
  };

  asRelativeDate = (date, time) => {
    const currenteDate = new Date(`${date}T${time}`);
    const realNow = new Date();
    const difference = currenteDate - realNow;

    const thisDate = new Date(`${this.date}T${this.time}`);
    const modifiedThisDate = new Date(thisDate.getTime() - difference);

    return relativeTime(modifiedThisDate);
  };
}
