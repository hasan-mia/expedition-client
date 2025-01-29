/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { Skeleton } from "antd";
import { useExpeditions } from "@/app/(frontend)/useExpeditions";
import { useGet } from "@/config/api";

const UpdateExpedition = ({ params }: { params: { id: string } }) => {
	const { data, isPending } = useGet(
		`${process.env.NEXT_PUBLIC_API_URI}expedition/${params.id}`,
		"getSignleProduct",
	);

	const {
		initialState,
		isLoading,
		setInitialState,
		onUpdateItem,
		handleInputChange,
	} = useExpeditions();

	useEffect(() => {
		setInitialState({
			...initialState,
			name: data?.data?.name || "",
			destination: data?.data?.destination || "",
			price: data?.data?.price || 0,
			startDate: data?.data?.startDate || 0,
			endDate: data?.data?.endDate || 0,
			availableSeats: data?.data?.availableSeats || 0,
			totalSeats: data?.data?.totalSeats || 0,
		});
	}, [setInitialState, data]);

	if (isPending) {
		return (
			<div className="bg-gray-100 border rounded py-5 px-2">
				<Skeleton active />
				<Skeleton active className="mt-4" />
			</div>
		);
	}

	return (
		<div className="flex justify-center mt-5">
			<div style={{ minWidth: "80%" }}>
				<div className="flex rounded-lg min-h-full flex-1 flex-col justify-center px-5 pb-5 lg:px-10 bg-white shadow-lg">
					<div className="mt-10 sm:mx-auto sm:w-full">
						<h3 className="text-black text-xl font-semibold p-2mb-3">
							Update New Expedition
						</h3>
						<form
							onSubmit={(e) => onUpdateItem(e, params.id)}
							className="space-y-6"
						>
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium leading-6 text-black"
								>
									Name
								</label>
								<div className="mt-2">
									<input
										id="name"
										name="name"
										type="text"
										autoComplete="name"
										value={initialState?.name}
										onChange={handleInputChange}
										required
										className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="description"
									className="block text-sm font-medium leading-6 text-black"
								>
									Destination
								</label>
								<div className="mt-2">
									<textarea
										name="destination"
										id="destination"
										value={initialState?.destination}
										required
										onChange={handleInputChange}
										className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									></textarea>
								</div>
							</div>
							<div className="flex gap-5 w-full">
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<label
											htmlFor="price"
											className="block text-sm font-medium leading-6 text-black"
										>
											Price
										</label>
									</div>
									<div className="mt-2">
										<div className="mt-2">
											<input
												id="price"
												name="price"
												type="number"
												value={initialState?.price}
												required
												onChange={handleInputChange}
												className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
								</div>
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<label
											htmlFor="availableStock"
											className="block text-sm font-medium leading-6 text-black"
										>
											Available Seats
										</label>
									</div>
									<div className="mt-2">
										<div className="mt-2">
											<input
												id="availableSeats"
												name="availableSeats"
												type="number"
												value={initialState?.availableSeats}
												required
												onChange={handleInputChange}
												className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="flex gap-5 w-full">
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<label
											htmlFor="commission"
											className="block text-sm font-medium leading-6 text-black"
										>
											totalSeats
										</label>
									</div>
									<div className="mt-2">
										<div className="mt-2">
											<input
												id="commission"
												name="commission"
												type="number"
												required
												value={initialState?.totalSeats}
												onChange={handleInputChange}
												className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="flex w-full justify-center py-2">
								<button
									type="submit"
									className="w-1/2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									{isLoading ? "Updating.." : "Update Product"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateExpedition;
