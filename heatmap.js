// set the dimensions and margins of the graph
var margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 70
  };

  var width = 600 - margin.left - margin.right;
  var height = 300 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select(".visualization")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Labels of row and columns
  var days = Array.from(Array(31).keys());
  var months = Array.from(Array(12).keys()).reverse();

  // Build x scales and axis:
  var x = d3
    .scaleBand()
    .domain(days)
    .range([10, width])
    .padding(0);

  //   xAxis = d3.axisBottom(x).tickSize(0).tickValues(x.domain().filter(d => !(d % 2)));

  //   svg
  //     .append("g")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis);

  // Build y scales and axis:
  var y = d3
    .scaleBand()
    .domain(months)
    .range([height - 10, 0])
    .padding(0);

  yAxis = d3.axisLeft(y).tickSize(0)
  .tickFormat(d =>
    moment()
      .month(d)
      .format("MMMM")
  );

  svg.append("g").call(yAxis);

  // Build color scale
  var myColor = d3
    .scaleLinear()
    .range(["#d1d1e0", "#3399ff"])
    .domain([1, 100]);

  var randomData = [];

  for (let month in months) {
    for (let day in days) {
      if (
        day <
        moment()
          .month(month)
          .daysInMonth()
      ) {
        randomData.push({
          y: month,
          x: day,
          value: Math.random() + 0.15
        });
      }
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