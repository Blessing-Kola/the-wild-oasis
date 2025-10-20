import styled, { css } from "styled-components";

// const test = css`
//   text-align: center;
// `;

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 30px;
      font-weight: 600;
    `}

  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 20px;
      font-weight: 500;
    `}

  ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 10px;
      font-weight: 400;
    `}

  line-height: 1.5;
  background-color: var(--color-grey-0);
`;

export default Heading;
