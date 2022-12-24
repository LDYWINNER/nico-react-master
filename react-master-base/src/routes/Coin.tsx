import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 60px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.div`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
    padding-bottom: 50px;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

interface RouteParams {
    coinId: string;
}

interface RouteState {
    name: string;
}

function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RouteState>();
    return <Container>
        <Header>
            <Title>{state?.name || "Loading.."}</Title>
        </Header>
        {loading ? <Loader>Loading...</Loader> : (
            null
        )}
    </Container>;
};

export default Coin;