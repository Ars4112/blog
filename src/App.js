import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import PostsList from "./components/PostsList";
import Global from "./Global";
import styled from "styled-components";

const AppInnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: auto;
	min-height: 100vh;
	height: 100%;
`;

export const HeaderContext = React.createContext();
export const PostContext = React.createContext();

function App() {
	const [postsList, setPostsList] = useState([]);
	const [modalActive, setModalActive] = useState(false);
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const [subMenuIsOpen, setSubMenuIsOpen] = useState(false);
	const [searchInputValue, setSearchInputValue] = useState("");
	const [searchResult, setSearchResult] = useState(postsList);

	useEffect(() => {
		fetch("https://cloud.codesupply.co/endpoint/react/data.json")
			.then((res) => res.json())
			.then((json) => setPostsList(json.map((i, index) => ({ ...i, id: index }))));
	}, []);

	useEffect(() => {
		setSearchResult(postsList);
	}, [postsList]);

	const changeSearchHandler = (e) => {
		setSearchInputValue(e.target.value);

		if (e.target.value === "") {
			setSearchResult(postsList);
			return;
		}
		const result = postsList.filter((i) => {
			return i.title.toLowerCase().includes(e.target.value.toLowerCase());
		});

		setSearchResult(result);
	};

	return (
		<>
			<AppInnerContainer>
				<HeaderContext.Provider
					value={{
						setMenuIsOpen,
						menuIsOpen,
						subMenuIsOpen,
						setSubMenuIsOpen,
						modalActive,
						searchInputValue,
						changeSearchHandler,
					}}
				>
					<Header />
				</HeaderContext.Provider>

				<PostContext.Provider value={{ menuIsOpen, searchResult, modalActive, setModalActive }}>
					<PostsList />
					<Outlet />
				</PostContext.Provider>
			</AppInnerContainer>
			<Global modalActive={modalActive} menuIsOpen={menuIsOpen} />
		</>
	);
}

export default App;
