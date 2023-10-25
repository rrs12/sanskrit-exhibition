const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 9, value: "दा" },
  { minDegree: 10, maxDegree: 27, value: "ह्री" },
  { minDegree: 28, maxDegree: 45, value: "भी" },
  { minDegree: 46, maxDegree: 63, value: "स्मृ" },
  { minDegree: 64, maxDegree: 81, value: "हन्" },
  { minDegree: 82, maxDegree: 99, value: "भू" },
  { minDegree: 100, maxDegree: 117, value: "कृ"},
  { minDegree: 118, maxDegree: 135, value: "क्रुध्" },
  { minDegree: 136, maxDegree: 153, value: "श्रु" },
  { minDegree: 154, maxDegree: 171, value: "गर्ज्" },
  { minDegree: 172, maxDegree: 189, value: "खाद्" },
  { minDegree: 190, maxDegree: 207, value: "मिल् " },
  { minDegree: 208, maxDegree: 225, value: "स्पृश्" },
  { minDegree: 226, maxDegree: 243, value: "प्रच्छ्" },
  { minDegree: 244, maxDegree: 261, value: "मृ" },
  { minDegree: 262, maxDegree: 279, value: "इष"},
  { minDegree: 280, maxDegree: 297, value: "क्षिप्"},
  { minDegree: 298, maxDegree: 315, value: "चि" },
  { minDegree: 316, maxDegree: 333, value: "नश्"},
  { minDegree: 334, maxDegree: 351, value: "नृत्"},
  { minDegree: 352, maxDegree: 360, value: "दा" },





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
    labels: ["भू", "हन्", "स्मृ","भी","ह्री", "दा","नृत्","नश्","चि","क्षिप्","इष","मृ","प्रच्छ्","स्पृश्","मिल् ","खाद्","गर्ज्","श्रु","क्रुध्","कृ"],
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
        font: { size: 14 },
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
      localStorage.setItem("Dhatu", i.value)
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