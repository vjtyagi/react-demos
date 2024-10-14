import { useMemo, useState } from "react";
import CHART_DATA from "./data/chart";
import "./styles/velocity.css";
function Velocity() {
  const [isChartVisible, setChartVisible] = useState(false);
  const maxHeight = useMemo(() => {
    return Math.max.apply(
      null,
      CHART_DATA.map((data) => data.ticketCount)
    );
  }, [CHART_DATA]);
  function handleChartToggle() {
    setChartVisible((prev) => !prev);
  }

  return (
    <>
      <div className="velocity-chart-container">
        <button onClick={handleChartToggle}>Toggle Chart</button>
        {isChartVisible && (
          <div className="chart">
            {CHART_DATA.map((data) => {
              return <Bar key={data.id} data={data} max={maxHeight} />;
            })}
            <label className="y-label">Number of tickets</label>
            <label className="x-label">Departments</label>
          </div>
        )}
      </div>
    </>
  );
}

function Bar({ data, max }: any) {
  return (
    <div
      className="bar"
      style={{
        backgroundColor: `${data.colour}`,
        height: `${(data.ticketCount / max) * 100}%`,
      }}
    >
      <label>
        {data.name} - {data.ticketCount}
      </label>
    </div>
  );
}

export default Velocity;
