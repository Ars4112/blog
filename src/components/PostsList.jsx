import { useContext } from "react";
import { PostContext } from "../App";
import LinkPost from "./Post";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostsListWrapper = styled.div`
	max-width: 1180px;
	width: 100%;
	flex-grow: 1;
	padding: 0 1rem;
`;

const List = styled.ul`
	list-style: none;
	margin: 0;
	margin-top: 2.5rem;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	gap: 1.5rem;
	flex: 1 0 100%;
	flex-direction: row;
	align-items: stretch;
`;

const PostItem = styled.li`
	padding: 0.625rem;
	display: flex;
	flex: 0 0 calc(33% - 25px);

	@media (max-width: 1024px) {
		flex: 0 0 calc(50% - 20px);
	}

	@media (max-width: 768px) {
		flex: 0 0 calc(100% - 0px);
	}
`;

function PostsList() {
	const { postsList, setSearchParams, modalActive, menuIsOpen } = useContext(PostContext);

	return (
		<PostsListWrapper>
			<List>
				{postsList &&
					postsList.map((i, index) => {
						return (
							<PostItem key={index} onClick={() => setSearchParams({ modalActive: true })}>
								<Link to={`/post/${i.id}`} tabIndex={modalActive || menuIsOpen ? -1 : 0}>
									<LinkPost item={{ ...i }} />
								</Link>
							</PostItem>
						);
					})}
			</List>
		</PostsListWrapper>
	);
}

export default PostsList;
