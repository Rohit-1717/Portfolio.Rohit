import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";

const GlobeComponent = () => {
  const globeEl = useRef();

  useEffect(() => {
    const cities = [
      { lat: 24.0465, lng: 84.0768, city: "Daltonganj" },
      // Add more cities as needed
    ];

    const world = Globe()(globeEl.current)
      .globeImageUrl(
        "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      .htmlElementsData(cities)
      .htmlElement((d) => {
        const el = document.createElement("div");
        el.style.position = "relative";
        el.style.cursor = "pointer";

        // Create location marker using inline SVG with a properly adjusted viewBox
        const marker = document.createElement("div");
        marker.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
            <g transform="scale(1)">
              <path d="M26,41l-2,5l-2,-5v-27h4z" fill="#c5cae9"></path>
              <path d="M32,10c0,4.4 -3.6,8 -8,8c-4.4,0 -8,-3.6 -8,-8c0,-4.4 3.6,-8 8,-8c4.4,0 8,3.6 8,8z" fill="#ff0000"></path>
              <path d="M19,11c-0.6,0 -1,-0.4 -1,-1c0,-3.3 2.7,-6 6,-6c0.6,0 1,0.4 1,1c0,0.6 -0.4,1 -1,1c-2.2,0 -4,1.8 -4,4c0,0.6 -0.4,1 -1,1z" fill="#ffab91"></path>
            </g>
          </svg>
        `;
        marker.style.width = "24px";
        marker.style.height = "24px";
        marker.style.position = "absolute";
        marker.style.transform = "translate(-50%, -50%)"; // Center the marker

        // Create tooltip for city name
        const tooltip = document.createElement("div");
        tooltip.innerHTML = d.city;
        tooltip.style.position = "absolute";
        tooltip.style.bottom = "30px"; // Adjust position to not overlap marker
        tooltip.style.left = "50%";
        tooltip.style.transform = "translateX(-50%)";
        tooltip.style.padding = "5px 10px";
        tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        tooltip.style.color = "white";
        tooltip.style.borderRadius = "3px";
        tooltip.style.whiteSpace = "nowrap";
        tooltip.style.fontSize = "12px";
        tooltip.style.display = "none";
        tooltip.style.pointerEvents = "none";

        // Show tooltip on hover
        el.addEventListener("mouseover", () => {
          tooltip.style.display = "block";
        });

        el.addEventListener("mouseout", () => {
          tooltip.style.display = "none";
        });

        el.appendChild(marker);
        el.appendChild(tooltip);
        return el;
      })
      .pointOfView({ lat: 26.7804, lng: 80.929, altitude: 2 }); // Adjust view to the first city

    return () => {
      world._destructor(); // Clean up globe instance on component unmount
    };
  }, []);

  return (
    <div>
      <div ref={globeEl} style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default GlobeComponent;
