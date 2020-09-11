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
  submitButton: {
    //padding: 20,
    //height: 20,
    width: 200,
    marginRight: 10,
    backgroundColor: "#4caf50",
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
    width: 200,
    marginRight: 10,
  },
});

const availableLoanTypes = [
  {
    value: "auto",
    label: "Auto Loan    ",
  },
  {
    value: "eud",
    label: "Education Loan    ",
  },
  {
    value: "home",
    label: "Home Loan",
  },
  {
    value: "personal",
    label: "Personal Loan     ",
  },
];

export class ApplyLoanForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      name: "anandd",
      amount: "",
      multiline: "Controlled",
      loanSelected: this.props.loanBanner,
      responseReceived: false,
      interestRate: "",
      debitAccount: "545452121",
      accounts: [
        {
          value: "545452121",
          label: "545452121",
        },
        {
          value: "545452121",
          label: "545452121",
        },
      ],
    };
    global.fetch = fetchSuccsess;
  }

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
    this.setState({
      name: "anandd",
      amount: "",
      multiline: "Controlled",
      loanSelected: "auto",
      interestRate: 9.4,
      debitAccount: "545452121",
      accounts: [
        {
          value: "545452121",
          label: "545452121",
        },
        {
          value: "545452121",
          label: "545452121",
        },
      ],
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
                  Redirect
                </Button>
              </CardContent>
            </card>
          </Grid>
        ) : (
          //</Paper>
          <Paper component="form" className={classes.root}>
            <Grid container spacing={12}>
              <Grid item container xs={4}>
                <card className={classes.addMoneycard}>hello</card>
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
