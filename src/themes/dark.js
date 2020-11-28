import { createMuiTheme, fade } from '@material-ui/core';
import base from './base';
import merge from 'lodash/merge';

const bodyColor = '#303030';
const textPrimary = '#FFFFFF';
const textSecondary = '#c0c0c0';
const primaryMain = '#cf43f5';
const secondaryMain = '#1473FF';
const buttonBackground = fade(textPrimary, 0.08);
const popoverBackground = fade('#000', 0.5);
const border = `1px solid ${popoverBackground}`;

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
		MuiPaper: {
			root: {
				border,
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
				border,
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
	},
	palette: {
		type: 'dark',
		common: {
			black: 'rgba(0, 0, 0, 1)',
			white: '#fff',
		},
		background: {
			default: bodyColor,
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
