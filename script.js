const inputTime = document.querySelector("#datetimeInput");
const options = document.querySelector("#direction");
const result = document.querySelector("#result");

inputTime.addEventListener("input", conversion);
options.addEventListener("change", conversion);

function conversion() {
  const inputValue = inputTime.value.trim();
  if (!inputValue) {
    result.innerText = "Enter a valid date and time.";
    return;
  }

  const date = CustomDateTime(inputValue);
  if (!date) {
    result.innerText = "Invalid datetime format. Use DD-MM-YYYY or DD-Month-YYYY HH:mm";
    return;
  }

  const convTime = 3.5 * 60 * 60 * 1000;
  let convertedDate;

  switch (options.value) {
    case "ist-to-jst":
      convertedDate = new Date(date.getTime() + convTime);
      break;
    case "jst-to-ist":
      convertedDate = new Date(date.getTime() - convTime);
      break;
    default:
      result.innerText = "Select a valid conversion direction.";
      return;
  }

  result.innerText = `Converted time: ${convertedDate.toLocaleString()}`;
}

function CustomDateTime(input) {
  const months = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, sept: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11,
  };

  const trimmed = input.trim().replace(/\s+/g, " ");
  const [dateStr, timeStr] = trimmed.split(" ");
  if (!dateStr || !timeStr) return null;

  const dateParts = dateStr.split(/[-\/]/);
  if (dateParts.length !== 3) return null;

  let [dayStr, monthStr, yearStr] = dateParts;
  const [hourStr, minuteStr] = timeStr.split(":");

  const day = Number(dayStr);
  const year = Number(yearStr);
  const hour = Number(hourStr);
  const minute = Number(minuteStr);

  let month;
  if (isNaN(monthStr)) {
    month = months[monthStr.toLowerCase()];
    if (month === undefined) return null;
  } else {
    month = Number(monthStr) - 1;
  }

  const date = new Date(year, month, day, hour, minute);

  console.log({ input, year, month, day, hour, minute, finalDate: date });

  return isNaN(date) ? null : date;
}
