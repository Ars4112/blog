import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
body {
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  color: #000;
  width: 100%;
  height: 100%;
  
    @media (max-width: 1024px) {
      overflow-y: ${({ modalActive, menuIsOpen }) => (modalActive || menuIsOpen ? "hidden" : "auto")};
	}
}
h2 {
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.875rem; 
}
img,
video {
  display: block;
  max-width: 100%;
  height: auto;
}

textarea {
  resize: none;
}
`;

export default Global;
