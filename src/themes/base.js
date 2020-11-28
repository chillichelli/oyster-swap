import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { ubuntuExtraBold, ubuntuLight, ubuntuRegular, ubuntuSemiBold } from '../assets/fonts';
const breakpoints = createBreakpoints({});

const theme = {
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'@font-face': [ubuntuRegular, ubuntuSemiBold, ubuntuLight, ubuntuExtraBold],
			},
		},
		MuiContainer: {
			root: {
				paddingLeft: '16px !important',
				paddingRight: '16px !important',
			},
		},
		MuiAppBar: {
			colorTransparent: {
				border: 'none',
			},
		},
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
				padding: 12,
				margin: '0 !important',
				borderRadius: 10,
				backgroundColor: 'rgba(255,255,255,0.36)',
				boxShadow:
					'0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
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
					'&:first-child': {
						paddingRight: 0,
					},
					'&:last-child': {
						paddingLeft: 0,
					},
					'&:not(:first-child):not(:last-child)': {
						paddingLeft: 0,
						paddingRight: 0,
					},
				},
			},
		},
	},
	typography: {
		fontSize: 14,
		fontFamily: [
			'Ubuntu',
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
