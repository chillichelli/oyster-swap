import React from 'react';
import FormBase from '../layout/FormBase';
import { AddToLiquidity } from './add';
import DefaultLayout from '../defaultLayout';

export const AddView = () => {
	return (
		<DefaultLayout>
			<FormBase>
				<AddToLiquidity />
			</FormBase>
		</DefaultLayout>
	);
};
