// import OpenSansExtraLight from './OpenSans-ExtraLight.woff2';
import OpenSansLight from './OpenSans-Light.woff2';
import OpenSansRegular from './OpenSans-Regular.woff2';
import OpenSansBold from './OpenSans-Bold.woff2';
import OpenSansSemiBold from './OpenSans-SemiBold.woff2';
import OpenSansExtraBold from './OpenSans-ExtraBold.woff2';
// import OpenSansBlack from './OpenSans-Black.woff2';

// const OpenSansExtraLight = {
// 	fontFamily: 'OpenSans',
// 	fontStyle: 'normal',
// 	fontDisplay: 'swap',
// 	fontWeight: 200,
// 	src: `
//     local('OpenSans'),
//     local('OpenSans-ExtraLight'),
//     url(${OpenSansExtraLight}) format('woff2')
//     `,
// };

const openSansLight = {
	fontFamily: 'OpenSans',
	fontStyle: 'normal',
	fontDisplay: 'swap',
	fontWeight: 300,
	src: `
    local('OpenSans'),
    local('OpenSans-Light'),
    url(${OpenSansLight}) format('woff2')
    `,
};

const openSansRegular = {
	fontFamily: 'OpenSans',
	fontStyle: 'normal',
	fontDisplay: 'swap',
	fontWeight: 500,
	src: `
    local('OpenSans'),
    local('OpenSans-Regular'),
    url(${OpenSansRegular}) format('woff2')
    `,
};

const openSansSemiBold = {
	fontFamily: 'OpenSans',
	fontStyle: 'normal',
	fontDisplay: 'swap',
	fontWeight: 600,
	src: `
    local('OpenSans'),
    local('OpenSans-SemiBold'),
    url(${OpenSansSemiBold}) format('woff2')
    `,
};

const openSansExtraBold = {
	fontFamily: 'OpenSans',
	fontStyle: 'normal',
	fontDisplay: 'swap',
	fontWeight: 700,
	src: `
    local('OpenSans'),
    local('OpenSans-ExtraBold'),
    url(${OpenSansExtraBold}) format('woff2')
    `,
};

const openSansBold = {
	fontFamily: 'OpenSans',
	fontStyle: 'normal',
	fontDisplay: 'swap',
	fontWeight: 700,
	src: `
    local('OpenSans'),
    local('OpenSans-Bold'),
    url(${OpenSansBold}) format('woff2')
    `,
};

// const OpenSansBlack = {
// 	fontFamily: 'OpenSans',
// 	fontStyle: 'normal',
// 	fontDisplay: 'swap',
// 	fontWeight: 900,
// 	src: `
//     local('OpenSans'),
//     local('OpenSans-Black'),
//     url(${OpenSansBlack}) format('woff2')
//     `,
// };

export {
	openSansExtraBold,
	// OpenSansBlack,
	openSansBold,
	// OpenSansExtraLight,
	openSansLight,
	openSansRegular,
	openSansSemiBold,

	// OpenSansThin,
	// OpenSansMedium,
};
