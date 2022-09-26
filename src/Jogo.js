import styled, { css } from "styled-components";

export default function Bla(props) {
    const { image, setStateStart, stateStart, functionPlay, wordVisible, stateEndGame, stateTitleEnd } = props;

    return (
        <Box_Screen>

            <img data-identifier="game-image" src={image} alt="Hangman Game" />

            <Interface>
                <Wrapper>
                    <Button data-identifier="choose-word" onClick={() =>
                        window.confirm('Deseja começar um novo jogo?')
                            ? setStateStart("stop", functionPlay())
                            : alert('Volte sempre para jogarmos mais!')}>

                        {stateStart === "start" ? "Começar o jogo" : "Outra palavra"}

                    </Button>
                </Wrapper>

                <Wrapper>
                    <Word data-identifier="word">
                        {wordVisible.map(
                            (l, index) =>
                                <LetterWord key={index} visible={stateEndGame ? stateTitleEnd : ""}>
                                    {l}
                                </LetterWord>
                        )}
                    </Word>
                </Wrapper>
            </Interface>

        </Box_Screen>
    );
};

const Box_Screen = styled.section`
    display: flex;

    img {
        width: min(50%, 24em);
    }
`;

const Interface = styled.div`
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`;

const Wrapper = styled.div`
    height: 50%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
    background-color: #21dd31;
    border: none;
    border-radius: 0.5em;
    height: 3em;
    width: 14em;

    &:active {
        background-color: #25d133;
    }

    @media (max-width:515px) {
        width: 8em;
    }
`;

const Word = styled.ul`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
`;

const LetterWord = styled.li`
    font-size: clamp(1em, 10vw, 1.5em);
    font-weight: 500;
    margin: 0.2625em;

    ${(props) => {
        switch (props.visible) {
            case "win":
                return css`
                    font-family: 'Ubuntu', sans-serif;
                    font-size: clamp(1em, 10vw, 1.5em);
                    font-weight: 500;
                    margin: 0.2625em;
                    color: #25d133;
                `;
            case "lose":
                return css`
                    font-family: 'Ubuntu', sans-serif;
                    font-size: clamp(1em, 10vw, 1.5em);
                    font-weight: 500;
                    margin: 0.2625em;
                    color: #d12525;
                `;
            default:
                return css`
                    font-family: 'Ubuntu', sans-serif;
                    font-size: clamp(1em, 10vw, 1.5em);
                    font-weight: 500;
                    margin: 0.2625em;
                `;
        };
    }};
`;
