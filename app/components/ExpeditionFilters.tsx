import React from "react";
import { Input, DatePicker, Space, InputNumber } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

const { Search } = Input;

interface ExpeditionFiltersProps {
	onSearch: (query: string) => void;
	onDateChange: (date: Date | null) => void;
	onPriceRangeChange: (min: number | null, max: number | null) => void;
	keyword: string | null;
	priceRange: {
		min: number | null;
		max: number | null;
	};
}

export function ExpeditionFilters({
	onSearch,
	onDateChange,
	onPriceRangeChange,
	keyword,
	priceRange,
}: ExpeditionFiltersProps) {
	const handleDateChange = (date: Dayjs | null) => {
		onDateChange(date ? date.toDate() : null);
	};

	return (
		<Space direction="horizontal" size="middle" className="w-full mb-6">
			<Search
				placeholder="Search expeditions..."
				allowClear
				enterButton={<SearchOutlined />}
				size="large"
				value={keyword || ""}
				onChange={(e) => onSearch(e.target.value)}
				style={{ width: 300 }}
			/>
			<DatePicker
				size="large"
				onChange={handleDateChange}
				placeholder="Filter by date"
			/>
			<Space>
				<InputNumber
					size="large"
					placeholder="Min price"
					value={priceRange.min}
					onChange={(value) => onPriceRangeChange(value, priceRange.max)}
					min={0}
				/>
				<span>-</span>
				<InputNumber
					size="large"
					placeholder="Max price"
					value={priceRange.max}
					onChange={(value) => onPriceRangeChange(priceRange.min, value)}
					min={priceRange.min || 0}
				/>
			</Space>
		</Space>
	);
}
