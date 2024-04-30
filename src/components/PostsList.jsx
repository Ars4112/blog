import LinkPost from "./Post";
import Modal from "./Modal";

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
	margin-top: 3rem;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	gap: 40px;
	flex: 1 0 100%;
	flex-direction: row;
	align-items: stretch;
`;

const PostItem = styled.li`
	padding: 0;
	display: flex;
	flex: 0 0 calc(33% - 25px);

	@media (max-width: 1024px) {
		flex: 0 0 calc(50% - 20px);
	}

	@media (max-width: 768px) {
		flex: 0 0 calc(100% - 0px);
	}
`;

function PostsList(props) {
	return (
		<PostsListWrapper>
			<List>
				{props.postsList &&
					props.postsList.map((i, index) => {
						return (
							<PostItem key={index} onClick={() => props.setModal(i)}>
								<LinkPost item={{ ...i }} />
							</PostItem>
						);
					})}
			</List>
			{props.modalActive && (
				<Modal
					setActive={props.setActive}
				
				>
					<LinkPost item={props.post} />
				</Modal>
			)}
		</PostsListWrapper>
	);
}

export default PostsList;
