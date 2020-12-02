import { createMuiTheme, emphasize, fade } from '@material-ui/core';
import base from './base';
import merge from 'lodash/merge';

const bodyColor = '#100f14';
const paperColor = 'rgb(33, 36, 41)';
const textPrimary = '#FFFFFF';
const textSecondary = '#a0a0a0';
const primaryMain = '#3f8bfe';
const secondaryMain = '#3f8bfe';
const buttonBackground = fade(textPrimary, 0.08);

const theme = {
	overrides: {
		MuiListItem: {
			root: {
				borderRadius: 10,
				padding: 8,
				marginLeft: -8,
				marginRight: -8,
			},
		},
		MuiAppBar: {
			colorDefault: {
				backgroundColor: 'rgb(33, 36, 41)',
			},
			colorTransparent: {
				borderBottom: `1px solid ${emphasize(bodyColor, 0.05)}`,
			},
		},
		MuiPaper: {
			root: {
				// border,
			},
		},
		MuiSelect: {
			root: {
				backgroundColor: buttonBackground,
			},
			select: {
				'&:focus': {
					borderRadius: 10,
				},
			},
		},
		MuiTooltip: {
			tooltip: {
				// border,
			},
		},
		MuiOutlinedInput: {},
		MuiTableCell: {
			root: {
				borderBottom: `1px solid ${fade(textPrimary, 0.08)}`,
			},
			head: {
				color: textSecondary,
				fontWeight: 400,
			},
		},
		MuiLink: {
			button: {
				'&:hover': {
					color: emphasize(textPrimary, 0.4),
				},
			},
		},
	},
	palette: {
		type: 'dark',
		common: {
			black: 'rgba(0, 0, 0, 1)',
			white: '#fff',
		},
		background: {
			default: bodyColor,
			paper: paperColor,
		},
		text: {
			primary: textPrimary,
			secondary: textSecondary,
		},
		primary: {
			main: primaryMain,
		},
		secondary: {
			main: secondaryMain,
		},
		error: {
			main: 'rgb(248, 73, 96)',
			contrastText: '#fff',
		},
		success: {
			main: 'rgb(2, 192, 118)',
			contrastText: '#fff',
		},
		action: {
			// disabledBackground: 'red',
			disabled: '#aaa',
		},
	},
};

export default createMuiTheme(merge({}, theme, base));
