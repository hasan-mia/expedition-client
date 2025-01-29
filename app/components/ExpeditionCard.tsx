/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { Card, Typography, Button } from "antd";

const { Text } = Typography;
export interface Expedition {
	_id: string;
	name: string;
	destination: string;
	startDate: string;
	endDate: string;
	price: number;
	availableSeats: number;
}

interface ExpeditionCardProps {
	expedition: Expedition;
	addToBook: (e: any, expeditionId: string) => void;
}

const ExpeditionCard: React.FC<ExpeditionCardProps> = ({
	expedition,
	addToBook,
}) => (
	<Card
		title={expedition.name}
		extra={<Text type="secondary">{expedition.destination}</Text>}
	>
		<p>
			<Text strong>Dates:</Text>{" "}
			{new Date(expedition.startDate).toLocaleDateString()} -{" "}
			{new Date(expedition.endDate).toLocaleDateString()}
		</p>
		<p>
			<Text strong>Price:</Text> ${expedition.price}
		</p>
		<p>
			<Text strong>Available Seats:</Text> {expedition.availableSeats}
		</p>
		<Button
			type="primary"
			disabled={expedition.availableSeats === 0}
			onClick={(e) => addToBook(e, expedition._id)}
		>
			{expedition.availableSeats === 0 ? "Fully Booked" : "Book Now"}
		</Button>
	</Card>
);

export default ExpeditionCard;
