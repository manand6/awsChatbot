import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import home from "./Assets/home-loan.jpg";
import education from "./Assets/education-loan.jpg";
import personal from "./Assets/personal-loan.jpg";
import auto from "./Assets/auto-loan.jpg";
import "./LoanCarousel.css";
import { withStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import toRenderProps from "recompose/toRenderProps";
import withState from "recompose/withState";
import Typography from "@material-ui/core/Typography";
import ApplyLoanForm from "../Components/ApplyLoan/ApplyLoanForm";

const styles = (theme) => ({
  popOver: {
    maxWidth: 1050,
  },
});
export class Loans extends Component {
  constructor(props) {
    super(props);
    this.iconClicked = this.iconClicked.bind(this);

    this.state = {
      open: false,
      loanBannerSelected: "",
    };
  }

  iconClicked = (event) => {
    console.log(event);
    let value = "";
    switch (event) {
      case 0:
        value = "auto";
        break;
      case 1:
        value = "eud";
        break;
      case 2:
        value = "home";
        break;
      case 3:
        value = "personal";
        break;
    }
    this.setState({
      loanBannerSelected: value,
      open: true,
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
          </Carousel>
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Loans);
