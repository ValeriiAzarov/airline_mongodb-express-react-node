import moment from "moment";

const parseDuration = (duration) => {
    let remain = duration;
    let days = Math.floor(remain / (1000 * 60 * 60 * 24)); remain = remain % (1000 * 60 * 60 * 24);
    let hours = Math.floor(remain / (1000 * 60 * 60)); remain = remain % (1000 * 60 * 60);
    let minutes = Math.floor(remain / (1000 * 60)); remain = remain % (1000 * 60);
    let seconds = Math.floor(remain / (1000)); remain = remain % (1000);
    let milliseconds = remain;
    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds
    };
}
  
const formatTime = (date) => {
    let parts = [];
    if (date.days) {
        let ret = date.days + " day";
        if (date.days !== 1) {
            ret += "s";
        }
        parts.push(ret);
    }
    if (date.hours) {
        let ret = date.hours + " hour";
        if (date.hours !== 1) {
            ret += "s";
        }
        parts.push(ret);
    }
    if (date.minutes) {
        let ret = date.minutes + " minute";
        if (date.minutes !== 1) {
            ret += "s";
        }
        parts.push(ret);
    }
    if (date.seconds) {
        let ret = date.seconds + " second";
        if (date.seconds !== 1) {
            ret += "s";
        }
        parts.push(ret);
    }
    if (parts.length === 0) {
        return "instantly";
    } 
    else {
        return parts.join(" ");
    }
}   
  
function formatDuration(startDate, endDate) {
    const start = Date.parse(moment(startDate).format('YYYY-MM-DD HH:mm:ss'));
    const end = Date.parse(moment(endDate).format('YYYY-MM-DD HH:mm:ss'));
    const duration = start - end;
    let time = parseDuration(duration)
    return formatTime(time);
}

export default formatDuration;