import styled from "styled-components";
import { useContext } from "react";
import { PostContext } from "../App";
import LinkPost from "./Post";
import { useParams, useNavigate } from "react-router-dom";

const ModalOverLay = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(0000, 0000, 0000, 0.5);
	position: fixed;
	top: 0;
	left: 0;
`;

const ModalWindow = styled.div`
	max-width: 1200px;
	width: 80%;
	max-height: 90%;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
	height: auto;
	background-color: #ffffff;
	border-radius: 0.625rem;
	padding: 2rem;
	overflow: auto;

	@media (max-width: 1024px) {
		max-width: 100%;
		width: 100%;
		height: 100%;
		max-height: 100%;
		border-radius: 0;
	}
`;

const CloseButton = styled.button`
	border: none;
	border-radius: 0.3rem;
	background-color: #d5d4d4;
	width: 2rem;
	height: 2rem;
	position: fixed;
	top: 1rem;
	right: 1rem;

	z-index: 4;

	cursor: pointer;

	&::before {
		content: "";
		width: 100%;
		height: 3px;
		background-color: #000000;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		transform: rotate(45deg);
		left: 0;
	}

	&::after {
		content: "";
		width: 100%;
		height: 3px;
		background-color: #000000;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		transform: rotate(-45deg);
		left: 0;
	}

	&:hover {
		background-color: #ffffff;
	}

	@media (max-width: 1024px) {
		top: 0.5rem;
		right: 0.5rem;
		background-color: #ffffff;
		opacity: 0.5;

		&:hover {
			opacity: 1;
		}
	}
`;

function Modal() {
	const { searchResult } = useContext(PostContext);
	const { id } = useParams();
	const navigate = useNavigate();

	const post = searchResult?.find((i) => i.id === Number(id));

	return (
		<>
			{searchResult.length && (
				<>
					<CloseButton onClick={() => navigate("/")} />
					<ModalWindow>
						<LinkPost item={post} />
					</ModalWindow>
					<ModalOverLay onClick={() => navigate("/")} />
				</>
			)}
		</>
	);
}

export default Modal;
