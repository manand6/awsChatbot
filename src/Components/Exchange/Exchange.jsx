import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";

const styles = (theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    height: 20,
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
});

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "RPE",
    label: "₹",
  },
];

export class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencySymbol: "EUR",
      currencySymbol1: "RPE",
      currency: "",
    };
  }

  handleCurrencyChange = (event) => {
    console.log("this.state.currency;", this.state.currency);
    let value = event.target.value;
    if (
      this.state.currencySymbol1 === "RPE" &&
      this.state.currencySymbol === "EUR"
    ) {
      value = value * 87.39;
    }
    this.setState({ currency: value });
  };

  handleCurrencySymbolChange = (event) => {
    this.setState({ currencySymbol: event.target.value });
  };

  handleCurrencySymbolChange1 = (event) => {
    this.setState({ currencySymbol1: event.target.value });
  };

  handleExchange = () => {
    this.props.history.push({
      pathname: "/login",
      state: { accountDetails: null },
    });
    console.log("button");
  };

  render() {
    const classes = this.props;
    const { currency } = this.state.currency;
    console.log("this.state.currency;", this.state.currency);
    return (
      <Grid container spacing={8} style={{ paddingTop: 80 }}>
        <Grid item container xs={6} style={{ paddingLeft: 170 }}>
          <Paper component="form" className={classes.root}>
            <div>
              {/* <TextField
                id="outlined-basic"
                label="From currency"
                variant="outlined"
                onChange={(e) => this.handleCurrencyChange(e)}
              />
              <TextField
                style={{ width: 100, paddingLeft: 10 }}
                id="outlined-select-currency"
                select
                value={this.state.currencySymbol}
                onChange={(e) => this.handleCurrencySymbolChange(e)}
                variant="outlined"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField> */}
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <OutlinedInput
                  style={{ width: 330 }}
                  id="outlined-adornment-amount"
                  //value={this.state.currency}
                  onChange={(e) => this.handleCurrencyChange(e)}
                  startAdornment={
                    <InputAdornment position="start">DiG</InputAdornment>
                  }
                  labelWidth={60}
                />
              </FormControl>
            </div>
          </Paper>
        </Grid>
        <Grid item container xs={6}>
          <Paper component="form" className={classes.root}>
            <div>
              <TextField
                id="outlined-basic"
                label="To currency"
                variant="outlined"
                value={this.state.currency}
              />
              <TextField
                style={{ width: 100, paddingLeft: 10 }}
                id="outlined-select-currency"
                select
                value={this.state.currencySymbol1}
                onChange={(e) => this.handleCurrencySymbolChange1(e)}
                variant="outlined"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Exchange.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Exchange);
