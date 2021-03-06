import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  TextField,
  Button,
  Grid,
  CardContent,
  Typography,
  Card,
} from "@material-ui/core";
import { ChatBot } from "aws-amplify-react";
import { Interactions } from "aws-amplify";
import { ChatFeed, Message } from "react-chat-ui";
// import Modal from "@material-ui/core/Modal";
import "./Dashboard.css";
import ExpansionPanels from "../../Common-utilities/ExpansionDashboard";
import Logo from "../../Components/Login/Assets/bg.PNG";
import purple from "../../Components/Dashboard/Assets/purple.png";
import coin from "../../Components/Dashboard/Assets/coins.png";
import river from "../../Components/Dashboard/Assets/river.png";
import green from "../../Components/Dashboard/Assets/green.png";
import usa from "../../Components/Dashboard/Assets/US.png";
import india from "../../Components/Dashboard/Assets/india.png";
import euro from "../../Components/Dashboard/Assets/euro.png";
import japan from "../../Components/Dashboard/Assets/japan.png";
import Video from "../../Components/Dashboard/Assets/multi_asset_2.mp4";
import Buy from "../../Components/Login/Assets/Buy_Sell.webp";
import Divider from "@material-ui/core/Divider";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import {
  TransactionHistory,
  TransactionVideo,
  AppBar,
  TransactionGraph,
  Subscription,
  Exchange,
  Exchange1,
  Wallets,
} from "./../index";

const styles = (theme) => ({
  Dashboard: {
    flexGrow: 1,
    marginLeft: 20,
    maxWidth: 1600,
  },
  // card: {
  // 	minWidth: 275,
  // 	maxWidth: '25%',
  // 	backgroundImage: 'url(' + logo + ')',
  // },
  card: {
    width: 400,
    height: 170,
    backgroundSize: "cover",
    //backgroundImage: 'url('../../Components/Login/Assets/login.png')',
    backgroundImage: "url(" + Logo + ")",
  },

  card1: {
    width: 331,
    height: 170,
    backgroundSize: "cover",
    marginLeft: -90,
    //backgroundImage: 'url('../../Components/Login/Assets/login.png')',
    backgroundImage: "url(" + Logo + ")",
    //backgroundColor: "#00b9f5",
  },
  exchange: {
    width: 1160,
    height: 350,
    backgroundSize: "cover",
    //backgroundImage: 'url('../../Components/Login/Assets/login.png')',
    backgroundImage: "url(" + river + ")",
  },
  wallet: {
    width: 400,
    height: 170,
    marginLeft: -45,
    backgroundSize: "cover",
    //backgroundImage: 'url('../../Components/Login/Assets/login.png')',
    backgroundImage: "url(" + Logo + ")",
  },
  title: {
    display: "none",
    fontSize: 14,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginTop: 15,
  },
  marginBottom: {
    marginBottom: 10,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "Left",
  },
  font: {
    color: "#fff",
    fontFamily: "system-ui",
  },
  exchangeButton: {
    //padding: 20,
    //height: 20,
    width: 250,
    marginRight: 10,
    backgroundColor: "#f0edf5",
  },
  submitButton: {
    //padding: 20,
    //height: 20,
    width: 200,
    marginRight: 10,
    backgroundColor: "#4caf50",
  },
  walletButton: {
    //padding: 20,
    //height: 20,
    width: 250,
    marginLeft: -145,

    //backgroundColor: "#f0edf5",
    backgroundColor: "#00b9f",
  },
});

const currencies = [
  {
    value: "USD",
    label: "USD",
  },
  {
    value: "EUR",
    label: "EUR",
  },
  {
    value: "JPY",
    label: "JPY",
  },
  {
    value: "RPE",
    label: "RPE",
  },
];

