import React, { Component } from "react";
import "./Login.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import green from "@material-ui/core/colors/green";
import LockIcon from "@material-ui/icons/Lock";
import Logo from "./Assets/logo.PNG";
import digwallet from "./Assets/digwallet.png";
import Mock from "../../_mock_/loginService";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing.unit * 3,
    margin: "auto",
    marginTop: 200,
    width: "100%",
    maxWidth: 300,
    marginLeft: 200,
    boxShadow:
      "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px -3px 1px -2px rgba(0,0,0,0.12)",
  },
  textField: {
    margin: "auto",
    width: "100%",
  },
  login: {
    margin: "auto",
    justify: "center",
    alignItems: "center",
  },
  avatar: {
    margin: 10,
  },
  greenAvatar: {
    margin: "auto",
    color: "#fff",
    backgroundColor: green[500],
  },
  button: {
    margin: "auto",
    width: "100%",
    height: 50,
    color: "#fff",
    backgroundColor: "#4caf50",
  },
});

export class portalContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      invalidUsername: false,
      invalidPassword: false,
      invalidCredentials: false,
    };

    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    global.fetch = Mock;
  }

  handleUserName(e) {
    this.setState({
      username: e.target.value,
      invalidUsername: false,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
      invalidPassword: false,
    });
  }

  handleLogin(e) {
    e.preventDefault();
    const { username, password, invalidUsername, invalidPassword } = this.state;

    if (username === "") {
      this.setState({
        invalidUsername: !invalidUsername,
      });
    }
    if (password === "") {
      this.setState({
        invalidPassword: !invalidPassword,
      });
    }

    fetch(
      "http://localhost:8080/BFS/loginDetails/loginGet?userID=" +
        this.state.username +
        "&password=" +
        this.state.password
    )
      .then((response) => response.json())
      .then((responseobj) => {
        if (!!responseobj && responseobj.validUser) {
          this.setState({ invalidCredentials: false });
          console.log("this.props", this.props);
          if (
            !!this.props.location.state &&
            this.props.location.state.gateway
          ) {
            this.props.history.push({
              pathname: "/AddMoney",
              state: { accountDetails: null },
            });
          } else {
            this.props.history.push({
              pathname: "/dashboard",
              state: { accountDetails: responseobj },
            });
          }
        } else if (!!responseobj && !responseobj.validUser) {
          console.log("hellow");
          this.setState({ invalidCredentials: true });
        }
      });
  }

  render() {
    const { classes } = this.props;
    const { username, password, invalidUsername, invalidPassword } = this.state;
    return (
      <React.Fragment>
        <div className="bg-paper">
          <img alt="text" className="logo" src={digwallet} />
          <Paper className={classes.paper}>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item>
                <Avatar className={classes.greenAvatar}>
                  <LockIcon />
                </Avatar>
              </Grid>
              <Grid item container>
                <TextField
                  error={invalidUsername}
                  id="userName"
                  label="User Name"
                  className={classes.textField}
                  type="userName"
                  name="userName"
                  value={username}
                  onChange={this.handleUserName}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item container>
                <TextField
                  error={invalidPassword}
                  id="password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handlePassword}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item container>
                <Button
                  id="login"
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleLogin}
                >
                  LOGIN
                </Button>
              </Grid>
              {this.state.invalidCredentials ? (
                <Grid item className="error-message">
                  Invalid UserName/Password
                </Grid>
              ) : null}
              <Grid item>New User ? Register</Grid>
            </Grid>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

// Login.propTypes = {
// 	classes: PropTypes.object.isRequired,
// };
portalContent.defaultProps = { classes: {} };

export default withStyles(styles)(portalContent);
