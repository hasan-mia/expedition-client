/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface User {
	id: string;
	email: string;
}

interface AuthState {
	user: User | null;
	loading: boolean;
}

interface AuthContextProps extends AuthState {
	login: (response: any) => Promise<any>;
	logout: () => Promise<void>;
	setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";

const authReducer = (
	state: AuthState,
	action: { type: string; payload?: any },
): AuthState => {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload, loading: false };
		case LOGOUT:
			return { ...state, user: null, loading: false };
		default:
			return state;
	}
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const initialState: AuthState = {
		user: null,
		loading:
			typeof window !== "undefined" && !!localStorage.getItem("access-token"),
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	const login = async (response: any): Promise<any> => {
		return new Promise((resolve, reject) => {
			try {
				if (typeof window !== "undefined") {
					localStorage.setItem("access-token", response.token);
				}
				dispatch({ type: SET_USER, payload: response.user });
				resolve({
					isAuthenticated: true,
					user: response.user,
					message: "Login Successful",
				});
			} catch (error) {
				reject({ isAuthenticated: false, message: "Login Failed" });
			}
		});
	};

	const logout = (): Promise<void> => {
		return new Promise((resolve) => {
			if (typeof window !== "undefined") {
				localStorage.removeItem("access-token");
			}
			dispatch({ type: LOGOUT });
			resolve();
		});
	};

	const setUser = (user: User) => {
		dispatch({ type: SET_USER, payload: user });
	};

	const authContextValue = { ...state, login, logout, setUser };

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export { AuthProvider, useAuth };
