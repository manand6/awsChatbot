import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Typography, card, CardContent, Grid } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = (theme) => ({
  paper: {
    position: "absolute",

    width: 800,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  formControl: {
    width: 250,
    marginLeft: 350,
    marginTop: -40,
  },
  submitButton: {
    //padding: 20,
    //height: 20,
    width: 200,
    marginRight: 20,
    marginLeft: 160,
    //backgroundColor: "#4caf50",
    backgroundColor: "#00b9f5",
  },
  resetButton: {
    //padding: 20,
    //height: 20,
    width: 200,
    marginRight: 10,
  },
});

class TransactionGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      image1: false,
      image2: false,
      image: true,
      bank: "",
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleImage1 = this.handleImage1.bind(this);
    this.handleImage2 = this.handleImage2.bind(this);
    this.handleImage3 = this.handleImage3.bind(this);
    this.submitBank = this.submitBank.bind(this);
  }

  componentWillMount() {
    this.setState({ open: this.props.open });
  }
  componentWillReceiveProps() {
    this.setState({ open: this.props.open });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleImage1() {
    this.setState({ image1: true, image: false });
  }
  handleImage2() {
    this.setState({ image2: true, image1: false });
  }
  handleImage3() {
    this.setState({ image3: true, image2: false });
  }
  submitBank() {
    console.log("hell", this.state.bank);
    if (this.state.bank === 10) {
      window.open(
        "https://ibank.standardchartered.co.in/nfs/login.htm?_ga=2.16355505.607956317.1599838794-1869561468.1599838794",
        "_blank"
      );
    } else if (this.state.bank === 20) {
      window.open(
        "https://netbanking.hdfcbank.com/netbanking/?_ga=2.89804379.1325222143.1599839936-1483761288.1547739009",
        "_blank"
      );
    } else if (this.state.bank === 30) {
      window.open(
        "https://www.kotak.com/j1001mp/netapp/MainPage.jsp",
        "_blank"
      );
    } else if (this.state.bank === 40) {
      window.open("https://www.bobibanking.com/", "_blank");
    } else if (this.state.bank === 50) {
      window.open("https://pnbibanking.in/", "_blank");
    }
  }

  handleClose() {
    this.setState({ open: false });
  }
  handleBankChange = (event) => {
    console.log("bank", event.target);
    let value = event.target.value;
    this.setState({ bank: value });
  };

  render() {
    const { classes } = this.props;
    console.log("open", classes);
    return (
      <div>
        {/* <Typography gutterBottom>
          Click to get the full Modal experience!
        </Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button> */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          style={{ display: "block" }}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <card>
              <Grid className={classes.pos} item xs={12}>
                <Typography
                  variant="h5"
                  component="h1"
                  style={{ marginLeft: 250 }}
                >
                  Transfer to the Bank
                </Typography>
              </Grid>
              <br />
              <br />
              <Typography>
                {" "}
                Please select the bank you would like to transfer
              </Typography>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Select the bank
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.bank}
                  onChange={(e) => this.handleBankChange(e)}
                  label="Bank"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Standard Chartered</MenuItem>
                  <MenuItem value={20}>Hdfc</MenuItem>
                  <MenuItem value={30}>Kotak Mahindra Bank</MenuItem>
                  <MenuItem value={40}>Bank of Baroda</MenuItem>
                  <MenuItem value={50}>Punjab National Bank</MenuItem>
                </Select>
              </FormControl>
              <br />
              <br />
              <br />
              <Button
                className={classes.submitButton}
                variant="contained"
                color="primary"
                onClick={this.submitBank}
              >
                Submit
              </Button>

              <Button
                className={classes.resetButton}
                variant="contained"
                onClick={this.handleClose}
              >
                Reset
              </Button>
            </card>
            <TransactionGraphWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

TransactionGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

const TransactionGraphWrapped = withStyles(styles)(TransactionGraph);

export default TransactionGraphWrapped;
