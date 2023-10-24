import React, { useContext, useRef, useEffect, useState } from "react";
import { HeaderContext } from "../App";
import styled from "styled-components";
import logo from "../img/logo.svg";
import search from "../img/search.svg";
import menu from "../img/menu.svg";
import close from "../img/x.svg";

const LogoWrapper = styled.div`
	max-width: 1160px;
	width: 100%;
	display: flex;
	justify-content: center;
	padding: ${({ logoMenu }) =>
		logoMenu ? "2rem 4rem 2rem 1rem" : "2rem 4rem"};
	position: relative;
	${({ logoMenu }) => logoMenu && `border-bottom: 1px solid #E9E9E9`}
`;

const ButtonMenu = styled.button`
	display: none;
	border: none;
	background-color: transparent;
	padding: 1rem;
	cursor: pointer;
	@media (max-width: 1024px) {
		display: block;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		left: 0;
	}
`;

const Button = styled.button`
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	border: none;
	background-color: transparent;
	padding: 1rem;
	cursor: pointer;

	@media (max-width: 1024px) {
		display: block;
		right: 0;
	}
`;

const InputSearch = styled.input`
	position: absolute;
	border: 1px solid #000000;
	width: 200px;
	height: 20px;
	top: 50%;
	transform: translateY(-50%);
	right: ${({ widthButton }) => `${widthButton}px`};
	margin: 0;
	transition: width 0.5s;

	${({ isSearchOpen }) =>
		!isSearchOpen &&
		`
		position: absolute;
	width: 1px;
	height: 1px;
	margin: -1px;
	padding: 0;
	overflow: hidden;
	border: 0;
	transition: width 0.5s;
`}
`;

function Logo(props) {
	const navMenu = useContext(HeaderContext);
	const widthButtonRef = useRef();
	const [widthButton, setWidthButton] = useState(0);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	useEffect(() => {
		!navMenu.menuIsOpen && setWidthButton(widthButtonRef.current.offsetWidth);
	}, [widthButton]);

	console.log(props.logoMenu);
	return (
		<LogoWrapper logoMenu={props.logoMenu}>
			{!props.logoMenu && (
				<ButtonMenu onClick={() => navMenu.setMenuIsOpen(true)}>
					<img src={menu} alt="#" />
				</ButtonMenu>
			)}

			<img src={logo} alt="Logotype" />

			{!navMenu.menuIsOpen ? (
				<Button
					right={true}
					ref={widthButtonRef}
					onClick={() => setIsSearchOpen(!isSearchOpen)}
				>
					<img src={search} alt="Поиск" />
				</Button>
			) : !props.logoMenu ? (
				<Button
					right={true}
					ref={widthButtonRef}
					onClick={() => setIsSearchOpen(!isSearchOpen)}
				>
					<img src={search} alt="Поиск" />
				</Button>
			) : (
				<Button right={true} onClick={() => navMenu.setMenuIsOpen(false)}>
					<img src={close} alt="Закрыть" />
				</Button>
			)}

			<InputSearch widthButton={widthButton} isSearchOpen={isSearchOpen} />
		</LogoWrapper>
	);
}

export default Logo;
