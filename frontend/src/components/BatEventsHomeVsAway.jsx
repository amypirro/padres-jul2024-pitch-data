import React, { useEffect, useState } from "react";
import api from "../api.js";
import ReactApexChart from "react-apexcharts";

const getChartDataFromBatterData = (home, away) => {
  let labels = Object.keys(home);
  const awayValues = Object.values(away);
  const homeValues = Object.values(home);

  labels = labels.map((label) => label.replace("_", " "));

  return {
    labels,
    homeValues,
    awayValues,
  };
};

const getSeriesData = (homeData, awayData) => {
  return [
    {
      name: "Petco Park",
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
        // dataLabels: {
        //     position: "top",
        // },
      },
    },
    colors: ["#FFC425", "#2F241D"],
    dataLabels: {
      enabled: false,
      //   offsetY: -25,
      style: {
        colors: ["#2F241D", "#808080"],
      },
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
  const [chartSeries, setChartSeries] = useState(null);

  useEffect(() => {
    if (!currentBatter) return;
    const fetchBatterEvents = async () => {
      try {
        const response = await api.get(`/api/batters/${currentBatter}/events`);

        setBatter(response.data.batter);

        const { labels, homeValues, awayValues } = getChartDataFromBatterData(
          response.data.home_events,
          response.data.away_events
        );

        setChartConfig(getChartOptions(labels));
        setChartSeries(getSeriesData(homeValues, awayValues));
      } catch (error) {
        console.error("Error fetching batters:", error);
      }
    };
    fetchBatterEvents();
  }, [currentBatter]);

  if (!batter || !chartConfig || !chartSeries) {
    return <></>;
  }

  return (
    <>
      <div className="py-10">
        <div className="border-b border-gray-200 pb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            {batter.batter_name_first} {batter.batter_name_last}
          </h2>
        </div>
        <div className="pt-5">
          <ReactApexChart
            options={chartConfig}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>
        <p className="mx-auto my-4 lg:max-w-4xl text-xs text-gray-500">
          Please note that the chart above includes a snapshot of various
          batting outcomes but does not include every possible batting outcome.
          For example, the walk category does not include intentional walks, and
          the field out category does not include force outs of another player.
        </p>
      </div>
    </>
  );
}
