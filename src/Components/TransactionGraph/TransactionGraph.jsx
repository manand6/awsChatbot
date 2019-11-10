import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import First from "../../Common-utilities/Assets/1.png";
import Two from "../../Common-utilities/Assets/2.png";
import Three from "../../Common-utilities/Assets/3.png";
import Four from "../../Common-utilities/Assets/4.png";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",

    width: 800,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class TransactionGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      image1: false,
      image2: false,
      image: true
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleImage1 = this.handleImage1.bind(this);
    this.handleImage2 = this.handleImage2.bind(this);
    this.handleImage3 = this.handleImage3.bind(this);
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

  handleClose() {
    this.setState({ open: false });
  }

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
        >
          <div style={getModalStyle()} className={classes.paper}>
            {this.state.image ? (
              <img width="500px" src={First} onClick={this.handleImage1} />
            ) : null}
            <br />
            {this.state.image1 ? (
              <img width="500px" src={Two} onClick={this.handleImage2} />
            ) : null}
            {this.state.image2 ? (
              <img width="500px" src={Three} onClick={this.handleImage3} />
            ) : null}
            {this.state.image3 ? (
              <img width="500px" src={Four} onClick={this.handleImage3} />
            ) : null}
            <TransactionGraphWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

TransactionGraph.propTypes = {
  classes: PropTypes.object.isRequired
};

const TransactionGraphWrapped = withStyles(styles)(TransactionGraph);

export default TransactionGraphWrapped;
