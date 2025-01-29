/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
	createJsonMutationConfig,
	MutationParameters,
	updateJosnMutationConfig,
	useGet,
} from "@/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export function useBookings() {
	const queryClient = useQueryClient();
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [limit, setLimit] = useState(3);
	const [previousPage, setPreviousPage] = useState(1);
	const [keyword, setKeyword] = useState<string | null>(null);
	const [allData, setAllData] = useState<any[]>([]);

	const { data, isPending, refetch } = useGet(
		`${
			process.env.NEXT_PUBLIC_API_URI
		}booking/my?page=${currentPage}&limit=${encodeURIComponent(limit)}}`,
		`bookings-${currentPage}`,
	);

	// initial state
	const [initialState, setInitialState] = useState({
		expeditionId: "",
	});

	console.log(initialState);

	// handlele input data
	const handleInputChange = (expeditionId: string) => {
		setInitialState({
			...initialState,
			expeditionId,
		});
	};

	// ==========Handle Create========
	const createMutation = useMutation<any, Error, MutationParameters>(
		createJsonMutationConfig(queryClient, `bookings-${currentPage}`),
	);

	const addToBook = async (e: any, id: string) => {
		e.preventDefault();
		setIsLoading(true);
		console.log(id);
		try {
			const response = await createMutation.mutateAsync({
				url: `${process.env.NEXT_PUBLIC_API_URI}booking/create`,
				data: { expeditionId: id },
			});

			if (response) {
				console.log("Success!", "expedition added successfully");
				toast.success("expedition added successfully");
				setIsLoading(false);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log("Error!", error?.response?.data?.message);
				toast.error(error?.response?.data?.message);
			} else {
				console.error("An error occurred:", error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	// ==========Handle Update========
	const updateMutation = useMutation(
		updateJosnMutationConfig(queryClient, `bookings-${currentPage}`),
	);

	const cancelFromBook = async (e: any, id: string) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await updateMutation.mutateAsync({
				url: `${process.env.NEXT_PUBLIC_API_URI}booking/cancel/${id}`,
			});

			if (response.success) {
				console.log("Success!", "Cancel successfully");
				toast.success("Cancel successfully");
				setIsLoading(false);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log("Error!", error?.response?.data?.message);
				toast.error(error?.response?.data?.message);
			} else {
				console.error("An error occurred:", error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleSearch = (query: string) => {
		setKeyword(query);
		setAllData([]);
		setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		try {
			const result = await refetch();
			if (result.data?.data) {
				if (currentPage !== previousPage && currentPage !== 1) {
					setAllData((prev) => [...prev, ...result.data.data]);
				} else {
					setAllData(result.data.data);
					setPreviousPage(currentPage);
				}
			}
		} finally {
			setIsLoading(false);
		}
	}, [refetch, currentPage, previousPage]);

	const memoizedFetchData = useMemo(() => fetchData, [fetchData]);

	useEffect(() => {
		memoizedFetchData();
	}, [memoizedFetchData, currentPage, limit, keyword]);

	return {
		data: {
			data: allData,
			totalPages: data?.totalPages || 0,
			total: data?.total || 0,
			perPage: data?.perPage || 0,
		},
		isPending: isPending || isLoading,
		currentPage,
		setCurrentPage,
		handlePageChange,
		isLoading,
		setIsLoading,
		limit,
		setLimit,
		keyword,
		setKeyword,
		handleSearch,
		handleInputChange,
		addToBook,
		cancelFromBook,
		initialState,
		setInitialState,
	};
}
