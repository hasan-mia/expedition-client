/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
	createJsonMutationConfig,
	deleteMutationConfig,
	MutationParameters,
	updateJosnMutationConfig,
	useGet,
} from "@/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useExpeditions() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [limit, setLimit] = useState(3);
	const [previousPage, setPreviousPage] = useState(1);
	const [keyword, setKeyword] = useState<string | null>(null);
	const [allData, setAllData] = useState<any[]>([]);
	const [dateFilter, setDateFilter] = useState<Date | null>(null);
	const [priceRange, setPriceRange] = useState<{
		min: number | null;
		max: number | null;
	}>({ min: null, max: null });

	const { data, isPending, refetch } = useGet(
		`${
			process.env.NEXT_PUBLIC_API_URI
		}expedition/all?page=${currentPage}&limit=${encodeURIComponent(
			limit,
		)}&keyword=${encodeURIComponent(keyword || "")}&date=${
			dateFilter ? dateFilter.toISOString() : ""
		}&minPrice=${priceRange.min || ""}&maxPrice=${priceRange.max || ""}`,
		`expeditions-${currentPage}-${dateFilter?.toISOString() || ""}-${
			keyword || ""
		}-${priceRange.min}-${priceRange.max}`,
	);

	// initial state
	const [initialState, setInitialState] = useState({
		name: "",
		destination: "",
		startDate: "",
		endDate: "",
		price: 0,
		availableSeats: 0,
		totalSeats: 0,
	});

	// handlele input data
	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setInitialState({
			...initialState,
			[name]: value,
		});
	};

	// ==========Handle Create========
	const createMutation = useMutation<any, Error, MutationParameters>(
		createJsonMutationConfig(
			queryClient,
			`expeditions-${currentPage}-${dateFilter?.toISOString() || ""}-${
				keyword || ""
			}-${priceRange.min}-${priceRange.max}`,
		),
	);

	const onCreateItem = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await createMutation.mutateAsync({
				url: `${process.env.NEXT_PUBLIC_API_URI}expedition/create`,
				data: initialState,
			});

			if (response) {
				console.log("Success!", "expedition added successfully");
				setIsLoading(false);
				router.push("/dashboard");
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log("Error!", error?.response?.data?.message);
			} else {
				console.error("An error occurred:", error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	// ==========Handle Update========
	const updateMutation = useMutation(
		updateJosnMutationConfig(
			queryClient,
			`expeditions-${currentPage}-${dateFilter?.toISOString() || ""}-${
				keyword || ""
			}-${priceRange.min}-${priceRange.max}`,
		),
	);

	const onUpdateItem = async (e: any, id: string) => {
		e.preventDefault();
		setIsLoading(true);

		const updateData = {
			...initialState,
		};
		console.log(updateData);
		try {
			const response = await updateMutation.mutateAsync({
				url: `${process.env.NEXT_PUBLIC_API_URI}expedition/update/${id}`,
				data: updateData,
			});

			if (response.success) {
				console.log("Success!", "Product added successfully");
				setIsLoading(false);
				router.push("/dashboard");
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log("Error!", error?.response?.data?.message);
			} else {
				console.error("An error occurred:", error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	// ==========Handle Delete========
	const deletePostMutation = useMutation(
		deleteMutationConfig(
			queryClient,
			`expeditions-${currentPage}-${dateFilter?.toISOString() || ""}-${
				keyword || ""
			}-${priceRange.min}-${priceRange.max}`,
		),
	);
	const onDeleteItem = async (id: string) => {
		try {
			const response = await deletePostMutation.mutateAsync(
				`${process.env.NEXT_PUBLIC_API_URI}expedition/update/${id}`,
			);
			if (response) {
				console.log("Success!", "Product added successfully");
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log("Error!", error?.response?.data?.message);
			} else {
				console.error("An error occurred:", error);
			}
		}
	};

	const handlePriceRangeChange = (min: number | null, max: number | null) => {
		setPriceRange({ min, max });
		setAllData([]);
		setCurrentPage(1);
	};

	const handleSearch = (query: string) => {
		setKeyword(query);
		setAllData([]);
		setCurrentPage(1);
	};

	const handleDateFilterChange = (date: Date | null) => {
		setDateFilter(date);
		setAllData([]);
		setCurrentPage(1);
	};

	const handleLoadMore = () => {
		setCurrentPage((prev) => prev + 1);
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
	}, [memoizedFetchData, currentPage, limit, keyword, dateFilter, priceRange]);

	return {
		data: {
			data: allData,
			totalPages: data?.pagination?.totalPages || 0,
			total: data?.pagination?.total || 0,
			perPage: data?.pagination?.perPage || 0,
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
		handleLoadMore,
		handleSearch,
		dateFilter,
		handleDateFilterChange,
		priceRange,
		handlePriceRangeChange,
		handleInputChange,
		onCreateItem,
		onUpdateItem,
		onDeleteItem,
		initialState,
		setInitialState,
	};
}
