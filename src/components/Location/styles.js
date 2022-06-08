import styled from "styled-components";



export const GeoContainer = styled.button`
  display: flex;
  margin-left: 28%;
  padding: 4px;
  flex-direction: row;
  border-radius: 20px;
  margin-bottom : 10px;
  width : 40%;
  color: #000;
  background: #fff;
  background-size: 4% 4%;
  animation: gradient 15s ease infinite;
  justify-content: center;
  align-items: center;
  @keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
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