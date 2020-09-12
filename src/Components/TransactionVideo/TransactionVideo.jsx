import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Player } from "video-react";
import Logo from "./video/images.mp4";
//import NewLoan from "../../Common-utilities/LoanCarousel";
import { Carousel } from "react-responsive-carousel";
import home from "../../Common-utilities/Assets/home-loan.jpg";
import education from "../../Common-utilities/Assets/education-loan.jpg";
import personal from "../../Common-utilities/Assets/personal-loan.jpg";
import auto from "../../Common-utilities/Assets/auto-loan.jpg";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";

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
});

class TransactionVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    // this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
            {/* <Carousel
              className="resize-img "
              showStatus={false}
              infiniteLoop={true}
              showThumbs={false}
              onClickItem={this.iconClicked}
              autoPlay={true}
              showIndicators={true}
              dynamicHeight={true}
            >
              <div>
                <img src={auto} alt=" " />
              </div>
              <div>
                <img src={education} alt=" " />
              </div>
              <div>
                <img src={home} alt=" " />
              </div>
              <div>
                <img src={personal} alt=" " />
              </div>
            </Carousel> */}
            Under Construction
            {/* <video width="420" src={Logo} type="video/mp4">
              Your browser does not support HTML5 video.
            </video> */}
            <TransactionVideoWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

TransactionVideo.propTypes = {
  classes: PropTypes.object.isRequired,
};

const TransactionVideoWrapped = withStyles(styles)(TransactionVideo);

export default TransactionVideoWrapped;
