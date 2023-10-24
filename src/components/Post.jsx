import styled from "styled-components";

const Item = styled.li`
	display: flex;
	flex-direction: column;
	align-items: start;
	gap: 0.5rem;
	
	color: #929292;

	& img {
		width: 100%;
	}

	& h2 {
		color: #000000;
		text-align: start;
	}

	& p {
		text-align: start;
	}
`;

const Section = styled.span`
	color: #eb0028;
`;

const Autor = styled.span`
	color: #000000;
`;

const Dot = styled.div`
	width: 3px;
	height: 3px;
	background-color: #d7d7d7;
	border-radius: 50%;
`;

const InnerWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

function Post(props) {
	return (
		<Item>
			<img src={props.item.img} alt="#" srcSet={props.item.img_2x} />
			<Section>{props.item.tags}</Section>
			<h2>{props.item.title}</h2>
			<InnerWrapper>
				<Autor>{props.item.autor}</Autor>
				<Dot />
				<span>{props.item.date}</span>
				<Dot />
				<span>{props.item.views}</span>
			</InnerWrapper>
			<p>{props.item.text}</p>
			
		</Item>
	);
}

export default Post;
