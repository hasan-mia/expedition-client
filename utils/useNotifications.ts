import useNotification from "antd/es/notification/useNotification";

export function useNotifications() {
	const [api, contextHolder] = useNotification();

	const successMsg = (title: string, message: string) => {
		api.success({
			message: title,
			description: message,
		});
	};

	const errorMsg = (title: string, message: string) => {
		api.error({
			message: title,
			description: message,
		});
	};

	const warnMsg = (title: string, message: string) => {
		api.warning({
			message: title,
			description: message,
		});
	};
	const infoMsg = (title: string, message: string) => {
		api.info({
			message: title,
			description: message,
		});
	};

	return {
		contextHolder,
		successMsg,
		errorMsg,
		warnMsg,
		infoMsg,
	};
}
