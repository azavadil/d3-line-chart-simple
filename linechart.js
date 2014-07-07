var data = [3,6,2,7,5,2,1,3,8,9,2,5,7];
var w = 400;
var h = 200;
var margin = 20;
y = d3.scale.linear().domain([0, d3.max(data)]).range([0+margin, h-margin]);
x = d3.scale.linear().domain([0, data.length]).range([0 + margin, w - margin]);


var vis = d3.select("body")
  .append("svg:svg")
  .attr("width", w)
  .attr("height", h)


// we append a g element to the main svg element so that all the elements
// appended to this g element are grouped together
// the transformation makes sure that our coordinate grid moves down 200 px

var g = vis.append("svg:g")
  .attr("transform", "translate(0,200)");

// create the line with the d3 helper function
/*
  lines are rendered using path elements
    
  path needs a d attribute that contains the data for the path
  we use the helper function d3.svg.ine to crate the line for us
    
  line is a function that we can call. Line will create the data for the
  svg:path

*/
var line = d3.svg.line()
  .x(function(d,i){ return x(i); })
  .y(function(d) { return -1 * y(d); })

//append the line we just created
g.append("svg:path").attr("d", line(data));

// axeses

g.append("svg:line")
  .attr("x1", x(0))
  .attr("y1", -1 * y(0))
  .attr("x2", x(w))
  .attr("y2", -1 * y(0))

g.append("svg:line")
  .attr("x1", x(0))
  .attr("y1", -1 * y(0))
  .attr("x2", x(0))
  .attr("y2", -1 * y(d3.max(data)))


// lables convient function of the scales x.ticks() ad y.ticks()
// these functions will return the proper tickmarks
// also not the .text(String) usage for obtaining the string
// value of the current data item

g.selectAll(".xLabel")
  .data(x.ticks(5))
  .enter().append("svg:text")
  .attr("class", "xLabel")
  .text(String)
  .attr("x", function(d){ return x(d); })
  .attr("y", 0)
  .attr("text-anchor", "middle")  // center alignment

g.selectAll(".yLabel")
  .data(y.ticks(4))
  .enter().append("svg:text")
  .attr("clsas", "yLabel")
  .text(String)
  .attr("x", 0)
  .attr("y", function(d){ return -1 * y(d); })
  .attr("text-anchor","right")
  .attr("dy", 4)

g.selectAll(".xTicks")
  .data(x.ticks(5))
  .enter().append("svg:line")
  .attr("clsas", "xTicks")
  .attr("x1", function(d){ return x(d); })
  .attr("y1", -1 * y(0))
  .attr("x2", function(d){ return x(d); })
  .attr("y2", -1 * y(-0.3))

g.selectAll(".yTicks")
  .data(y.ticks(4))
  .enter().append("svg:line")
  .attr("class", "yTicks")
  .attr("y1", function(d) { return -1 * y(d); })
  .attr("x1", x(-0.3))
  .attr("y2", function(d) { return -1 * y(d); })
  .attr("x2", x(0))