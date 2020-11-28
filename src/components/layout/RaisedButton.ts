import { Button, fade, withStyles } from '@material-ui/core';

const RaisedButton = withStyles(theme => ({
	root: {
		backgroundColor: fade(theme.palette.text.primary, 0.12),
		'&:hover': {
			backgroundColor: fade(theme.palette.text.primary, 0.24),
		},
	},
}))(Button);

export default RaisedButton;
