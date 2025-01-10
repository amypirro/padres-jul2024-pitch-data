import React, { useEffect, useState } from "react";
import api from "../api.js";
import ReactApexChart from "react-apexcharts";

const getDataFromBatterData = (home, away) => {
  const labels = Object.keys(home);
  const awayValues = Object.values(away);
  const homeValues = Object.values(home);
  return {
    labels,
    homeValues,
    awayValues,
  };
};

const getSeriesData = (homeData, awayData) => {
  return [
    {
      name: "Petco",
      data: homeData,
    },
    {
      name: "Away",
      data: awayData,
    },
  ];
};

const getChartOptions = (labels) => {
  return {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: labels,
    },
  };
};

export default function BatEvents({ currentBatter } = props) {
  const [batter, setBatter] = useState({});
  const [chartConfig, setChartConfig] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    if (!currentBatter) return;
    const fetchBatterEvents = async () => {
      try {
        const response = await api.get(`/api/batters/${currentBatter}/events`);
        console.log("!!!!! response:", response);
        setBatter(response.data.batter);
        const { labels, homeValues, awayValues } = getDataFromBatterData(
          response.data.home_events,
          response.data.away_events
        );
        setChartConfig(getChartOptions(labels));
        setSeries(getSeriesData(homeValues, awayValues));
      } catch (error) {
        console.error("Error fetching batters:", error);
      }
    };
    fetchBatterEvents();
  }, [currentBatter]);

  if (!batter || !chartConfig) {
    return <></>;
  }

  return (
    <>
      <div className="pt-10">
        this is where my little graph or something will go
        <p>hello</p>
        <p>{batter.batter_name_first}</p>
        <ReactApexChart
          options={chartConfig}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </>
  );
}
