import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import './ApplyLoanForm.css';
import Button from '@material-ui/core/Button';
import fetchSuccsess from '../../_mock_/loginService';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	dense: {
		marginTop: 16,
	},
	menu: {
		width: 200,
	},
	submitButton: {
		//padding: 20,
		//height: 20,
		width: 200,
		marginRight: 10,
		backgroundColor: '#4caf50',
	},
	resetButton: {
		//padding: 20,
		//height: 20,
		width: 200,
		marginRight: 10,
	},
});

const availableLoanTypes = [
	{
		value: 'auto',
		label: 'Auto Loan    ',
	},
	{
		value: 'eud',
		label: 'Education Loan    ',
	},
	{
		value: 'home',
		label: 'Home Loan',
	},
	{
		value: 'personal',
		label: 'Personal Loan     ',
	},
];

export class ApplyLoanForm extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			name: this.props.accountData.userName,
			amount: '',
			multiline: 'Controlled',
			loanSelected: this.props.loanBanner,
			responseReceived: false,
			interestRate: '',
			debitAccount: this.props.accountData.savingAccount.accountNumber,
			accounts: [
				{
					value: this.props.accountData.savingAccount.accountNumber,
					label: this.props.accountData.savingAccount.accountNumber,
				},
				{
					value: this.props.accountData.currentAccount.accountNumber,
					label: this.props.accountData.currentAccount.accountNumber,
				},
			],
		};
		global.fetch = fetchSuccsess;
	}

	componentDidMount() {
		let interest;
		switch (this.state.loanSelected) {
			case 'auto':
				interest = 9.4;
				break;
			case 'eud':
				interest = 11.15;
				break;
			case 'home':
				interest = 8.35;
				break;
			case 'personal':
				interest = 10.99;
				break;
		}
		this.setState({
			interestRate: interest,
		});
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
		let interest;
		if (name === 'loanSelected') {
			switch (event.target.value) {
				case 'auto':
					interest = 9.4;
					break;
				case 'eud':
					interest = 11.15;
					break;
				case 'home':
					interest = 8.35;
					break;
				case 'personal':
					interest = 10.99;
					break;
			}

			this.setState({
				interestRate: interest,
			});
		}
	};

	handleSubmitClick = () => {
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
	};

	handleResetClick = () => {
		this.setState({
			name: this.props.accountData.userName,
			amount: '',
			multiline: 'Controlled',
			loanSelected: 'auto',
			interestRate: 9.4,
			debitAccount: this.props.accountData.savingAccount.accountNumber,
			accounts: [
				{
					value: this.props.accountData.savingAccount.accountNumber,
					label: this.props.accountData.savingAccount.accountNumber,
				},
				{
					value: this.props.accountData.currentAccount.accountNumber,
					label: this.props.accountData.currentAccount.accountNumber,
				},
			],
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<div className="margin-20px">
				{this.state.responseReceived ? (
					<p>You have succesfully Applied for the loan. Please check availed loans tab for details. </p>
				) : (
					<form className={classes.container} noValidate autoComplete="off">
						<Grid container spacing={0}>
							<Grid container justify="center" alignItems="center">
								<Typography variant="h5" component="h1">
									{' '}
									Apply Loan{' '}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<TextField
									disabled
									id="outlined-disabled"
									label="Name"
									defaultValue={this.state.name}
									className={classes.textField}
									margin="normal"
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="outlined-select-loanType"
									select
									label="Loan Type"
									className={classes.textField}
									value={this.state.loanSelected}
									onChange={this.handleChange('loanSelected')}
									SelectProps={{
										MenuProps: {
											className: classes.menu,
										},
									}}
									helperText="Please select your Loan Type"
									margin="normal"
									variant="outlined"
								>
									{availableLoanTypes.map(option => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="outlined-read-only-input"
									label="Interest Rate"
									value={this.state.interestRate}
									className={classes.textField}
									margin="normal"
									InputProps={{
										readOnly: true,
									}}
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="outlined-number"
									label="Loan Amount"
									value={this.state.amount}
									onChange={this.handleChange('amount')}
									type="number"
									className={classes.textField}
									InputLabelProps={{
										shrink: true,
									}}
									InputProps={{ inputProps: { min: 0, max: 1000000 } }}
									margin="normal"
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="outlined-select-loanType"
									select
									label="Debit Account"
									className={classes.textField}
									value={this.state.debitAccount}
									onChange={this.handleChange('debitAccount')}
									SelectProps={{
										MenuProps: {
											className: classes.menu,
										},
									}}
									helperText="Please select your Debit Account"
									margin="normal"
									variant="outlined"
								>
									{this.state.accounts.map(option => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid>

							<Grid container justify="center" alignItems="center">
								<Button
									className={classes.submitButton}
									variant="contained"
									color="primary"
									onClick={this.handleSubmitClick}
								>
									Submit
								</Button>

								<Button
									className={classes.resetButton}
									variant="contained"
									onClick={this.handleResetClick}
								>
									Reset
								</Button>
							</Grid>
						</Grid>
					</form>
				)}
			</div>
		);
	}
}

ApplyLoanForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplyLoanForm);
