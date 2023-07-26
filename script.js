const logButton = document.getElementById("log-btn");
const logList = document.getElementById("log-list");
let loggedHours = [];


logButton.addEventListener("click", logHours);
const timeInputs = document.querySelectorAll("input[type='text'][maxlength='5']");
timeInputs.forEach((input) => {
  input.addEventListener("input", formatTimeInput);
});

function formatTimeInput(event) {
  const input = event.target;
  const inputVal = input.value.replace(/\D/g, ""); // Remove non-numeric characters
  const formattedVal = inputVal.replace(/(\d{2})(\d{0,2})/, "$1:$2"); // Add colon at the middle
  input.value = formattedVal;
}
function logHours() {
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;
  const workHours = parseInt(document.getElementById("work-hours").value);

  if (startTime && endTime && !isNaN(workHours)) {
    const startTimeInMinutes = convertToMinutes(startTime);
    const endTimeInMinutes = convertToMinutes(endTime);

    let minutesDiff = endTimeInMinutes - startTimeInMinutes - (workHours * 60);

    loggedHours.push(minutesDiff);
    displayLoggedHours();
    calculateTotalHourAmount();
  }
}

function displayLoggedHours() {
  logList.innerHTML = "";

  loggedHours.forEach((minutes, index) => {
    const dayNumber = index + 1;
    const hours = Math.floor(Math.abs(minutes) / 60);
    const minutesRemainder = Math.abs(minutes) % 60;
    const sign = minutes >= 0 ? "+" : "-";
    const logText = `Day ${dayNumber}: <span class="${minutes >= 0 ? 'positive' : 'negative'}">${sign}${hours.toString().padStart(2, '0')}:${minutesRemainder.toString().padStart(2, '0')} Hours (${Math.abs(minutes)} Minutes)</span>`;

    const li = document.createElement("li");
    li.innerHTML = logText;
    logList.appendChild(li);
  });
}

function calculateTotalHourAmount() {
  const totalMinutes = loggedHours.reduce((total, minutes) => total + minutes, 0);
  const hours = Math.floor(Math.abs(totalMinutes) / 60);
  const minutes = Math.abs(totalMinutes) % 60;
  const sign = totalMinutes >= 0 ? "+" : "-";
  const totalHourAmountElement = document.getElementById("total-hour-amount");

  totalHourAmountElement.innerHTML = `Total Hours: <span class="${totalMinutes >= 0 ? 'positive' : 'negative'}">${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} Hours (${Math.abs(totalMinutes)} Minutes)</span>`;
}

function convertToMinutes(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

