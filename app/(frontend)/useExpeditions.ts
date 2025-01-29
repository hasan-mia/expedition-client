/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGet } from "@/config/api";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useExpeditions() {
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
	};
}
