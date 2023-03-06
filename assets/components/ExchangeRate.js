import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableCell,
  TableRow,
} from "@mui/material";

export default function ExchangeRate() {
  const [rates, setRates] = useState({});
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getRates();
  }, []);

  // refresh button
  const refresh = () => {
    setLoad(true);
    getRates();
  };

  // auto-update every 60 seconds
  setInterval(() => {
    refresh();
  }, 60000);

  const getRates = async () => {
    try {
      const res = await axios.get("/api/exchange");

      let dataArray = Object.entries(res.data.data);

      setRates(dataArray);

      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        USD Exchange Rate
        <Button
          sx={{
            backgroundColor: "blue",
            color: "white",
            "&:hover": { backgroundColor: "blue", color: "white" },
            ml: 4,
          }}
          onClick={() => {
            refresh();
          }}
        >
          Refresh
        </Button>
      </Box>
      <Table sx={{ backgroundColor: "white" }}>
        <TableRow sx={{ width: 1 }}>
          <TableCell>
            <strong>Currency</strong>
          </TableCell>
          <TableCell>
            <strong>Value</strong>
          </TableCell>
        </TableRow>

        {load ? (
          <TableRow>
            <TableCell>
              <CircularProgress />
            </TableCell>
            <TableCell>
              <CircularProgress />
            </TableCell>
          </TableRow>
        ) : (
          rates.map((it, i) => (
            <TableRow key={i}>
              <TableCell>{it[0]}</TableCell>
              <TableCell>{it[1]}</TableCell>
            </TableRow>
          ))
        )}
      </Table>
    </>
  );
}
