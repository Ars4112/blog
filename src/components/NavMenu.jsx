import React, { useContext, useState, useRef, useEffect } from "react";
import { HeaderContext } from "../App";
import Logo from "./Logo";
import styled from "styled-components";
import arrow from "../img/arrow.svg";
import menuItems from "../menuItems";

const Nav = styled.nav`
	width: 100%;
	border-top: 1px solid #e9e9e9;
	border-bottom: 1px solid #e9e9e9;
	display: flex;
	justify-content: center;

	@media (max-width: 1024px) {
		flex-direction: column;
		justify-content: flex-start;
		width: 90%;
		height: 100vh;
		position: absolute;
		top: 0;
		left: ${({ menuIsOpen }) => (menuIsOpen ? "0" : `-100%`)};
		background-color: #ffffff;
		z-index: 1;
		border-right: 1px solid #e9e9e9;
		transition: left 0.5s;
	}
`;

const NavList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0 2rem;
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
	justify-content: center;
	align-items: start;
	max-width: 1160px;

	& + li {
		width: auto;
		margin: 0 10px;
	}

	@media (max-width: 1024px) {
		flex-direction: column;
		align-items: stretch;
		gap: 0;
	}
`;

const NavItem = styled.li`
	max-width: 150px;
	position: relative;
	& > button {
		border: none;
		background-color: transparent;
		padding: 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		padding: 1rem 0;
		cursor: pointer;
	}

	& + span {
		font-size: 0.8125rem;
		font-style: normal;
		font-weight: 400;
		line-height: 0.8125rem;
	}

	@media (max-width: 1024px) {
		border-bottom: 1px solid #e9e9e9;
		text-align: start;
		max-width: 100%;
		&:last-child {
			border-bottom: none;
		}
	}
`;

const Img = styled.img`
	margin-top: ${({ subMenuIsOpen }) => (subMenuIsOpen ? "5px" : "0")};
	transition: margin-top 0.2s;
`;

const SubMenuList = styled.ul`
	padding: 0;
	min-width: 176px;
	position: absolute;
	top: ${({ position, subMenuIsOpen }) => (subMenuIsOpen ? "0" : "-1000px")};
	left: ${({ position, subMenuIsOpen }) => (subMenuIsOpen ? "0" : "0")};
	transform: translate(-10%, 27%);
	background-color: #ffffff;
	opacity: ${({ subMenuIsOpen }) => (subMenuIsOpen ? "1" : "0")};
	transition: opacity 0.6s;

	@media (max-width: 1024px) {
		position: relative;
		top: 0;
		left: ${({ subMenuIsOpen }) => (subMenuIsOpen ? "0" : "-100%")};
		opacity: 1;
		height: ${({ subMenuIsOpen, heightList }) => (subMenuIsOpen ? `${heightList}px` : "0")};
		transform: translate(0, 0);
		overflow: hidden;
		transition: ${({ subMenuIsOpen }) => (subMenuIsOpen ? "height 1s" : "height 1s, left 0s 1s")};
	}
`;

const SubMenuItem = styled.li`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0;
	padding: 8px;

	&:not(:first-child) {
		border-top: 1px solid #e9e9e9;
	}

	&:hover span {
		opacity: 0.5;
	}

	&:hover {
		padding-left: 10px;
		transition: padding-left 0.3s;
	}
`;

const OverLay = styled.div`
	@media (max-width: 1024px) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: #ffffff;
		opacity: 0.6;
	}
`;

function NavMenu(props) {
	const { menuIsOpen, setMenuIsOpen, subMenuIsOpen, setSubMenuIsOpen, modalActive } = useContext(HeaderContext);

	
	const [heightSubMenuItem, setHeightSubMenuItem] = useState(null);
	const navListElement = useRef(null);
	const currentButtonId = useRef(null);
	const subMenuItemElement = useRef(null);

	const clickOutSideHandler = (e) => {
		if (subMenuIsOpen && !!navListElement.current && !navListElement.current.contains(e.target)) {
			setSubMenuIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", clickOutSideHandler);
		setHeightSubMenuItem(subMenuItemElement.current.offsetHeight);
		return () => document.removeEventListener("click", clickOutSideHandler);
	}, [subMenuIsOpen]);

	const openSubMenuHandler = (e, id) => {
		if (currentButtonId.current === id) {
			setSubMenuIsOpen(!subMenuIsOpen);
		} else {
			setSubMenuIsOpen(true);

			currentButtonId.current = id;
		}
	};

	const openSubMenuKeyPress = (e, id) => {
		if (e.key === "Enter") {
			e.preventDefault();
			openSubMenuHandler(e, id);
		}
	};

	const subMenuBlurHandler = (e) => {
		if (currentButtonId.current) {
			if (+e.currentTarget.id !== currentButtonId.current) setSubMenuIsOpen(false);
		}
	};
	return (
		<>
			<Nav menuIsOpen={menuIsOpen}>
				{menuIsOpen && <Logo logoMenu={true} />}

				<NavList ref={navListElement}>
					{menuItems.map((i) => {
						return (
							<NavItem key={i.id} id={i.id} subMenuIsOpen={subMenuIsOpen}>
								<button
								tabIndex={modalActive ? -1 : 0}
									id={i.id}
									onClick={(e) => openSubMenuHandler(e, i.id)}
									onKeyDown={(e) => openSubMenuKeyPress(e, i.id)}
									onFocus={subMenuBlurHandler}
								>
									<span>{i.item}</span>
									{i.arrow && (
										<Img src={arrow} alt="#" subMenuIsOpen={i.id === currentButtonId.current ? subMenuIsOpen : null} />
									)}
								</button>
								<SubMenuList
									// position={position}
									subMenuIsOpen={i.id === currentButtonId.current ? subMenuIsOpen : null}
									heightList={i.subMenu ? heightSubMenuItem * i.subMenu.length : null}
								>
									{i.subMenu?.map((j, index) => {
										return (
											<SubMenuItem
												ref={subMenuItemElement}
												key={index}
												tabIndex={i.id === currentButtonId.current && subMenuIsOpen ? 0 : -1}
											>
												<span>{j}</span>
											</SubMenuItem>
										);
									})}
								</SubMenuList>
							</NavItem>
						);
					})}
				</NavList>
			</Nav>
			{menuIsOpen && <OverLay onClick={() => setMenuIsOpen(false)} />}
		</>
	);
}

export default NavMenu;
