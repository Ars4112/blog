import styled from "styled-components";
import {useNavigate} from 'react-router-dom';

const Error = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100wh;

    & h2{
        font-size: 3rem;
    }
    & p {
        font-size: 2rem;
    }
`

export const Error404 = () => {
    const navigate = useNavigate()
    return (
        <Error>
           <h2>Error404</h2> 
           <p>Page ot Found</p>
           <button onClick={()=> navigate(-1)}>Вернуться назад</button>
        </Error>
    );
};