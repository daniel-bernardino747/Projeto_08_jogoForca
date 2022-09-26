import styled, { css } from "styled-components";

export default function Letras(props) {
    const { stateStart, listABC, functionCheck, functionClick } = props;

    function Alphabet(props) {

        const alphabet = props.listLetters;

        const listLetterInAlphabet =
            alphabet.map((l) =>
                <Letter
                    data-identifier="letter"
                    key={l.id}
                    clicked={l.clicked}
                    onClick={() => functionCheck(l.letter, functionClick('equalId', l.id))}
                >
                    {l.letter}
                </Letter>);

        return (
            <>{listLetterInAlphabet}</>
        );
    };

    return (
        <Box_Keys block={stateStart}>
            <Keyboard>
                <Alphabet listLetters={listABC} />
            </Keyboard>
        </Box_Keys>
    );
};

const Box_Keys = styled.section`
    height: 6em;
    margin: 1em 0;
    width: 100%;

    display: flex;

    pointer-events: ${props => props.block === 'start' ? 'none' : 'auto'}; 

    @media (max-width:736px) {
        height: 10em;
    }

    @media (max-width:515px) {
        height: 14em;
    }

    @media (max-width:398px) {
        height: 18em;
    }

    @media (max-width:286px) {
        height: 22em;
    }
`;

const Keyboard = styled.ul`
    height: 7em;
    flex-wrap: wrap;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;


    @media (max-width:736px) {
        height: 10em;
    }

    @media (max-width:515px) {
        height: 14em;
    }

    @media (max-width:398px) {
        height: 18em;
    }

    @media (max-width:286px) {
        height: 22em;
    }
`;

const Letter = styled.li`
    background-color: #62e1fd;
    border: 0.0625em solid #12c5ed;
    border-radius: 0.2em;
    height: 3em;
    margin: 0.2625em;
    width: 3em;

    display: flex;
    align-items: center;
    justify-content: center;

    user-select: none;

    &:active {
        border: 0.0625em solid #06809b;
    }

    ${(props) => {
        switch (props.clicked) {
            case true:
                return css`
                    color: #FFFFFF;
                    background-color: #084856;
                    border-color: #042127;
                    pointer-events: none;  
                    font-family: 'Ubuntu', sans-serif;
                    font-weight: 500;
                    margin: 0.2625em; 
                `;
            case false:
                return css`
                    font-family: 'Ubuntu', sans-serif;
                    font-weight: 500;
                    margin: 0.2625em;
                `;
        };
    }};
`;