import React from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import TableContainer from '@material-ui/core/TableContainer';
import CircularProgress from '@material-ui/core/CircularProgress';

const DefaultTable = ({ columns, data, initialState = {}, disablePagination = false }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState,
			disableSortRemove: true,
		},
		useSortBy,
		usePagination
	);

	return (
		<>
			<TableContainer>
				<Table {...getTableProps()}>
					<TableHead>
						{headerGroups.map(headerGroup => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column, i) => (
									<TableCell
										align={i === 0 ? 'left' : 'right'}
										variant="head"
										{...column.getHeaderProps(column.getSortByToggleProps())}
									>
										<TableSortLabel
											active={column.isSorted}
											direction={column.isSortedDesc ? 'desc' : 'asc'}
											IconComponent={props => (
												<ExpandMoreRoundedIcon {...props} fontSize="small" />
											)}
										/>
										{column.render('Header')}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody {...getTableBodyProps()}>
						{data.length > 0 ? (
							page.map((row, i) => {
								prepareRow(row);
								return (
									<TableRow {...row.getRowProps()}>
										{row.cells.map((cell, k) => {
											cell.rowIndex = i;
											return (
												<TableCell align={k === 0 ? 'left' : 'right'} {...cell.getCellProps()}>
													{cell.render('Cell')}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell colSpan={columns.length}>
									<Box
										width={1}
										height={1}
										display="flex"
										alignItems="center"
										justifyContent="center"
									>
										<CircularProgress size={24} />
									</Box>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			{!disablePagination && (
				<Box mr={0.75}>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, 50]}
						component="div"
						count={data.length}
						rowsPerPage={pageSize}
						page={pageIndex}
						onChangePage={(e, val) => gotoPage(val)}
						onChangeRowsPerPage={e => setPageSize(e.target.value)}
					/>
				</Box>
			)}
		</>
	);
};

export default DefaultTable;
