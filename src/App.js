import React, { useState, useEffect } from "react";
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

function App() {
	const [postsList, setPostsList] = useState([]);
	const [modalActive, setModalActive] = useState(false);
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const [subMenuIsOpen, setSubMenuIsOpen] = useState(false);
	const [post, setPost] = useState();

	const setModal = (i) => {
		setModalActive(true);
		setPost(i);
	};

	useEffect(() => {
		fetch("https://cloud.codesupply.co/endpoint/react/data.json")
			.then((res) => res.json())
			.then((json) => setPostsList(json));
	}, []);

	return (
		<>
			<AppInnerContainer>
				<HeaderContext.Provider
					value={{ setMenuIsOpen, menuIsOpen, subMenuIsOpen,  setSubMenuIsOpen}}
				>
					<Header />
				</HeaderContext.Provider>
				<PostsList
					postsList={postsList}
					setModal={setModal}
					setActive={setModalActive}
					modalActive={modalActive}
					post={post}
				/>
			</AppInnerContainer>
			<Global modalActive={modalActive} menuIsOpen={menuIsOpen} />
		</>
	);
}

export default App;
