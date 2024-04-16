import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

function Histogram({ data }) {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      let margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

      const svg = d3
        .select(d3Container.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Bind D3 data
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d[0];
          })
        )
        .padding(0.05);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 300]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d[0]);
        })
        .attr("y", function (d) {
          return y(d[1]);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d[1]);
        })
        .attr("fill", "#69b3a2");
    }
  }, [data]);

  return (
    <>
      <svg className="histogram" width={400} height={200} ref={d3Container} />
    </>
  );
}

export default Histogram;
