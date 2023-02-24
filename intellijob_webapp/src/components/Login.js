import styled from "styled-components"

const Login = (props) => {
    return (
        <Wrapper>
            <Navbar>
                <a href="/">
                    <img src="/images/brand_logo.png" alt="" />
                </a>
                <div>
                    <Join>Join Now</Join>
                    <Sign>Sign In</Sign>
                </div>
            </Navbar>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  padding: 0px;
`;

const Navbar = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  
  /* & > a {
    width: 150px;
    height: 34px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  } */

  & > a > img {
    max-width: 200px;
  }
`;

const Join = styled.a`
  font-size: 18px;
  padding: 10px 10px;
  text-decoration: none;
  border-radius: 4px;
  color: white;
  margin-right: 12px;
  transition-duration: 500ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: #FF5733;
    text-decoration: none;
    transition-duration: 500ms;
  }
`;

const Sign = styled.a`
    box-shadow: inset 0 0 0 1px #FF5733;
    color: #FF5733;
    border-radius: 24px;
    transition-duration: 170ms;
    font-size: 18px;
    font-weight: 500;
    line-height: 40px;
    padding: 12px 30px;
    transition-duration: 500ms;

  &:hover {
    padding: 12px 60px;
    text-decoration: none;
    transition-duration: 500ms;
  }
`

export default Login;