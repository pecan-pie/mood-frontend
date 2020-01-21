// set the dimensions and margins of the graph
var margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 70
};

var width = 800 - margin.left - margin.right;
var height = 180 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select(".visualization-heatmap-weeks")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Labels of row and columns
var weeksInYear = Array.from(Array(moment().weeksInYear()).keys());
var daysInWeek = Array.from(Array(7).keys()).reverse();

// Build x scales and axis:
var x = d3
  .scaleBand()
  .domain(weeksInYear)
  .range([10, width])
  .padding(0);

  xAxis = d3.axisTop(x).tickSize(3).tickValues(x.domain().filter(d => {
    var currentWeek = moment().week(d);
    var weekdays = Array.from(Array(7).keys())
    return weekdays.map( i => moment(currentWeek.day(i))).filter(element => element.date() == 1).length > 0
  })).tickFormat(d => {
    var currentWeek = moment().week(d);
    var weekdays = Array.from(Array(7).keys())
    var firstDaysOfMonth = weekdays.map( i => moment(currentWeek.day(i))).filter(element => element.date() == 1)
    firstDayOfMonth = firstDaysOfMonth.pop()
    return firstDayOfMonth.format("MMM")
  });

  svg
    .append("g")
    .attr("transform", "translate(0,0)")
    .call(xAxis);

// Build y scales and axis:
var y = d3
  .scaleBand()
  .domain(daysInWeek)
  .range([height - 10, 10])
  .padding(0);

yAxis = d3.axisLeft(y).tickSize(0)
.tickValues(y.domain().filter(d =>!(d%3)))
.tickFormat(d =>
  moment()
    .day(d+1)
    .format("dddd")
)


svg.append("g").call(yAxis);

// Build color scale
var myColor = d3
  .scaleLinear()
  .range(["#d1d1e0", "#3399ff"])
  .domain([1, 100]);

var randomData = [];

for (let day in daysInWeek) {
  for (let week in weeksInYear) {
    randomData.push({
      y: day,
      x: week,
      value: Math.random() + 0.15
    });
  }
}

svg
  .selectAll()
  .data(randomData)
  .enter()
  .append("rect")
  .attr("x", d => x(d.x))
  .attr("y", d => y(d.y))
  .attr("width", x.bandwidth())
  .attr("height", y.bandwidth())
  .style("fill", d => d3.interpolateRdYlGn(d.value));