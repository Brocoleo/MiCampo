import styled from "styled-components";



export const GeoContainer = styled.button`
  display: flex;
  cursor: pointer;
  margin-left: 28%;
  padding: 4px;
  flex-direction: row;
  border-radius: 20px;
  margin-bottom : 10px;
  border: 3px solid #F3F1F5;
  width : 40%;
  color: #000;
  background: #fff;
  justify-content: center;
  align-items: center;
  &:hover {
    color: #333333;
  background: #E5E5E5;
  }
  @media only screen and (max-width: 768px) {
    width: 72%;
    margin-top: 3%;
    margin-bottom: 3%;
    margin-left: 15%;
  }
`;
export const InfoGeo = styled.img`
  width: 36px;
  height: 26px;
  @media (max-width: 1400px) {
    width: 36px;
    height: 26px;
    padding: 2px;
  }
`;
export const LabelGeo = styled.span`
  display: flex;
  font-family: 'Tiro Kannada', serif;
  font-family: 'Titillium Web', sans-serif;
  flex-direction: column;
  padding: 3px;
  font-weight: 700;
  & span {
    font-size: 13px;
    text-transform: capitalize;
  }
  @media (max-width: 1400px) {
    font-size: 16px;
    padding: 2px;
  }
`;