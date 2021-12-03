import styled from "styled-components";

export const Form = styled.form`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  h1 {
    color: #000;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }

  input {
    flex: 1;
    background: #fff;

    align-items: center;

    border-radius: 8px;
    padding: 18px 24px;
    width: 100%;
    font-size: 16px;

    border: 0;
    color: #000;

    & + input {
      margin-top: 24px;
    }

    &::placeholder {
      color: #333;
    }
  }

  svg {
    margin-right: 16px;
  }

  button {
    margin-top: 48px;
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #39b100;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-self: flex-end;
    align-items: center;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.95);
    }

    .text {
      padding: 16px 24px;
    }

    .icon {
      display: flex;
      padding: 16px 0px 16px 12px;
      background: #41c900;
      border-radius: 0 8px 8px 0;
    }
  }
`;
