import styled from "styled-components";

const ModalOverLay = styled.div`
	width: 100vw;
	height: 100vh;
	background: rgba(0000, 0000, 0000, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const ModalWindow = styled.div`
	max-width: 1000px;
	width: 80%;
	height: 90%;
	overflow-y: auto;
	background-color: #ffffff;
	border-radius: 10px;
	padding: 2rem;
	position: relative;
`;

const CloseButton = styled.button`
	border: none;
	background-color: #ffffff;
	width: 40px;
	height: 40px;
	position: absolute;
	top: -40px;
	right: -40px;
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

function Modal({ children, setActive }) {
	return (
		<>
			<ModalOverLay
				onClick={() => {
					setActive(false);
				}}
			>
				
				<ModalWindow onClick={(e) => e.stopPropagation()}>
				<CloseButton
					onClick={() => {
						setActive(false);
					}}
				/>
					{children}
				</ModalWindow>
			</ModalOverLay>
		</>
	);
}

export default Modal;
