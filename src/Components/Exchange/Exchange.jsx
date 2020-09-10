import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import { Button } from "@material-ui/core";

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
    value: "JPY",
    label: "¥",
  },
];

export class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "EUR",
    };
  }

  handleChange = (event) => {
    this.setState({ currency: event.target.value });
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
    const { currency } = this.state;
    return (
      <Paper component="form" className={classes.root}>
        <TextField
          id="outlined-basic"
          label="Your currency"
          variant="outlined"
        />
        <span>
          <TextField
            style={{ width: 100, paddingLeft: 10 }}
            id="outlined-select-currency"
            select
            value={this.state.currency}
            onChange={(e) => this.handleChange(e)}
            variant="outlined"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </span>
      </Paper>
    );
  }
}

Exchange.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Exchange);
