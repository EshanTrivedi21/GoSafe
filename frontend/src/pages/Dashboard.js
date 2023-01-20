import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { apiCheckLogin } from "../utilities/apiCall";
import { useNavigate } from "react-router-dom";

export default function LabTabs() {
  let [a, setA] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!a) {
      apiCheckLogin(setA);
    }
  }, []);
  React.useEffect(() => {
    if (a) {
      if (a.err) {
        navigate("/welcome");
      }
      else if(a.role!=="admin"){
        navigate("/");
      }
    }
  }, [a]);
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
            <Item>
              <div className="flex flex-row justify-between">
                {/* {image} */}
                <div className="flex justify-center items-center">
                  <img
                    src="https://picsum.photos/200/300"
                    alt="image"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "10px",
                      border: "1px solid #000",
                    }}
                  />
                </div>
                {/* info */}
                <div>
                  <div className="flex flex-col items-start">
                    <h1 className="text-4xl font-semibold">Kalyan📌</h1>
                    <p>Sector 44 tandel apartment road Kalyan 400768</p>
                    <br />
                    <p>
                      Reported By user{" "}
                      <span className="text-black font-bold underline">
                        BHAVNA WAGH
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
            <Item>Item 4</Item>
            <Item>Item 5</Item>
            <Item>Item 6</Item>
          </Stack>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item Four</TabPanel>
      </TabContext>
    </Box>
  );
}
