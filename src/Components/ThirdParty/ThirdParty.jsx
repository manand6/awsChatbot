import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import amazon1 from "./Assets/amazon1.PNG";
import amazon2 from "./Assets/amazon2.PNG";
import payment1 from "./Assets/payment1.PNG";
import payment2 from "./Assets/payment2.PNG";
import {
  TextField,
  Button,
  Grid,
  CardContent,
  Typography,
  Card,
} from "@material-ui/core";

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
  gateWayButton: {
    width: 200,
    marginRight: 10,
    backgroundColor: "#00b9f5",
  },
});

export class ThirdParty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image1: true,
      image2: false,
      image3: false,
      image4: false,
    };
    this.firstClick = this.firstClick.bind(this);
    this.secondClick = this.secondClick.bind(this);
    this.thirdClick = this.thirdClick.bind(this);
    this.handleGateway = this.handleGateway.bind(this);
  }

  firstClick() {
    this.setState({
      image1: false,
      image2: true,
      image3: false,
      image4: false,
    });
  }

  secondClick() {
    this.setState({
      image1: false,
      image2: false,
      image3: true,
      image4: false,
    });
  }

  thirdClick() {
    this.setState({
      image1: false,
      image2: false,
      image3: false,
      image4: true,
    });
  }

  handleGateway() {
    this.props.history.push({
      pathname: "/login",
      state: { gateway: true },
    });
  }

  render() {
    const classes = this.props;

    return (
      <Grid container spacing={12}>
        <Grid item container xs={12}>
          {this.state.image1 ? (
            <img
              style={{ width: "-webkit-fill-available" }}
              src={amazon1}
              alt=" "
              onClick={this.firstClick}
            />
          ) : this.state.image2 ? (
            <img
              style={{ width: "-webkit-fill-available" }}
              src={amazon2}
              alt=" "
              onClick={this.secondClick}
            />
          ) : this.state.image3 ? (
            <>
              <img
                style={{ width: "-webkit-fill-available" }}
                src={payment1}
                alt=" "
                onClick={this.thirdClick}
              />
              <img
                style={{ width: "-webkit-fill-available" }}
                src={payment2}
                alt=" "
              />
              <paper elevation={3} component="form">
                <Grid container spacing={12}>
                  <Button
                    className={classes.gateWayButton}
                    variant="contained"
                    style={{ marginLeft: 155, marginTop: 25 }}
                    onClick={this.handleGateway}
                  >
                    Pay through DiG Wallet
                  </Button>
                </Grid>
              </paper>
            </>
          ) : this.state.image4 ? (
            <img
              style={{ width: "-webkit-fill-available" }}
              src={payment2}
              alt=" "
            />
          ) : null}
        </Grid>
      </Grid>
    );
  }
}

ThirdParty.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThirdParty);
