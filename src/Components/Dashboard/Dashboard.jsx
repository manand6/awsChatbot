import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ChatBot } from "aws-amplify-react";
import { Interactions } from "aws-amplify";
import { ChatFeed, Message } from "react-chat-ui";
// import Modal from "@material-ui/core/Modal";
import "./Dashboard.css";
import ExpansionPanels from "../../Common-utilities/ExpansionDashboard";
import Logo from "../../Components/Login/Assets/bg.PNG";
import Newloan from "../../Common-utilities/LoanCarousel";
import {
  TransactionHistory,
  TransactionVideo,
  AppBar,
  TransactionGraph,
  Subscription
} from "./../index";

const styles = theme => ({
  Dashboard: {
    flexGrow: 1,
    marginLeft: 20,
    maxWidth: 1600
  },
  // card: {
  // 	minWidth: 275,
  // 	maxWidth: '25%',
  // 	backgroundImage: 'url(' + logo + ')',
  // },
  card: {
    width: 300,
    height: 170,
    backgroundSize: "cover",
    //backgroundImage: 'url('../../Components/Login/Assets/login.png')',
    backgroundImage: "url(" + Logo + ")"
  },
  title: {
    display: "none",
    fontSize: 14,
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginTop: 15
  },
  marginBottom: {
    marginBottom: 10
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "Left"
  },
  font: {
    color: "#fff"
  },
  submitButton: {
    //padding: 20,
    //height: 20,
    width: 200,
    marginRight: 10,
    backgroundColor: "#4caf50"
  }
});

const botstyles = {
  bubbleStyles: {
    text: {
      fontSize: 16
    },
    chatbubble: {
      borderRadius: 30,
      padding: 10
    }
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    textAlign: "center"
  },
  head: {
    backgroundColor: "#4caf50",
    padding: 1,
    marginBottom: -21,
    borderTopLeftRadius: 25,
    paddingBottom: 0
    //marginRight: 25
  },
  header: {
    backgroundColor: "rgb(0, 132, 255)",
    padding: 20,
    borderTop: "12px solid rgb(204, 204, 204)"
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    alignItems: "center",
    backgroundColor: "whitesmoke",
    height: 450,
    overflowY: "scroll"
  },
  input: {
    fontSize: 16,
    padding: 10,
    outline: "none",
    width: 350,
    border: "none",
    borderBottom: "2px solid rgb(0, 132, 255)"
  }
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
      messages: [
        new Message({
          id: 1,
          message:
            "Hello, how can I help you today?  Select from below #Transaction history - check your previous transactions history  #Remind someone - send message to the person you would like to remind"
          // Transaction history
          // Remind someone '
        })
      ]
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
      input
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  clearChat = () => {
    const message = new Message({
      id: 0,
      message: ""
    });
    let messages = message;
    this.setState({ messages });
  };

  handleOpen1 = () => {
    this.setState({ open: true });
  };

  handleOpen2 = () => {
    this.setState({ open: true });
  };

  handleSubmitClick = () => {
    this.setState({
      askButton: true,
      videoOpen: false,
      open: false,
      graphOpen: false,
      subscribeOpen: false
    });
    console.log("button");
  };

  _handleKeyPress = e => {
    this.setState({
      open: false,
      videoOpen: false,
      graphOpen: false,
      subscribeOpen: false
    });
    if (e.key === "Enter") {
      this.submitMessage();
    }
  };

  async submitMessage() {
    const { input } = this.state;
    if (input === "") return;
    const message = new Message({
      id: 0,
      message: input
    });
    let messages = [...this.state.messages, message];

    this.setState({
      messages,
      input: "",
      open: false
    });
    console.log("input", input);
    let response = await Interactions.send("PA", input);
    console.log("resp--", JSON.stringify(response));
    let responseMessage = new Message({
      id: 1,
      message: response.message
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
        slots: { mobile, successMsg, thankyou }
      } = response;
      if (mobile !== null) {
        fetch("http://localhost:8090/sendsms/" + "+" + mobile)
          .then(response => response.json())
          .then(responseobj => {
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
        slots: { docType, forMonth }
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
    return (
      <React.Fragment>
        <div>
          <AppBar
            userName={this.props.location.state.accountDetails.userName}
            {...this.props}
          />
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
                    <Typography
                      className={classes.font}
                      variant="h5"
                      component="h2"
                    >
                      My Account 1
                    </Typography>
                    <br />
                    <Typography className={classes.font}>
                      HDFC
                      <br />
                      Account Number :{" "}
                      {
                        this.props.location.state.accountDetails.savingAccount
                          .accountNumber
                      }
                    </Typography>
                    <Typography
                      className={classes.font}
                      variant="h5"
                      component="h5"
                    >
                      Balance :{" "}
                      {
                        this.props.location.state.accountDetails.savingAccount
                          .accountBalance
                      }
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.card} onClick={this.handleOpen2}>
                  <CardContent>
                    <Typography
                      className={classes.font}
                      variant="h5"
                      component="h2"
                    >
                      My Account 2
                    </Typography>
                    <br />
                    <Typography className={classes.font} color="textSecondary">
                      Standard Chartered
                      <br />
                      Account Number :{" "}
                      {
                        this.props.location.state.accountDetails.currentAccount
                          .accountNumber
                      }
                    </Typography>
                    <Typography
                      className={classes.font}
                      variant="h5"
                      component="h5"
                    >
                      Balance :{" "}
                      {
                        this.props.location.state.accountDetails.currentAccount
                          .accountBalance
                      }
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item justify="center" alignItems="center" xs={4}>
                {this.state.askButton ? (
                  <div>
                    <header style={botstyles.head}>
                      <p style={botstyles.headerTitle}>Ask SmartBot</p>
                    </header>
                    <div style={botstyles.messagesContainer}>
                      <ChatFeed
                        messages={this.state.messages}
                        hasInputField={false}
                        bubbleStyles={botstyles.bubbleStyles}
                      />
                      <a onClick={this.clearChat}>Clear Chat</a>
                      <input
                        onKeyPress={this._handleKeyPress}
                        onChange={this.onChange.bind(this)}
                        style={botstyles.input}
                        value={this.state.input}
                      />
                    </div>
                  </div>
                ) : (
                  <Button
                    className={classes.submitButton}
                    variant="contained"
                    color="primary"
                    onClick={this.handleSubmitClick}
                  >
                    Ask Smart Bot
                  </Button>
                )}
              </Grid>
            </Grid>
          </div>

          {this.state.open ? (
            <TransactionHistory open={this.state.open} />
          ) : null}
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
