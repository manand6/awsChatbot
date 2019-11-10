import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NewLoan from './LoanCarousel';
import AvailedLoan from './AvailedLoan';
import '../Components/Dashboard/Dashboard.css';

const styles = theme => ({
	root: {
		width: '100%',
		background: '#fff',
		marginTop: 20,
		maxWidth: 1200,
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	accordion: {
		background: '#ccc',
	},
	card: {
		justify: 'center',
		alignItems: 'center',
	},
});

class ControlledExpansionPanels extends React.Component {
	state = {
		expanded: null,
	};

	handleChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false,
		});

		if (panel == 'panel1' && expanded) {
			fetch(
				'http://localhost:8080/BFS/loginDetails/loginGet?accNum=' +
					this.state.debitAccount +
					'&interest=' +
					this.state.interestRate +
					'&loanAmount=' +
					this.state.amount +
					'&loanType=' +
					this.state.loanSelected
			)
				.then(response => response.json())
				.then(responseobj => {
					if (!!responseobj) {
						this.setState({
							responseReceived: true,
						});
					}
				});
		}
	};

	render() {
		const { classes } = this.props;
		const { expanded } = this.state;
		return (
			<div className={classes.root}>
				<ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
					<ExpansionPanelSummary className={classes.accordion} expandIcon={<ExpandMoreIcon />}>
						<Typography className={classes.heading}>Availed Loans</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className={classes.card}>
						<AvailedLoan accountData={this.props.accountData} />
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<br />
				<ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
					<ExpansionPanelSummary className={classes.accordion} expandIcon={<ExpandMoreIcon />}>
						<Typography className={classes.heading}>New Loans</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
							<NewLoan accountData={this.props.accountData} />
						</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}
}

ControlledExpansionPanels.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
