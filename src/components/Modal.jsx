import styled from "styled-components";
import { useContext, useEffect, useRef } from "react";
import { PostContext } from "../App";
import LinkPost from "./Post";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

const ModalOverLay = styled.div`
	width: 100%;
	height: 100%;
	background: #000000;
	position: fixed;
	top: 0;
	left: 0;
	opacity: ${({ modalActive }) => (modalActive ? "0.5" : "0")};
	/* transition: opacity 0.5s; */
	transition: ${({ modalActive }) => (modalActive ? "opacity 0.5s" : "opacity 0.5s")};
	@media (max-width: 1024px) {
		display: none;
	}
`;

const ModalWindow = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
	max-width: 1200px;
	width: 80%;
	max-height: 90%;
	overflow: auto;
	padding: 2rem;
	background-color: #ffffff;
	border-radius: 0.625rem;
	opacity: ${({ modalActive }) => (modalActive ? "1" : "0")};
	/* transition: ${({ modalActive }) => (modalActive ? "opacity 0.5s" : "opacity 0.5s")}; */
	transition: opacity 0.5s;

	@media (max-width: 1024px) {
		max-width: 100%;
		width: 100%;
		height: 100%;
		max-height: 100%;
		border-radius: 0;
		
		/* opacity: 1; */
		transition: opacity 0,1s;
	}
`;

const CloseButton = styled.button`
	border: none;
	border-radius: 0.3rem;
	background-color: #ffffff;
	width: 2rem;
	height: 2rem;
	position: fixed;
	top: 1rem;
	right: 1rem;
	/* opacity: 0.5; */
	z-index: 4;
	opacity: ${({ modalActive }) => (modalActive ? "0.5" : "0")};
	/* transition: opacity 0.5s; */
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

	@media (max-width: 1024px) {
		top: 0.5rem;
		right: 0.5rem;
		background-color: #ffffff;
		/* opacity: 0.5; */
		/* transition: opacity 0s; */
		/* transition: ${({ modalActive }) => (modalActive ? "opacity 0.5s" : "opacity 0s")}; */

		&:hover {
			opacity: ${({ modalActive }) => (modalActive ? "1" : "0")};
		}
	}
`;

function Modal() {
	const { searchResult, modalActive, setModalActive} = useContext(PostContext);
	const { id } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	const navigate = useNavigate();

	
	

	useEffect(()=> {
		const params = searchParams.get("modalActive");
		// setModalActive(params)
		console.log(searchParams.get("modalActive"));
	}, [searchParams])
	

	const overLayElement = useRef(null);

	const post = searchResult?.find((i) => i.id === Number(id));

	const closeModalHandler = () => {
		console.log(modalActive);

		if (!modalActive) navigate("/");
	};

	return (
		<>
			{searchResult.length && (
				<>
					<ModalOverLay
						ref={overLayElement}
						onClick={() => setSearchParams({  })}
						modalActive={modalActive}
						// onTransitionEnd={closeModalHandler}
					/>
					<CloseButton
						onClick={() => setSearchParams({  })}
						modalActive={modalActive}
						// onTransitionEnd={closeModalHandler}
					/>
					<ModalWindow modalActive={modalActive}
					 onTransitionEnd={closeModalHandler}
					 >
						<LinkPost item={post} />
					</ModalWindow>
				</>
			)}
		</>
	);
}

export default Modal;
