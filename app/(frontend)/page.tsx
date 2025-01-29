"use client";
import React from "react";
import { Button, Spin, Row, Col, Typography } from "antd";
import ExpeditionCard, { Expedition } from "../components/ExpeditionCard";
import { ExpeditionFilters } from "../components/ExpeditionFilters";
import { useExpeditions } from "./useExpeditions";
import Head from "next/head";
import { useBookings } from "../(booking)/booking/useBookings";

const { Title } = Typography;

export default function Home() {
	const {
		data,
		isPending,
		handleLoadMore,
		currentPage,
		keyword,
		handleSearch,
		handleDateFilterChange,
		priceRange,
		handlePriceRangeChange,
	} = useExpeditions();

	const { addToBook } = useBookings();

	return (
		<>
			<Head>
				<title>Expedition List</title>
			</Head>
			<div className="container mx-auto px-4 py-8">
				<Title level={2} className="mb-6">
					Expeditions
				</Title>

				<ExpeditionFilters
					onSearch={handleSearch}
					onDateChange={handleDateFilterChange}
					onPriceRangeChange={handlePriceRangeChange}
					keyword={keyword}
					priceRange={priceRange}
				/>

				<Spin spinning={isPending && data.data.length === 0}>
					<Row gutter={[16, 16]}>
						{data?.data?.map((expedition: Expedition) => (
							<Col xs={24} sm={12} lg={8} key={expedition._id}>
								<ExpeditionCard expedition={expedition} addToBook={addToBook} />
							</Col>
						))}
					</Row>
				</Spin>

				{data.totalPages > currentPage && (
					<div className="mt-8 flex justify-center">
						<Button
							onClick={handleLoadMore}
							loading={isPending}
							disabled={isPending}
							size="large"
						>
							Load More
						</Button>
					</div>
				)}
			</div>
		</>
	);
}
