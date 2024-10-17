import { useMemo, useState } from "react";
import CHART_DATA, { ChartRecord } from "./data/chart";
import "./velocity.css";

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
      <div className="container">
        <button onClick={handleChartToggle}>Toggle Chart</button>
        {
          <BarChart
            data={CHART_DATA}
            maxHeight={maxHeight}
            visible={isChartVisible}
          />
        }
      </div>
    </>
  );
}

function BarChart({
  data,
  maxHeight,
  visible,
}: {
  data: ChartRecord[];
  maxHeight: number;
  visible: boolean;
}) {
  return (
    <div style={{ opacity: visible ? 1 : 0 }} className="chart-container">
      <div className="chart">
        {data.map((record: ChartRecord) => {
          return <Bar key={record.id} data={record} max={maxHeight} />;
        })}
      </div>
      <label className="y-label">Number of tickets</label>
      <label className="x-label">Departments</label>
    </div>
  );
}

function Bar({ data, max }: { data: ChartRecord; max: number }) {
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
