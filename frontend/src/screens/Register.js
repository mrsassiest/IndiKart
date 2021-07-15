import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import axios from "axios"
import RegisterScreen from './RegisterScreen'
import AdminRegisterScreen from './AdminRegisterScreen'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid>
          <Typography>{children}</Typography>
        </Grid>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  appbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop:'5%'
  }
}))


export default function Resister(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Grid >
      <RegisterScreen />
      </Grid>
    </React.Fragment>
  )
}