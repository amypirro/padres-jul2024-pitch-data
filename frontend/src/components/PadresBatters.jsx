import React, { useEffect, useState } from "react";
import api from "../api.js";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

export default function PadresBatters() {
  const [batters, setBatters] = useState([]);
  // const [selected, setSelected] = useState();

  const fetchPadresBatters = async () => {
    try {
      const response = await api.get("/api/batters/padres");
      setBatters(response.data.batters);
    } catch (error) {
      console.error("Error fetching batters:", error);
    }
  };


  useEffect(() => {
    fetchPadresBatters();
  }, []);

  return (
    <div className="container mx-auto pt-10">
      <h2 className="text-sm font-medium text-gray-500">Padres Batters</h2>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5"
      >
        {batters.map((batter) => (
          <li
            key={batter.batter_bam_id}
            className="col-span-1 flex rounded-md shadow-sm"
          >
            <div className="flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white bg-[#2F241D]">
              {batter.batter_name_first.charAt(0)}
              {batter.batter_name_last.charAt(0)}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                {/* <a
                  href={project.href}
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {project.name}
                </a> */}
                <p className="text-gray-500">
                  {batter.batter_name_first} {batter.batter_name_last}
                </p>
              </div>
              {/* <div className="shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon aria-hidden="true" className="size-3" />
                </button>
              </div> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );


}
