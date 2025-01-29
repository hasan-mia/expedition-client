/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
"use client";

import Link from "next/link";
import { Button, Skeleton, Table } from "antd";
import moment from "moment";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useExpeditions } from "@/app/(frontend)/useExpeditions";

export default function ExpeditionHome() {
	const {
		data,
		isLoading,
		currentPage,
		handlePageChange,
		keyword,
		setKeyword,
		setLimit,
		setCurrentPage,
	} = useExpeditions();
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
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			render: (value: any, record: any) => (
				<span className="flex gap-1 items-center">
					{parseFloat(value).toFixed(2)}
				</span>
			),
		},
		{
			title: "Destination",
			dataIndex: "destination",
			key: "destination",
		},
		{
			title: "Available Seats",
			dataIndex: "availableSeats",
			key: "availableSeats",
			render: (value: any, record: any) => (
				<span className="flex gap-1 items-center">
					{parseFloat(value).toFixed(2)}
				</span>
			),
		},
		{
			title: "Total Seats",
			dataIndex: "totalSeats",
			key: "totalSeats",
			render: (value: any, record: any) => (
				<span className="flex gap-1 items-center">
					{parseFloat(value).toFixed(2)}
				</span>
			),
		},
		{
			title: "Date",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (value: string, record: any) => (
				<span>{moment(record.date).format("DD-MM-YY")}</span>
			),
		},
		{
			title: "Action",
			key: "action",
			render: (value: string, record: any) => (
				<div className="flex gap-2">
					<Link href={`/dashboard/update/${record?._id}`}>
						<Button className="hover:text-gray-700 border-orange-500 text-orange-500">
							<BiEdit className="h-4 w-4" />
						</Button>
					</Link>
					<Button className="hover:text-red-700 border-green-500 text-green-500">
						<BiTrash className="h-4 w-4" />
					</Button>
				</div>
			),
		},
	];

	return (
		<div className="grid grid-cols-1">
			<div className="bg-gray-100 border rounded pt-5">
				<div className="p-4 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
					<h2 className="text-lg font-semibold text-black">All Expedition</h2>

					<div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:items-center">
						<input
							className="w-full sm:w-auto rounded-lg h-9 border-slate-300 text-slate-700 px-2"
							type="search"
							placeholder="Search name"
							name="keyword"
							value={keyword || ""}
							onChange={(e) => setKeyword(e.target.value)}
						/>

						<Link
							href="/dashboard/create"
							className="text-sm py-1 px-2 font-normal text-white uppercase bg-green-600 rounded-md text-center sm:whitespace-nowrap"
						>
							Create New
						</Link>
					</div>
				</div>
				<Table
					className="bg-transparent overflow-x-auto"
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
