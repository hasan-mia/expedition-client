/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button, Skeleton, Table } from "antd";
import { useBookings } from "./useBookings";
import { FcCancel } from "react-icons/fc";

export default function ExpeditionHome() {
	const {
		data,
		isLoading,
		currentPage,
		handlePageChange,
		setLimit,
		setCurrentPage,
		cancelFromBook,
	} = useBookings();
	if (isLoading) {
		return (
			<div className="bg-gray-100 border rounded py-5 px-2">
				<Skeleton active />
				<Skeleton active className="mt-4" />
			</div>
		);
	}

	const listColumn = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (value: any, record: any) => (
				<span className="flex gap-1 items-center">
					{record?.expedition?.name}
				</span>
			),
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			render: (value: any, record: any) => (
				<span className="flex gap-1 items-center">
					{parseFloat(record?.expedition?.price).toFixed(2)}
				</span>
			),
		},
		{
			title: "Destination",
			dataIndex: "destination",
			key: "destination",
			render: (value: any, record: any) => (
				<span className="flex gap-1 items-center">
					{record?.expedition?.destination}
				</span>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (value: string, record: any) => <span>{value}</span>,
		},
		{
			title: "Cancel",
			key: "action",
			render: (value: string, record: any) => (
				<div className="flex gap-2">
					<Button
						className="hover:text-red-700 border-green-500 text-green-500"
						onClick={(e) => cancelFromBook(e, record._id)}
					>
						<FcCancel className="h-4 w-4" />
					</Button>
				</div>
			),
		},
	];

	return (
		<div className="grid grid-cols-1">
			<div className="bg-gray-100 border rounded pt-5">
				<div className="p-4 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
					<h2 className="text-lg font-semibold text-black">All My Bookings</h2>
				</div>
				<Table
					className="bg-transparent overflow-x-auto"
					rowKey="key"
					dataSource={data?.data || []}
					columns={listColumn}
					pagination={{
						pageSize: data?.perPage || 10,
						total: data?.total || 0,
						current: currentPage,
						onChange: handlePageChange,
						showSizeChanger: true,
						pageSizeOptions: ["10", "25", "50", "100"],
						onShowSizeChange: (current, newSize) => {
							setLimit(newSize);
							setCurrentPage(1);
						},
						showQuickJumper: true,
					}}
					// expandable={{
					// 	rowExpandable: (record) => !record.name,
					// 	expandedRowRender: (record) => {
					// 		return <p>{record?.name}</p>;
					// 	},
					// }}
					scroll={{ x: "max-content" }}
				/>
			</div>
		</div>
	);
}