const botstyles = {
  bubbleStyles: {
    text: {
      fontSize: 16,
    },
    chatbubble: {
      borderRadius: 30,
      padding: 10,
    },
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
  },
  head: {
    backgroundColor: "#4caf50",
    padding: 1,
    marginBottom: -21,
    borderTopLeftRadius: 25,
    paddingBottom: 0,
    //marginRight: 25
  },
  header: {
    backgroundColor: "rgb(0, 132, 255)",
    padding: 20,
    borderTop: "12px solid rgb(204, 204, 204)",
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    alignItems: "center",
    backgroundColor: "whitesmoke",
    height: 450,
    overflowY: "scroll",
  },
  input: {
    fontSize: 16,
    padding: 10,
    outline: "none",
    width: 350,
    border: "none",
    borderBottom: "2px solid rgb(0, 132, 255)",
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askButton: false,
      input: "",
      finalMessage: "",
      open: false,
      videoOpen: false,
      graphOpen: false,
      subScribeOpen: false,
      currencySymbol: "USD",
      currency: "10",
      messages: [
        new Message({
          id: 1,
          message:
            "Hello, how can I help you today?  Select from below #Transaction history - check your previous transactions history  #Remind someone - send message to the person you would like to remind",
          // Transaction history
          // Remind someone '
        }),
      ],
    };
  }

  handleComplete(err, confirmation) {
    if (err) {
      alert("Bot conversation failed");
      return;
    }
  }

  onChange(e) {
    const input = e.target.value;
    this.setState({
      input,
    });
  }

  handleCurrencySymbolChange = (event) => {
    let value = event.target.value;
    if (value === "EUR") {
      this.setState({ currency: "11.8" });
    } else if (value === "USD") {
      this.setState({ currency: "10" });
    } else if (value === "RPE") {
      this.setState({ currency: "0.14" });
    } else if (value === "JPY") {
      this.setState({ currency: "0.094" });
    }
    this.setState({ currencySymbol: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleExchange = () => {
    // this.props.history.push({
    //   pathname: "/login",
    //   state: { accountDetails: null },
    // });
    this.setState({ subScribeOpen: true, graphOpen: true }, () =>
      console.log("subs oo", this.state.subScribeOpen)
    );

    console.log("button");
  };

  clearChat = () => {
    const message = new Message({
      id: 0,
      message: "",
    });
    let messages = message;
    this.setState({ messages });
  };

  handleOpen1 = () => {
    this.setState({ open: true });
  };
  handleDigChange = (event) => {
    console.log("this.state.currency;", this.state.currency);
    let value;
    if (!!event.target.value) {
      console.log("value", event);
      value = event.target.value;
    } else {
      console.log("value", event);
      value = event.target.defaultValue;
    }

    if (this.state.currencySymbol === "EUR") {
      value = value * 11.8;
    } else if (this.state.currencySymbol === "RPE") {
      value = value * 0.14;
    } else if (this.state.currencySymbol === "JPN") {
      value = value * 0.094;
    } else if (this.state.currencySymbol === "USD") {
      value = value * 10;
    }
    this.setState({ currency: value });
  };

  // handleOpen2 = () => {
  //   this.setState({ open: true });
  // };

  handleSubmitClick = () => {
    this.setState({
      askButton: true,
      videoOpen: false,
      open: false,
      graphOpen: false,
      subscribeOpen: false,
    });
    console.log("button");
  };

  handleAddMoney = () => {
    this.props.history.push({
      pathname: "/addMoney",
      state: { accountDetails: null },
    });
    console.log("button");
  };

  async submitMessage() {
    const { input } = this.state;
    if (input === "") return;
    const message = new Message({
      id: 0,
      message: input,
    });
    let messages = [...this.state.messages, message];

    this.setState({
      messages,
      input: "",
      open: false,
    });
    console.log("input", input);
    let response = await Interactions.send("PA", input);
    console.log("resp--", JSON.stringify(response));
    let responseMessage = new Message({
      id: 1,
      message: response.message,
    });

    if (response.intentName === "transaction") {
      console.log("input", input);

      if (input === "video") {
        responseMessage.message = `${responseMessage.message} `;
        this.setState({ videoOpen: true });
        console.log("video--", responseMessage.message);
      } else if (input === "graph") {
        responseMessage.message = `Your transaction history graph is generated !`;
        this.setState({ graphOpen: true });
        responseMessage.message = `Would you like to subscribe For Wealth Management Notification ? - Yes/ No`;
      }

      if (input === "yes") {
        responseMessage.message = `Thanks for subscribing our Wealth Management Advisor`;
        console.log("resp--yes", JSON.stringify(responseMessage));

        this.setState({ subScribeOpen: true });
      }

      messages = [...this.state.messages, responseMessage];
      this.setState({ messages });
      console.log("resp--11", JSON.stringify(responseMessage));
    }

    if (response.intentName === "fundTransfer") {
      const {
        slots: { mobile, successMsg, thankyou },
      } = response;
      if (mobile !== null) {
        fetch("http://localhost:8090/sendsms/" + "+" + mobile)
          .then((response) => response.json())
          .then((responseobj) => {
            console.log("sucess55", responseobj);
            if (
              responseobj.Message ===
              "The To number is not a valid phone number."
            ) {
              console.log("sucess55", responseobj.Message);
              responseMessage.message =
                "The To number is not a valid phone number.";
              messages = [...this.state.messages, responseMessage];
              this.setState({ messages });
              //responseobj.Message
            } else if (responseobj.Message === "Success") {
              messages = [...this.state.messages, responseMessage];
              this.setState({ messages });
            }
          });
      }
      if (mobile === null) {
        messages = [...this.state.messages, responseMessage];
        this.setState({ messages });
      }
    }

    if (response.intentName === null) {
      response.message = "Transaction history";
      messages = [...this.state.messages, responseMessage];
      this.setState({ messages });
    }

    if (response.intentName === "transaction") {
      const {
        slots: { docType, forMonth },
      } = response;
      console.log("docType", docType);
      console.log("forMonth", forMonth);
      let finalMessage = "";
      if (docType === "video") {
        finalMessage = `video generated for ${forMonth} months transaction`;
      } else if (docType === "graph") {
        finalMessage = `graph generated for ${forMonth} months transaction`;
      }
    }
  }

  render() {
    const { classes } = this.props;
    console.log("propss", this.props);
    let walletAmount = 234.56;
    if (!!this.props.location.state && this.props.location.state.digsAdded) {
      walletAmount = walletAmount + this.props.location.state.digsAdded;
    }

    return (
      <React.Fragment>
        <div>
          <AppBar userName="Elon Musk" {...this.props} />
          <div className={classes.Dashboard}>
            <Grid container spacing={8}>
              <Grid className={classes.pos} item xs={12}>
                <Typography variant="h5" component="h1">
                  Account Summary
                </Typography>
              </Grid>
              <Grid item container xs={4}>
                <Card
                  className={classes.card}
                  onClick={this.handleOpen1.bind(this)}
                >
                  <CardContent>
                    <span>
                      <Typography
                        className={classes.font}
                        variant="h6"
                        component="h2"
                      >
                        <AccountBalanceWalletIcon
                          color={"white"}
                          fontSize="large"
                        />
                        <span
                          style={{
                            zIndex: "-1",
                            float: "right",
                            paddingRight: "134px",
                          }}
                        >
                          Your Wallet Balance
                        </span>
                      </Typography>
                    </span>
                    <Typography
                      className={classes.font}
                      variant="h7"
                      //component="h2"
                    >
                      DiG ID: 7845254
                    </Typography>
                    <br />

                    <Typography
                      className={classes.font}
                      variant="h8"
                      component="h1"
                      style={{ textAlignLast: "center" }}
                    >
                      {walletAmount} DiGs
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.wallet}>
                  <CardContent>
                    <Typography
                      className={classes.font}
                      variant="h6"
                      component="h2"
                      style={{ textAlignLast: "center" }}
                    >
                      You can Buy DiGs instantly with a bank card or Crypto
                      currency
                    </Typography>
                    <Button
                      className={classes.walletButton}
                      variant="contained"
                      color="white"
                      style={{ right: "-200px", top: "40px" }}
                      onClick={this.handleAddMoney}
                    >
                      ADD MONEY TO DiG-wallet
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item container xs={4}>
                <Card
                  className={classes.card1}
                  onClick={this.handleOpen1.bind(this)}
                >
                  <CardContent>
                    <span>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          this.state.currencySymbol === "USD"
                            ? usa
                            : this.state.currencySymbol === "RPE"
                            ? india
                            : this.state.currencySymbol === "EUR"
                            ? euro
                            : this.state.currencySymbol === "JPN"
                            ? japan
                            : null
                        }
                      />
                      {/* <span
                          style={{
                            zIndex: "-1",
                            float: "right",
                            paddingRight: "134px",
                          }}
                        > */}
                      <paper
                        style={{
                          width: 230,
                          marginTop: 20,
                          marginLeft: 85,
                        }}
                      >
                        <TextField
                          style={{
                            width: 80,
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            marginTop: -45,
                            marginLeft: -35,
                            //height: 45,
                            //borderColor: "#fff",
                          }}
                          id="outlined-select-currency1"
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
                      </paper>
                      {/* <ArrowForwardOutlinedIcon
                          fontSize="large"
                          style={{
                            color: "#fff",
                          }}
                        /> */}
                    </span>
                    <span>
                      <paper
                        style={{
                          width: 230,
                          marginTop: 20,
                          marginLeft: 50,
                        }}
                      >
                        <TextField
                          style={{
                            width: 80,
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            marginTop: -45,
                            marginLeft: -30,
                            //height: 45,
                            //borderColor: "#fff",
                          }}
                          id="outlined-select-currency"
                          defaultValue="1"
                          //value={this.state.currencyconvert}
                          onChange={(e) => this.handleDigChange(e)}
                          variant="outlined"
                        />
                      </paper>
                      <div style={{ marginTop: 15 }}>
                        <Avatar
                          alt="Remy Sharp"
                          src={coin}
                          //style={{ bottom: 50 }}
                        />
                        <TextField
                          style={{
                            width: 179,
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            marginTop: -45,
                            marginLeft: 50,
                            //height: 45,
                            //borderColor: "#fff",
                          }}
                          id="outlined-select-currency"
                          value={this.state.currency}
                          //onChange={(e) => this.handleCurrencySymbolChange(e)}
                          variant="outlined"
                        />
                      </div>
                    </span>
                    <br />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <div>
              <br />
              <div>
                <Grid container spacing={8}>
                  <Grid>
                    <Card className={classes.exchange}>
                      <Typography
                        className={classes.font}
                        variant="h9"
                        component="h2"
                        style={{ textAlignLast: "center", marginTop: 70 }}
                      >
                        Deposit DiGs into your Bank
                      </Typography>

                      <div>
                        <Exchange />
                      </div>

                      <Button
                        className={classes.exchangeButton}
                        variant="contained"
                        style={{ right: "-420px", top: "40px" }}
                        onClick={this.handleExchange}
                      >
                        Deposit DiGs
                      </Button>
                    </Card>
                  </Grid>
                </Grid>
              </div>
              {/* <source srcSet={Buy} type="image/webp" /> */}

              {/* <video src={Video} width="800" height="400" autoplay="true" /> */}
              <br />
              <div>
                <Grid container spacing={8}>
                  <Grid>
                    <Wallets props={this.props} />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>

          {/* {this.state.open ? (
            <TransactionHistory open={this.state.open} />
          ) : null} */}
          {this.state.videoOpen ? (
            <TransactionVideo
              open={this.state.videoOpen}
              accountData={this.props.location.state.accountDetails}
            />
          ) : null}
          {this.state.graphOpen ? (
            <TransactionGraph open={this.state.graphOpen} />
          ) : null}
          {this.state.subscribeOpen ? (
            <Subscription open={this.state.subscribeOpen} />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
