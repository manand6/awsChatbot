import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import amazon from "./Assets/amazon.jpg";
import walmart from "./Assets/Walmart.jpg";
import flipkart from "./Assets/flipkart.jpg";
import alibaba from "./Assets/alibaba.jpg";
import "./LoanCarousel.css";
import { withStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import toRenderProps from "recompose/toRenderProps";
import withState from "recompose/withState";
import Typography from "@material-ui/core/Typography";
import ApplyLoanForm from "../ApplyLoan/ApplyLoanForm";

const styles = (theme) => ({
  popOver: {
    maxWidth: 1050,
  },
});
export class Wallets extends React.Component {
  constructor(props) {
    super(props);
    console.log("props", this);
    this.iconClicked = this.iconClicked.bind(this);

    this.state = {
      open: false,
      loanBannerSelected: "",
    };
  }

  iconClicked = (event) => {
    console.log(event);
    this.props.history.push({
      pathname: "/amazon",
      state: { accountDetails: null },
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {
          <Carousel
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
              <img src={amazon} alt=" " />
            </div>
            <div>
              <img src={walmart} alt=" " />
            </div>
            <div>
              <img src={flipkart} alt=" " />
            </div>
            <div>
              <img src={alibaba} alt=" " />
            </div>
          </Carousel>
        }
      </React.Fragment>
    );
  }
}

Wallets.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wallets);
