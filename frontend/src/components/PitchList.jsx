import React, { useEffect, useState } from "react";
import api from "../api.js";

export default function PitchList() {
  const [pitches, setPitches] = useState([]);

  const fetchPitches = async () => {
    try {
      const response = await api.get("/api/pitches/all");
      setPitches(response.data.pitches);
    } catch (error) {
      console.error("Error fetching pitches:", error);
    }
  };

  useEffect(() => {
    fetchPitches();
  }, []);

  return (
    <div>
      <h2>Pitches List</h2>
      <ul>
        {pitches.map((pitch) => (
          <li key={pitch.guid}>{pitch.guid}</li>
        ))}
      </ul>
    </div>
  );
}
