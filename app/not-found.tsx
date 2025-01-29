"use client";

import { Button, Result } from "antd";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
	return (
		<div className="min-h-screen min-w-[100vw] flex justify-center items-center">
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={
					<Link href="/">
						<Button type="primary" size="large">
							Back Home
						</Button>
					</Link>
				}
			/>
		</div>
	);
};

export default NotFoundPage;
