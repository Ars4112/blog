import React, { useContext } from "react";
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

	@media (max-width: 768px) {
	}
`;

const NavList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0 2rem;
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
	justify-content: start;
	align-items: center;
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

	&:hover img {
		margin-top: 5px;
		transition: margin-top 0.2s;
	}

	&:hover ul {
		list-style: none;
		position: absolute;
		top: 50px;
		left: 0;
		margin: 0;
		padding: 10px 20px;
		background-color: #ffffff;
		border: 1px solid #e9e9e9;
		opacity: 1;
		transition: opacity 0.3s;
		z-index: 1;
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

const SubMenuList = styled.ul`
	position: absolute;
	top: -1000%;
	opacity: 0;
`;

const SubMenuItem = styled.li`
	min-width: 176px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #e9e9e9;
	border-bottom: ${({ border }) => (border ? "none" : "1px solid #E9E9E9")};
	margin: 0;
	padding: 8px 0;

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
	const menu = useContext(HeaderContext);

	return (
		<>
			<Nav menuIsOpen={menu.menuIsOpen}>
				{menu.menuIsOpen && <Logo logoMenu={true} />}

				<NavList>
					{menuItems.map((i) => {
						return (
							<NavItem key={i.id}>
								<button>
									<span>{i.item}</span>
									{i.arrow && <img src={arrow} alt="#" />}
								</button>
								{i.arrow && (
									<SubMenuList>
										{i.subMenu.map((j, index) => {
											return (
												<SubMenuItem
													key={index}
													border={i.subMenu.length - 1 === index ? true : false}
												>
													<span>{j}</span>
												</SubMenuItem>
											);
										})}
									</SubMenuList>
								)}
							</NavItem>
						);
					})}
				</NavList>
			</Nav>
			{menu.menuIsOpen && <OverLay onClick={() => menu.setMenuIsOpen(false)} />}
		</>
	);
}

export default NavMenu;
