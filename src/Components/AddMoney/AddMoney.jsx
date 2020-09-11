import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Typography, card, CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import "./AddMoney.css";
import Button from "@material-ui/core/Button";
import fetchSuccsess from "../../_mock_/loginService";
import Paper from "@material-ui/core/Paper";
import purple from "../../Components/Dashboard/Assets/purple.png";
import payment1 from "../../Components/AddMoney/Assets/payment1.JPG";
import credit from "../../Components/AddMoney/Assets/credit.JPG";
import creditheader from "../../Components/AddMoney/Assets/creditheader.PNG";
import bitcoin from "../../Components/AddMoney/Assets/bitcoin.JPG";
import paypal from "../../Components/AddMoney/Assets/paypal.JPG";
import other from "../../Components/AddMoney/Assets/other.JPG";
import othermethod from "../../Components/AddMoney/Assets/othermethod.PNG";
import river from "../../Components/Dashboard/Assets/river.png";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  paymentImg: {
    width: 450,
  },
  bgcolor: {
    backgroundColor: "#00b9f5",
    width: 400,
    height: 350,
    marginLeft: 50,
    marginTop: 55,
    borderRadius: 15,
  },
  addMoneycard: {
    width: 250,
    height: 170,
    backgroundSize: "cover",
    //backgroundImage: 'url('../../Components/Login/Assets/login.png')',
    backgroundImage: "url(" + river + ")",
  },
  font: {
    color: "#fff",
    fontFamily: "system-ui",
    paddingLeft: 100,
  },
  fontText: {
    color: "#fff",
    textAlignLast: "center",
    marginTop: 40,
  },
  submitButton: {
    //padding: 20,
    //height: 20,
    width: 200,
    marginRight: 10,
    //backgroundColor: "#4caf50",
    backgroundColor: "#00b9f5",
  },
  success: {
    width: 700,
    height: 170,
    backgroundSize: "cover",
    //backgroundImage: 'url('../../Components/Login/Assets/login.png')',
    backgroundImage: "url(" + purple + ")",
  },
  resetButton: {
    //padding: 20,
    //height: 20,
    width: 200,
    marginRight: 10,
  },
  successButton: {
    top: 30,
    left: 200,
    //height: 20,
    width: 300,
    marginRight: 10,
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

export class ApplyLoanForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      currencySymbol: "EUR",
      currency: "",
      responseReceived: false,
    };
    global.fetch = fetchSuccsess;
  }

  handleDigChange = (event) => {
    console.log("this.state.currency;", this.state.currency);
    let value = event.target.value;
    if (this.state.currencySymbol === "EUR") {
      value = value * 10;
    } else {
      value = value * 5;
    }
    this.setState({ currency: value });
  };

  componentDidMount() {
    let interest;
    switch (this.state.loanSelected) {
      case "auto":
        interest = 9.4;
        break;
      case "eud":
        interest = 11.15;
        break;
      case "home":
        interest = 8.35;
        break;
      case "personal":
        interest = 10.99;
        break;
    }
    this.setState({
      interestRate: interest,
    });
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
    let interest;
    if (name === "loanSelected") {
      switch (event.target.value) {
        case "auto":
          interest = 9.4;
          break;
        case "eud":
          interest = 11.15;
          break;
        case "home":
          interest = 8.35;
          break;
        case "personal":
          interest = 10.99;
          break;
      }

      this.setState({
        interestRate: interest,
      });
    }
  };

  handleCurrencySymbolChange = (event) => {
    this.setState({ currencySymbol: event.target.value });
  };

  handleSubmitClick = () => {
    fetch(
      "http://localhost:8080/BFS/loginDetails/loginGet?accNum=" +
        this.state.debitAccount +
        "&interest=" +
        this.state.interestRate +
        "&loanAmount=" +
        this.state.amount +
        "&loanType=" +
        this.state.loanSelected
    )
      .then((response) => response.json())
      .then((responseobj) => {
        if (!!responseobj) {
          this.setState({
            responseReceived: true,
          });
        }
      });
  };

  handleResetClick = () => {
    this.props.history.push({
      pathname: "/dashboard",
      state: { digsAdded: this.state.currency },
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="margin-20px">
        {this.state.responseReceived ? (
          <Grid item container xs={8}>
            <card className={classes.success}>
              <CardContent>
                <Typography
                  className={classes.font}
                  variant="h6"
                  component="h2"
                >
                  You have succesfully loaded DiGs to the wallet
                </Typography>
                <Button
                  className={classes.successButton}
                  variant="contained"
                  onClick={this.handleResetClick}
                >
                  Redirect to the main page
                </Button>
              </CardContent>
            </card>
          </Grid>
        ) : (
          //</Paper>
          <Paper component="form" className={classes.root}>
            <Grid container spacing={12}>
              <Grid item container xs={4}>
                <card className={classes.bgcolor}>
                  <Typography
                    className={classes.fontText}
                    variant="h6"
                    component="h2"
                  >
                    Enter The Amount
                  </Typography>
                  <Paper style={{ width: 230, marginTop: 20, marginLeft: 85 }}>
                    {/* <FormControl
                      fullWidth
                      className={classes.margin}
                      variant="outlined"
                    > */}
                    {/* <InputLabel htmlFor="outlined-adornment-amount">
                        Amount
                      </InputLabel> */}
                    {/* <OutlinedInput
                        id="outlined-adornment-amount"
                        //value={this.state.currency}

                        onChange={(e) => this.handleDigChange(e)}
                        startAdornment={
                          <InputAdornment position="start">€</InputAdornment>
                        }
                        labelWidth={60}
                      /> */}
                    {/* </FormControl> */}
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      style={{ width: 150 }}
                      onChange={(e) => this.handleDigChange(e)}
                    />
                    <TextField
                      style={{ width: 80 }}
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
                    </TextField>
                  </Paper>
                  <ArrowDownwardOutlinedIcon
                    fontSize="large"
                    style={{ color: "#fff", marginLeft: 175, marginTop: 25 }}
                  />
                  <Paper style={{ width: 230, marginTop: 20, marginLeft: 85 }}>
                    <FormControl
                      fullWidth
                      className={classes.margin}
                      variant="outlined"
                    >
                      {/* <InputLabel htmlFor="outlined-adornment-amount">
                        Amount
                      </InputLabel> */}
                      <OutlinedInput
                        id="outlined-adornment-amount1"
                        value={this.state.currency}
                        //onChange={handleChange("amount")}
                        startAdornment={
                          <InputAdornment position="start">DiG</InputAdornment>
                        }
                        labelWidth={60}
                      />
                    </FormControl>
                  </Paper>
                </card>
              </Grid>
              <Grid item container xs={8}>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={0}>
                    <Grid container justify="center" alignItems="center">
                      <img src={payment1} />
                      <ExpansionPanel>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className={classes.heading}>
                            <img
                              src={creditheader}
                              className={classes.paymentImg}
                            />
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <img src={credit} style={{ height: 380 }} />
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      <ExpansionPanel>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography className={classes.heading}>
                            <img src={paypal} className={classes.paymentImg} />
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <Typography style={{ width: 763 }}>
                            <Button
                              //className={classes.submitButton}
                              variant="contained"
                              color="action"

                              //onClick={this.handleSubmitClick}
                            >
                              Continue to Paypal
                            </Button>
                          </Typography>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      <ExpansionPanel>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography className={classes.heading}>
                            <img src={bitcoin} className={classes.paymentImg} />
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <Typography style={{ width: 763 }}>
                            <Button
                              //className={classes.submitButton}
                              variant="contained"
                              color="Secondary"

                              //onClick={this.handleSubmitClick}
                            >
                              Continue to BitPay
                            </Button>
                          </Typography>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      <ExpansionPanel>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography className={classes.heading}>
                            <img src={other} className={classes.paymentImg} />
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <img src={othermethod} style={{ height: 322 }} />
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </Grid>
                    <br />

                    <div style={{ paddingTop: 10 }} />
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      style={{ paddingTop: 25, paddingBottom: 25 }}
                    >
                      <Button
                        className={classes.submitButton}
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmitClick}
                      >
                        Submit
                      </Button>

                      <Button
                        className={classes.resetButton}
                        variant="contained"
                        onClick={this.handleResetClick}
                      >
                        Reset
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        )}
      </div>
    );
  }
}

ApplyLoanForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplyLoanForm);
