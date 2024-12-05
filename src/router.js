import { Navigate, createBrowserRouter } from "react-router-dom";
import { Error404 } from "./components/Error404";
import App from "./App";
import Modal from "./components/Modal";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error404 />,
		children: [
			{
				path: "/post/:id",
				element: <Modal />,
			},
		],
	},
]);
