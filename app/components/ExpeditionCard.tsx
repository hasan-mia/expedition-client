import type React from "react";
import { Card, Typography, Button, message } from "antd";
import { useAuth } from "@/lib/AuthProvider/page";

const { Text } = Typography;

interface ExpeditionProps {
	expedition: {
		_id: string;
		name: string;
		destination: string;
		startDate: string;
		endDate: string;
		price: number;
		availableSeats: number;
	};
}

const ExpeditionCard: React.FC<ExpeditionProps> = ({ expedition }) => {
	const { user } = useAuth();

	const bookExpedition = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user}`,
					},
					body: JSON.stringify({ expeditionId: expedition._id }),
				},
			);
			if (!response.ok) throw new Error("Failed to book expedition");
			message.success("Expedition booked successfully!");
			// You might want to update the UI or refetch expeditions here
		} catch (error) {
			console.error("Error booking expedition:", error);
			message.error("Failed to book expedition. Please try again.");
		}
	};

	return (
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
				onClick={bookExpedition}
				disabled={expedition.availableSeats === 0}
			>
				{expedition.availableSeats === 0 ? "Fully Booked" : "Book Now"}
			</Button>
		</Card>
	);
};

export default ExpeditionCard;
