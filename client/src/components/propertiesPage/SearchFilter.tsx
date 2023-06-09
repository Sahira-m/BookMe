import { Box, Divider, IconButton, InputBase, Paper, Typography, Button } from '@mui/material'
import React, { useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { filterActions } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

const SearchFilter = () => {
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(new Date().toISOString().split('T')[0]);
  const [term, setTerm] = useState("");
  const [numOfGuests, setNumOfGuests] = useState(1);

  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm)
  const numberOfDays = useSelector((state: RootState) => state.filter.numOfDays)
  const numberOfVisitors = useSelector((state: RootState) => state.filter.numberOfVisitors)

  const dispatch = useDispatch();
  const searchHandler = () => {
    console.log("term", term)
    console.log("number of days", Number(Number(new Date(checkOutDate)) - Number(new Date(checkInDate)))/ 86400000);
    console.log("number of guests", numOfGuests)
    dispatch(filterActions.setTerm(term));
    dispatch(filterActions.setNumOfDays(Number(Number(new Date(checkOutDate)) - Number(new Date(checkInDate)))/ 86400000))
    dispatch(filterActions.setNumberOfVisitors(numOfGuests))
    console.log("term", searchTerm)
    console.log("number of days", numberOfDays)
    console.log("number of guests", numberOfVisitors)
  }
  /**
   * not needed anymore
   */
  const options = [
  ]
  
  for ( let i = 0; i <= 10; i++) {
    options.push({value: i, label: i})
  }

  const checkInHandler = (e: any) => {
    setCheckInDate(e.target.value);
    };

    const checkOutHandler = (e: any) => {
      setCheckOutDate(e.target.value);
      };
  return (
    <Box sx={{width: "25%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#E8e8e866"}}>
        <Typography variant="h5" sx={{fontWeight: "bolder", alignSelf: "flex-start", mx: 10, mt: 5}}>Your search</Typography>
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 5}}>
            <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 300,
          position: "relative",
          top: "50px",
          borderRadius: "20px"
        }}
      >
        <IconButton disabled sx={{ p: "10px" }}>
            <EditLocationIcon sx={{color: "black"}}/>
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 2 }}
          placeholder="Search properties"
          inputProps={{ "aria-label": "search properties" }}
          onChange={(e) => setTerm(e.target.value)}
        />
            </Paper>
            <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 300,
          position: "relative",
          top: "50px",
          borderRadius: "20px"
        }}
      >
        <IconButton disabled sx={{ p: "10px" }}>
            <EditLocationIcon sx={{color: "black"}}/>
        </IconButton>
        <input type="date" name="start" id="start" style={{width: "16px", transform: "scale(2)", border: "0px", position: "absolute", left: "15px", padding: "2px 5px 0px 5px", borderRadius: "20px", outline: "none"}} onChange={checkInHandler}/>

        <InputBase
          sx={{ ml: 1, flex: 2, "&:disabled": {color: "black"} }}
          value={checkInDate}
          placeholder="Check-in date"
          inputProps={{ "aria-label": "Check-in date" }}
          
        />
            </Paper>
            <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 300,
          position: "relative",
          top: "50px",
          borderRadius: "20px"
        }}
      >
        <IconButton disabled sx={{ p: "10px" }}>
            <EditLocationIcon sx={{color: "black"}}/>
        </IconButton>
        <input type="date" name="start" id="start" style={{width: "16px", transform: "scale(2)", border: "0px", position: "absolute", left: "15px", padding: "2px 5px 0px 5px", borderRadius: "20px", outline: "none"}} onChange={checkOutHandler}/>

        <InputBase
          sx={{ ml: 1, flex: 2, "&:disabled": {color: "black"} }}
          value={checkOutDate}
          placeholder="Check-out date"
          inputProps={{ "aria-label": "Check-out date" }}
          
        />
            </Paper>
            <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 300,
          position: "relative",
          top: "50px",
          borderRadius: "20px"
        }}
      >
        <IconButton disabled sx={{ p: "10px" }}>
            <PersonIcon sx={{color: "black"}}/>
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 2 }}
          placeholder="How many guests"
          inputProps={{ "aria-label": "Guest Number" }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onChange={(e) => setNumOfGuests(+e.target.value)}
        />
            </Paper>
            <Button variant="contained" sx={{width: "308px", borderRadius: "20px", mt: 7, p:1}} onClick={searchHandler}>Search</Button>
        </Box>
    </Box>
  )
}

export default SearchFilter