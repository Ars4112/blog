import styled from "styled-components";
import { useContext } from "react";
import { PostContext } from "../App";
import LinkPost from "./Post";
import { useParams,  useNavigate } from "react-router-dom";

const ModalOverLay = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(0000, 0000, 0000, 0.5);
	position: fixed;
	top: 0;
	left: 0;
`;
const ModalWindow = styled.div`
	max-width: 1000px;
	width: 80%;
	max-height: 90%;
	background-color: #ffffff;
	border-radius: 0.625rem;
	padding: 2rem;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
`;

const CloseButton = styled.button`
	border: none;
	border-radius: 0.3rem;
	background-color: #ffffff;
	width: 1.5rem;
	height: 1.5rem;
	position: absolute;
	top: -2.125rem;
	right: 0;
	opacity: 0.5;

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
		opacity: 1;
	}
`;

function Modal() {
	const { searchResult } = useContext(PostContext);
	const { id } = useParams();
	const navigate = useNavigate()

	const post = searchResult?.find((i) => i.id === Number(id));

	return (
		<>
			{searchResult.length && (
				<>
					<ModalWindow>
						<CloseButton onClick={()=> navigate("/")}/>
						<LinkPost item={post} />
					</ModalWindow>
					<ModalOverLay onClick={()=> navigate("/")}/>
				</>
			)}
		</>
	);
}

export default Modal;
