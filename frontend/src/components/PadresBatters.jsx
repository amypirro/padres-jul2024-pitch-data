import React, { useEffect, useState } from "react";
import clsx from "clsx";
import api from "../api.js";

export default function PadresBatters({
  currentBatter,
  setCurrentBatter,
} = props) {
  const [loading, setLoading] = useState(false);
  const [batters, setBatters] = useState([]);

  const fetchPadresBatters = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/batters/padres");
      setBatters(response.data.batters);
    } catch (error) {
      console.error("Error fetching batters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPadresBatters();
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  const onBatterClick = (bid) => {
    setCurrentBatter(bid);
  };

  return (
    <div className="container px-5 mx-auto pt-10">
      <h2 className="text-md font-medium text-slate-900">Padres Batters</h2>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5"
      >
        {batters.map((batter) => (
          <li
            key={batter.batter_bam_id}
            className="col-span-1 flex rounded-md shadow-sm hover:shadow-lg bg-white hover:bg-[#FFC525]/50 cursor-pointer"
            onClick={() => setCurrentBatter(batter.batter_bam_id)}
          >
            <div
              className={clsx(
                "flex w-10 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white",
                { ["bg-[#2F241D]"]: batter.batter_bam_id !== currentBatter },
                { ["bg-[#FFC525]"]: batter.batter_bam_id === currentBatter }
              )}
            >
              {batter.batter_name_first.charAt(0)}
              {batter.batter_name_last.charAt(0)}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 ">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <p className="text-slate-900">
                  {batter.batter_name_first} {batter.batter_name_last}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
