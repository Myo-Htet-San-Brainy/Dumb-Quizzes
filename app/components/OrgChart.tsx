import React, { useLayoutEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";
import { select } from "d3";
import { NodeData } from "@/app/lib/entities";
import { data } from "../lib/static";

export const OrgChartComponent: React.FC<{
  data: NodeData[];
}> = (props) => {
  const d3Container = useRef(null);
  const chartRef = useRef(new OrgChart());
  let i = 1;

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      //
      chartRef.current
        .container(d3Container.current)
        .data(props.data)
        .nodeContent((data) => {
          const nodeData = data.data as NodeData;
          return `<div style="padding: 20px; font-size: 1.25rem; color: #1d4ed8;">${nodeData.id}</div>`;
        })
        .linkUpdate(function (this: SVGPathElement, d, i, arr) {
          // d3.select(this) refers to the current link element
          const link = select(this);
          // console.log(link);

          // Access the data for the current link
          const mateItsNodeData = d.data as NodeData;
          const linkStyle = mateItsNodeData.linkStyle;

          //have link color to blue here
          link.attr("stroke", "#4169E1");
          if (i % 2 === 0) {
            link.attr("transform", `translate(0, 30)`);
          }

          // Apply different styles based on the linkStyle property
          switch (linkStyle) {
            case "dashed":
              link.attr("stroke-width", 2).attr("stroke-dasharray", "5,5");
              break;

            default:
              link.attr("stroke-width", 1).attr("stroke-dasharray", null);
          }
        })
        .nodeUpdate(function (this: SVGGElement, d, i, arr) {
          // console.log(d);
          const node = select(this);
          // //
          // if (d.id === "7" && d.y !== undefined) {
          //   node.
          // }
          const nodeRect = node.select(".node-rect");
          // Apply styles to the rectangle
          nodeRect
            .attr("stroke", "blue") // Set border color to blue
            .attr("stroke-width", 2) // Set border thickness to 2px
            .attr("rx", 5) // Set horizontal corner radius (rounded corners)
            .attr("ry", 5); // Set vertical corner radius (rounded corners)
        })
        .nodeButtonWidth((d) => 0)
        .nodeButtonHeight((d) => 0)
        .buttonContent((params) => {
          return "";
        })
        .layout("top")
        .render();

      const layout = chartRef.current.layoutBindings();

      layout.top.nodeUpdateTransform = (param) => {
        if (i % 2 === 0) {
          i += 1;
          return `translate(${param.x - param.width / 2}, ${param.y + 30})`;
        }
        i += 1;

        return `translate(${param.x - param.width / 2}, ${param.y})`;
      };

      chartRef.current.layoutBindings(layout).render();
      console.log(chartRef.current.getChartState());
      // chartRef.current.render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};
