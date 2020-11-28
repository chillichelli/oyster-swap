import { fade, IconButton, withStyles } from '@material-ui/core';

const RaisedIconButton = withStyles(theme => ({
	root: {
		backgroundColor: fade(theme.palette.text.primary, 0.12),
		'&:hover': {
			backgroundColor: fade(theme.palette.text.primary, 0.24),
		},
	},
}))(IconButton);

export default RaisedIconButton;
