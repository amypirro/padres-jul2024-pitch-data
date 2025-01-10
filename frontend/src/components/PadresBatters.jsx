import React, { useEffect, useState } from "react";
import api from "../api.js";

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
    <div>
      <h2>Padres Batters List</h2>
      <ul>
        {batters.map((b) => (
          <li key={b.batter_bam_id}>{b.batter_name_first} {b.batter_name_last}</li>
        ))}
      </ul>
    </div>
  );
}
