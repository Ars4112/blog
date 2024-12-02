import React, { useRef, useState, useEffect, useContext } from "react";
import { HeaderContext } from "../App";
import styled from "styled-components";
import NavMenu from "./NavMenu";
import Logo from "./Logo";

const HeaderWrapper = styled.header`
	width: 100%;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: sticky;
	top: ${({ scroll, scrollPos }) => (scroll ? `-${scrollPos}px` : "0")};
	transition: top 0.5s;

	@media (max-width: 1024px) {
		position: static;
	}
`;

function Header(props) {
	const { setSubMenuIsOpen } = useContext(HeaderContext);
	const headerBlock = useRef();

	const [heightElem, setheightElem] = useState(0);
	const [scrolling, setScrolling] = useState(false);
	const [scrollPos, setScrollPos] = useState(0);

	useEffect(() => {
		setheightElem(headerBlock.current.offsetHeight);
	}, [headerBlock]);

	const scrollHeader = () => {
		const currentScrollpos = window.scrollY;

		if (heightElem > 200) {
			if (currentScrollpos > heightElem) {
				setScrolling(true);
				setScrollPos(heightElem);
			} else {
				setScrolling(false);
			}
		} else {
			if (currentScrollpos > 200) {
				setScrolling(true);
				setScrollPos(200);
				setSubMenuIsOpen(false);
			} else {
				setScrolling(false);
			}
		}
	};

	window.onscroll = scrollHeader;

	return (
		<HeaderWrapper scroll={scrolling} scrollPos={scrollPos} ref={headerBlock}>
			<Logo />
			<NavMenu />
		</HeaderWrapper>
	);
}

export default Header;
