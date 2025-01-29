/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dayjs from "dayjs";

import { useExpeditions } from "@/app/(frontend)/useExpeditions";
import { DatePicker } from "antd";

const CreateProduct = () => {
	const {
		isLoading,
		initialState,
		setInitialState,
		handleInputChange,
		onCreateItem,
	} = useExpeditions();

	// Handle Date Change
	const handleDateChange = (
		date: dayjs.Dayjs | null,
		dateString: string,
		field: string,
	) => {
		setInitialState((prevState: any) => ({
			...prevState,
			[field]: date ? dayjs(date).toISOString() : "",
		}));
	};

	console.log(initialState);

	return (
		<div className="flex justify-center mt-5">
			<div style={{ minWidth: "80%" }}>
				<div className="flex rounded-lg min-h-full flex-1 flex-col justify-center px-5 pb-5 lg:px-10 bg-white shadow-lg">
					<div className="mt-10 sm:mx-auto sm:w-full">
						<h3 className="text-black text-xl font-semibold p-2mb-3">
							Create New Expedition
						</h3>

						<form onSubmit={onCreateItem} className="space-y-6">
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
										onChange={handleInputChange}
										required
										className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="destination"
									className="block text-sm font-medium leading-6 text-black"
								>
									Destination
								</label>
								<div className="mt-2">
									<textarea
										name="destination"
										id="destination"
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
											htmlFor="availableSeats"
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
											htmlFor="totalSeats"
											className="block text-sm font-medium leading-6 text-black"
										>
											Total Seats
										</label>
									</div>
									<div className="mt-2">
										<div className="mt-2">
											<input
												id="totalSeats"
												name="totalSeats"
												type="number"
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
									<label className="block text-sm font-medium leading-6 text-black">
										Start Date
									</label>
									<DatePicker
										showTime
										allowClear
										onChange={(date, dateString) =>
											handleDateChange(
												date,
												Array.isArray(dateString) ? dateString[0] : dateString,
												"startDate",
											)
										}
										className="w-full"
									/>
								</div>
								<div className="flex-1">
									<label className="block text-sm font-medium leading-6 text-black">
										End Date
									</label>
									<DatePicker
										showTime
										allowClear
										onChange={(date, dateString) =>
											handleDateChange(
												date,
												Array.isArray(dateString) ? dateString[0] : dateString,
												"endDate",
											)
										}
										className="w-full"
									/>
								</div>
							</div>

							<div className="flex w-full justify-center py-2">
								<button
									disabled={isLoading}
									type="submit"
									className="w-1/2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									{isLoading ? "Creating..." : "Create new"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateProduct;
