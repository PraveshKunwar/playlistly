import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormData, time } from "../interfaces/FormData";
import { TopItems } from "../interfaces/TopItems";
import { Button } from "@mui/joy";
import TopData from "./TopData";

const GenerateForm: React.FC = () => {
  const [data, setData] = useState<FormData>({
    time_range: undefined,
    typeOf: undefined,
    limit: undefined,
  });
  const [topItems, setTopItems] = useState<TopItems[] | null>(null);
  const handleTimeRangeChange = (event: SelectChangeEvent<time>) => {
    setData((prevData) => ({
      ...prevData,
      time_range: event.target.value as time,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/me/top", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const topData = await response.json();
      setTopItems(topData);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white", // White background for the form
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for elevation
          padding: "2rem",
          width: "100%",
          maxWidth: "400px", // Constrain width for a neat form
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
        >
          Generate Playlist
        </h2>
        <form onSubmit={handleSubmit}>
          <FormControl
            required
            fullWidth
            sx={{
              m: 1,
              backgroundColor: "white",
            }}
          >
            <InputLabel id="time-range-label">Time Range</InputLabel>
            <Select
              labelId="time-range-label"
              id="time-range-select"
              value={data.time_range || ""}
              label="Time Range *"
              onChange={handleTimeRangeChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="long_term">Long Term</MenuItem>
              <MenuItem value="medium_term">Medium Term</MenuItem>
              <MenuItem value="short_term">Short Term</MenuItem>
            </Select>
            <FormHelperText style={{ textAlign: "center" }}>
              Select the time range for generating a playlist.
            </FormHelperText>
          </FormControl>
          <FormControl
            required
            fullWidth
            sx={{
              m: 1,
              backgroundColor: "white",
            }}
          >
            <InputLabel id="limit-label">Limit</InputLabel>
            <Select
              labelId="limit-label"
              id="limit-select"
              value={data.limit?.toString() || ""}
              label="Limit *"
              onChange={(event: SelectChangeEvent<string>) => {
                setData((prevData) => ({
                  ...prevData,
                  limit: event.target.value
                    ? parseInt(event.target.value)
                    : undefined,
                }));
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="20">20</MenuItem>
              <MenuItem value="30">30</MenuItem>
              <MenuItem value="40">40</MenuItem>
              <MenuItem value="50">50</MenuItem>
            </Select>
            <FormHelperText style={{ textAlign: "center" }}>
              Select number of artists to get top tracks from at one time.
            </FormHelperText>
          </FormControl>
          <Button variant="plain" type="submit" color="primary">
            Generate
          </Button>
        </form>
      </div>
      <section className="generate-section-top-data">
        {topItems ? (
          <>
            <h1>Your top artists:</h1>
            <TopData items={topItems} />
          </>
        ) : null}
      </section>
    </div>
  );
};

export default GenerateForm;
