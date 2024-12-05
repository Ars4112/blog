import React, { useContext, useRef, useEffect, useState } from "react";
import { HeaderContext } from "../App";
import styled, { css } from "styled-components";
import logo from "../img/logo.svg";
import search from "../img/search.svg";
import menu from "../img/menu.svg";
import close from "../img/x.svg";

const LogoWrapper = styled.div`
	max-width: 1160px;
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 2rem 4rem;
	position: relative;
	${({ logoMenu }) =>
		logoMenu &&
		css`
			padding: 0;
			width: 0;
			& :nth-child(1) {
				display: none;
			}
			@media (max-width: 1024px) {
				border-bottom: 1px solid #e9e9e9;
				padding: 2rem 4rem 2rem 1rem;
				width: 100%;
				& :nth-child(1) {
					display: block;
				}
			}
		`};
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
		transform: translateY(-50%);
		left: 0;
	}
`;

const Button = styled.button`
	display: block;
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	border: none;
	background-color: transparent;
	padding: 1rem;
	cursor: pointer;
`;

const ButtonCloseMenu = styled(Button)`
	display: none;
	@media (max-width: 1024px) {
		display: block;
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
		css`
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
	const { setMenuIsOpen, menuIsOpen, modalActive } = useContext(HeaderContext);
	const widthButtonRef = useRef();
	const [widthButton, setWidthButton] = useState(0);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	return (
		<LogoWrapper logoMenu={props.logoMenu}>
			{!props.logoMenu && (
				<ButtonMenu onClick={() => setMenuIsOpen(true)} tabIndex={menuIsOpen || modalActive ? -1 : 0}>
					<img src={menu} alt="#" />
				</ButtonMenu>
			)}

			<img src={logo} alt="Logotype" />

			{!menuIsOpen || !props.logoMenu ? (
				<Button
					right={true}
					ref={widthButtonRef}
					onClick={() => setIsSearchOpen(!isSearchOpen)}
					tabIndex={menuIsOpen || modalActive ? -1 : 0}
				>
					<img src={search} alt="Поиск" />
				</Button>
			) : (
				<ButtonCloseMenu right={true} onClick={() => setMenuIsOpen(false)}>
					<img src={close} alt="Закрыть" />
				</ButtonCloseMenu>
			)}

			<InputSearch
				widthButton={widthButton}
				isSearchOpen={isSearchOpen}
				tabIndex={menuIsOpen || modalActive ? -1 : 0}
			/>
		</LogoWrapper>
	);
}

export default Logo;
