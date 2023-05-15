import styled from "styled-components";

export const BodyContainer = styled.div`
   width:100%;
   height:100%;
   display:flex;
   justify-content:center;
`;
export const TableContainer = styled.table`
border:1px solid orange;
border-collapse:collapse;

tbody{
   border:1px solid orange;
   border-collapse:collapse;
}
tr{
   border:1px solid orange;
   border-collapse:collapse;
}
thead{
   border:1px solid orange;
   border-collapse:collapse;
}
th{
   border:1px solid orange;
   border-collapse:collapse;
}
td{
   border:1px solid orange;
   border-collapse:collapse;
}
@media(max-width:800px){
   width:80%;
}
`;


export const ScrollDesign = styled.div`
&::-webkit-scrollbar {
  width: 3px;
}
&::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 1px;
}

&::-webkit-scrollbar-thumb {
  background: orange;
  border-radius: 8px;
}

@media(min-width:800px){
&::-webkit-scrollbar {
  width: 4px;
}

}

`;