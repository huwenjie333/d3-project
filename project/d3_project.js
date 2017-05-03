d3.csv("mpg.csv", function(data){

  // initialize the plot window
  var w = 1000;
  var h = 400;
  var padding = 20;

  svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

  var xMax = d3.max(data, function(d) {return d.displ;}) * 1.05;
  var xMin = d3.min(data, function(d) {return d.displ;}) * 0.95;
  var yMax = d3.max(data, function(d) {return d.hwy;}) * 1.05;
  var yMin = d3.min(data, function(d) {return d.hwy;}) * 0.95;

  // set the scale of x,y axis, and color
  var xScale = d3.scaleLinear()
      .domain([xMin, xMax])
      .range([padding, w - padding]);

  var yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([h - padding, padding]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var color_dict = {"2seater":1, "compact":2, "subcompact": 3, "midsize": 4, "suv": 5, "minivan": 6, "pickup": 7}

  // add x,y axis
  var xAxis = d3.axisBottom()
        .scale(xScale);

  var yAxis = d3.axisLeft()
        .scale(yScale);

  var gX = svg.append("g")
    .call(xAxis)
    .attr("transform", "translate(0,"+(h-padding)+")");

  var gY = svg.append("g")
    .call(yAxis)
    .attr("transform", "translate("+padding+",0)");

  // add zoom
  var zoom = d3.zoom()
    // .x(xScale)
    // .y(yScale)
      .scaleExtent([1, 40])
      .translateExtent([[-100, -100], [w + 90, h + 100]])
      .on("zoom", zoomed);

  svg.call(zoom);

  function zoomed() {
    circles.attr("transform", d3.event.transform);
    gX.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
    gY.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
  }

  // add tips
  var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10,0])
        .html(function(d) {
          return "Car: "+d.manufacturer+" "+d.model+"<br>" +
              "Displacement: " + d.displ + "<br>" +
              "Highway MPG: " + d.hwy;
        });


  svg.call(tip);

  // draw the circle/points 
  var circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d){return xScale(d.displ);})
    .attr("cy", function(d){return yScale(d.hwy);})
    .attr("r", "3px")
    .style("fill", function(d) {return color(color_dict[d.class]);})
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

  // TO-DO: add tip transition, fix circles boundary, legend, axis label, title



});

    