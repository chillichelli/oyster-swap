import dark from './dark';
import light from './light';
import { Theme } from '@material-ui/core';

const themeMap: { [key: string]: Theme } = {
	light,
	dark,
};

export function getThemeByName(theme: string): Theme {
	return themeMap[theme];
}

export { dark, light };
