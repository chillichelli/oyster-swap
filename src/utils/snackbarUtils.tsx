import { useSnackbar, VariantType, WithSnackbarProps } from 'notistack';
import React from 'react';

interface IProps {
	setUseSnackbarRef: (showSnackbar: WithSnackbarProps) => void;
}

const InnerSnackbarUtilsConfigurator: React.FC<IProps> = (props: IProps) => {
	props.setUseSnackbarRef(useSnackbar());
	return null;
};

let useSnackbarRef: WithSnackbarProps;
const setUseSnackbarRef = (useSnackbarRefProp: WithSnackbarProps) => {
	useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = () => {
	return <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />;
};

export default {
	success(msg: any, action: () => React.ReactNode) {
		this.toast(msg, 'success', action);
	},
	warning(msg: any, action: () => React.ReactNode) {
		this.toast(msg, 'warning', action);
	},
	info(msg: any, action: () => React.ReactNode) {
		this.toast(msg, 'info', action);
	},
	error(msg: any, action: () => React.ReactNode) {
		this.toast(msg, 'error', action);
	},
	toast(msg: any, variant: VariantType = 'default', action: () => React.ReactNode) {
		useSnackbarRef.enqueueSnackbar(msg, { variant, action });
	},
};
