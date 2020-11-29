import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { openSansExtraBold, openSansLight, openSansRegular, openSansSemiBold } from '../assets/fonts';
const breakpoints = createBreakpoints({});

const theme = {
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'@font-face': [openSansRegular, openSansSemiBold, openSansLight, openSansExtraBold],
			},
		},
		MuiContainer: {
			root: {
				paddingLeft: '16px !important',
				paddingRight: '16px !important',
			},
		},
		MuiAppBar: {},
		MuiTypography: {
			caption: {
				// fontSize: '0.825rem',
			},
			h6: {
				// fontSize: '1rem',
			},
			body1: {},
			subtitle1: {
				// fontSize: '0.875rem',
			},
		},
		MuiButton: {
			textSizeLarge: {
				fontSize: '1rem',
			},
			sizeSmall: {
				height: 30,
			},
			containedSizeSmall: {
				padding: '0 10px',
			},
			outlinedSizeSmall: {
				padding: '0 10px',
			},
			containedSizeLarge: {
				fontSize: '1.25rem',
			},
			root: {
				fontSize: '0.875rem',
				minWidth: 'unset',
				textTransform: 'capitalize',
				border: '1px solid transparent',
			},
		},
		MuiIconButton: {
			root: {
				padding: 8,
				borderRadius: 10,
			},
		},
		MuiMenuItem: {
			root: {
				borderRadius: 10,
				marginTop: 2,
				marginLeft: 8,
				marginRight: 8,
				marginBottom: 2,
				paddingTop: 4,
				paddingBottom: 4,
			},
		},
		MuiListItemIcon: {
			root: {
				minWidth: '32px',
			},
		},
		MuiListItemText: {
			inset: {
				paddingLeft: 32,
			},
		},
		MuiSelect: {
			root: {
				display: 'inline-flex',
				alignItems: 'center',
			},
			select: {
				borderRadius: 10,
				paddingLeft: 8,
				paddingRight: '26px !important',
			},
		},
		MuiTooltip: {
			popper: {
				borderRadius: 10,
			},
			tooltip: {
				borderRadius: 10,
			},
		},
		MuiInputBase: {
			input: {
				padding: `3px 0 4px`,
			},
		},
		MuiInputAdornment: {
			positionEnd: {
				marginLeft: 4,
			},
		},
		MuiDataGrid: {
			root: {
				border: 'none',
			},
		},
		MuiTableCell: {
			root: {
				fontSize: 14,
				whiteSpace: 'nowrap',
				[breakpoints.down('xs')]: {
					'&:not(:first-child):not(:last-child)': {
						paddingLeft: 8,
						paddingRight: 8,
					},
				},
			},
		},
	},
	typography: {
		fontSize: 12,
		fontFamily: [
			'OpenSans',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(', '),
	},
	breakpoints,
	shape: {
		borderRadius: 10,
	},
};

export default theme;
