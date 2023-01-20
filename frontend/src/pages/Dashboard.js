import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Stat from "./Stat";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="Potholes" value="1" />
            <Tab label="BMC-Dash log" value="2" />
            <Tab label="History" value="3" />
            <Tab label="Zonal View" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Stack spacing={2}>
            <Item className="!bg-[#165C3F] !drop-shadow-xl !border">
              <Stat />
            </Item>
            <Item className="!bg-[#165C3F] !drop-shadow-xl !border">
              <Stat />
            </Item>
            <Item className="!bg-[#165C3F] !drop-shadow-xl !border">
              <Stat />
            </Item>
            <Item className="!bg-[#165C3F] !drop-shadow-xl !border">
              <Stat />
            </Item>
            <Item className="!bg-[#165C3F] !drop-shadow-xl !border">
              <Stat />
            </Item>
            <Item className="!bg-[#165C3F] !drop-shadow-xl !border">
              <Stat />
            </Item>
          </Stack>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item Four</TabPanel>
      </TabContext>
    </Box>
  );
}
