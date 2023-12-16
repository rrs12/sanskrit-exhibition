const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const select_btn= document.getElementById("select")
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 3, value: "दा" },
  { minDegree: 4, maxDegree: 21, value: "ह्री" },
  { minDegree: 22, maxDegree: 39, value: "भी" },
  { minDegree: 40, maxDegree: 57, value: "स्मृ" },
  { minDegree: 58, maxDegree: 75, value: "हन्" },
  { minDegree: 76, maxDegree: 93, value: "भू" },
  { minDegree: 94, maxDegree: 111, value: "कृ"},
  { minDegree: 112, maxDegree: 129, value: "क्रुध्" },
  { minDegree: 130, maxDegree: 147, value: "श्रु" },
  { minDegree: 148, maxDegree: 165, value: "गर्ज्" },
  { minDegree: 166, maxDegree: 183, value: "खाद्" },
  { minDegree: 184, maxDegree: 201, value: "मिल्" },
  { minDegree: 202, maxDegree: 219, value: "स्पृश्" },
  { minDegree: 220, maxDegree: 237, value: "प्रच्छ्" },
  { minDegree: 238, maxDegree: 255, value: "मृ" },
  { minDegree: 256, maxDegree: 273, value: "इष"},
  { minDegree: 274, maxDegree: 291, value: "क्षिप्"},
  { minDegree: 292, maxDegree: 309, value: "चि" },
  { minDegree: 310, maxDegree: 327, value: "नश्"},
  { minDegree: 328, maxDegree: 345, value: "नृत्"},
  { minDegree: 346, maxDegree: 360, value: "दा" },





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
      finalValue.innerHTML = `<p>धातु: ${i.value}</p>`;
      localStorage.setItem("Dhatu", i.value)
      spinBtn.disabled = false;
      select_btn.disabled=false
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
  finalValue.innerHTML = `<p></p>`;
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

function open_pratyay(){
  window.open("https://rrs12.github.io/sanskrit-exhibition/pratyay.html","_self");
}