import React from 'react';
import * as https from '../utils/https';
import { Redirect } from 'react-router-dom';
import UserActionHeader from '../component/UserActionHeader';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Snackbar from '@material-ui/core/Snackbar';
import validateForm from '../utils/validateForm';
import Typography from '@material-ui/core/Typography';
import Loader from '../component/Loader';

class SignUpUI extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			newAdminSuccess: false,
			errorMessages: '',
			open: false,
			vertical: 'top',
			horizontal: 'center',
		};
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleClick = state => () => {
		this.setState({ open: true, ...state });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	onSubmit = async e => {
		e.preventDefault();
		const validation = validateForm(
			this.state.email,
			this.state.password,
			'signUp'
		);

		if (validation) {
			let data = {
				email: this.state.email,
				password: this.state.password,
			};
			this.props.setSignUpBegin();
			let response = await https
				.post('signUp', data)
				.then(data => {
					if (data.status === 201) {
						this.props.setSignUpSuccess();
						return true;
					} else {
						this.props.setSignUpError();
						return false;
					}
				})
				.catch(err => console.log(err));
			if (response) {
				this.setState({
					newAdminSuccess: true,
					open: true,
				});
			} else {
				this.props.setSignupError();

				this.setState({ errorMessages: 'Email is Already in use' });
			}
		} else {
			this.props.setSignupError();
			this.setState({
				errorMessages: 'Password lenght must be more than 3',
			});
		}
	};

	adminCreated = () => {
		if (this.state.newAdminSuccess) {
			return <Redirect to="/login" />;
		}
	};

	render() {
		const { vertical, horizontal, open } = this.state;
		return (
			<div>
				<UserActionHeader />

				<div className="signUp-Wrapper">
					<div>
						<Typography variant="headline" align="center">
							{this.props.signingUp ? <Loader /> : <span>SignUp</span>}
						</Typography>
					</div>

					<ValidatorForm ref="form" className="form" onSubmit={this.onSubmit}>
						<TextValidator
							id="email"
							label="Email"
							placeholder="Email"
							margin="normal"
							value={this.state.email}
							onChange={this.onChange}
							type="text"
							name="email"
							validators={['required', 'isEmail']}
							errorMessages={['this field is required', 'email is not valid']}
						/>
						<br />
						<TextValidator
							value={this.state.password}
							onChange={this.onChange}
							type="password"
							name="password"
							placeholder="PASSWORD"
							id="password"
							label="Password"
							validators={['required']}
							errorMessages={['this field is required']}
						/>
						<br />

						<div className="error"> {this.state.errorMessages}</div>
						<br />

						<Button
							variant="contained"
							color="primary"
							className="login-btn"
							type="submit"
							value="Log In"
						>
							SIGN UP
						</Button>
					</ValidatorForm>

					<Snackbar
						anchorOrigin={{ vertical, horizontal }}
						open={this.state.newAdminSuccess}
						onClose={this.handleClose}
						ContentProps={{
							'aria-describedby': 'message-id',
						}}
						message={
							<span id="message-id">
								Sign Up Sucessful Goto <Link to="/login"> Login</Link>
							</span>
						}
					/>

					<div className="redirect-LogIn">
						<p>
							{' '}
							Already Registered? <Link to={'/login'}>LogIn</Link>{' '}
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default SignUpUI;
