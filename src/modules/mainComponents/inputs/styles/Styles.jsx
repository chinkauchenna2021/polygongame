import styled from "styled-components";


export const Input = styled.input`
padding-left:10px;
letter-spacing:1.2px;
font-size:16px;
  &:focus{
    outline:none;
  };

  &::placeholder{
       font-size:17px;
       font-weight:100;

  }


`;


export const Label = styled.label`

`;

export const TextAreas = styled.textarea`
   &:focus{
    outline:none;
  }; 
`;