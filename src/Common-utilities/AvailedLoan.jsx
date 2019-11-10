import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Logo from '../Components/Login/Assets/bg.PNG';

const styles = theme => ({
	root: {
		flexGrow: 1,
		marginTop: 30,
		marginLeft: 20,
	},

	title: {
		display: 'none',
		fontSize: 14,
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	font: {
		color: '#fff',
	},
	card: {
		width: 300,
		height: 170,
		backgroundSize: 'cover',
		//backgroundImage: 'url('../../Components/Login/Assets/login.png')',
		backgroundImage: 'url(' + Logo + ')',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	pos: {
		marginBottom: 12,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'Left',
	},
});

class AvailedLoan extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { classes } = this.props;
		return (
			<Grid item container spacing={8}>
				<Grid item container justify="center" alignItems="center" xs={6}>
					<Card className={classes.card}>
						<CardContent>
							<Typography className={classes.font} variant="h5" component="h2">
								Scooter Loan
							</Typography>
							<br />
							<Typography className={classes.font} color="textSecondary">
								Auto Loan
								<br />
								Account Number : 12313
							</Typography>
							<Typography className={classes.font} variant="h5" component="h5">
								Loan Amount : 56463
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={6}>
					<Card className={classes.card}>
						<CardContent>
							<Typography className={classes.font} variant="h5" component="h2">
								Renovation Loan
							</Typography>
							<br />
							<Typography className={classes.font}>
								Personal Loan
								<br />
								Account Number : 5645
							</Typography>
							<Typography className={classes.font} variant="h5" component="h5">
								Loan Amount : 53425
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		);
	}
}

AvailedLoan.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AvailedLoan);
