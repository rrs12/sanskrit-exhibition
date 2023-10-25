const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 9, value: 6 },
  { minDegree: 10, maxDegree: 27, value: 5 },
  { minDegree: 28, maxDegree: 45, value: 4 },
  { minDegree: 46, maxDegree: 63, value: 3 },
  { minDegree: 64, maxDegree: 81, value: 2 },
  { minDegree: 82, maxDegree: 99, value: 1 },
  { minDegree: 100, maxDegree: 117, value: 20 },
  { minDegree: 118, maxDegree: 135, value: 19 },
  { minDegree: 136, maxDegree: 153, value: 18 },
  { minDegree: 154, maxDegree: 171, value: 17 },
  { minDegree: 172, maxDegree: 189, value: 16 },
  { minDegree: 190, maxDegree: 207, value: 15 },
  { minDegree: 208, maxDegree: 225, value: 14 },
  { minDegree: 226, maxDegree: 243, value: 13 },
  { minDegree: 244, maxDegree: 261, value: 12 },
  { minDegree: 262, maxDegree: 279, value: 12 },
  { minDegree: 280, maxDegree: 297, value: 10 },
  { minDegree: 298, maxDegree: 315, value: 9 },
  { minDegree: 316, maxDegree: 333, value: 8 },
  { minDegree: 334, maxDegree: 351, value: 7 },
  { minDegree: 352, maxDegree: 360, value: 6 },





];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,16,16];
//background color for each piece
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      spinBtn.disabled = false;
      console.log(angleValue)
      myChart.options.rotation = 0;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  myChart.options.rotation = 0;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});