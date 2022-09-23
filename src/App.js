import hangman0 from "./assets/forca0.png";
import hangman1 from "./assets/forca1.png";
import hangman2 from "./assets/forca2.png";
import hangman3 from "./assets/forca3.png";
import hangman4 from "./assets/forca4.png";
import hangman5 from "./assets/forca5.png";
import hangman6 from "./assets/forca6.png";

import palavras from "./database/palavras";
import alfabeto from "./database/alfabeto";

import { useState, useEffect } from "react";

import GlobalStyle from "./GlobalStyle";
import styled, { css } from "styled-components";

function replaceSpecialChars(str) {
    str = str.replace(/[àáâã]/, "a");
    str = str.replace(/[èéê]/, "e");
    str = str.replace(/[ìí]/, "i");
    str = str.replace(/[òóôõ]/, "o");
    str = str.replace(/[ùúûũü]/, "u");
    str = str.replace(/[ç]/, "c");

    return str.replace(/[^a-z0-9]/gi, '');
}

function sortWord() {

    const randomNumber = Math.floor(Math.random() * palavras.length);
    const newWord = palavras[randomNumber];
    const listLetters = newWord.split("");
    const listVisible = [];
    const lettersWithoutAccents = replaceSpecialChars(newWord).split("");

    listLetters.map(() => listVisible.push("_"));

    return [listLetters, listVisible, lettersWithoutAccents];
};

export default function App() {
    const [imageHangman, setImageHangman] = useState(hangman0);
    const [startGame, setStartGame] = useState("start");

    const [word, setWord] = useState([]);
    const [wordWithoutAccents, setWordWithoutAccents] = useState([]);
    const [visibleWord, setVisibleWord] = useState(word);
    const [errorsCount, setErrorsCount] = useState(0);

    const [games, setGames] = useState(0);
    const [finalGame, setFinalGame] = useState(false);
    const [titleEndGame, setTitleEndGame] = useState("");

    const [attemptWord, setAttemptWord] = useState("");

    const [alphabet, setAlphabet] = useState(alfabeto);

    const gameWonByLetters = (JSON.stringify(visibleWord) === JSON.stringify(word) && word.length > 0);

    const stopGame = () => {
        setFinalGame(true);
        setStartGame("start");
        setAttemptWord('');
        setVisibleWord(word);
        setWord([]);
    };

    const submitAttemptWord = (e) => {
        e.preventDefault();
        const listAttemptWord = attemptWord.split("");

        (JSON.stringify(word) === JSON.stringify(listAttemptWord)) ? winGame() : loseGame();
    };

    useEffect(() => {
        switch (errorsCount) {
            case 1:
                setImageHangman(hangman1);
                break;
            case 2:
                setImageHangman(hangman2);
                break;
            case 3:
                setImageHangman(hangman3);
                break;
            case 4:
                setImageHangman(hangman4);
                break;
            case 5:
                setImageHangman(hangman5);
                break;
            case 6:
                setImageHangman(hangman6);
                loseGame();
                break;
            default:
                setImageHangman(hangman0);
        };
    }, [errorsCount]);

    useEffect(() => {
        setFinalGame(false);
        setImageHangman(hangman0);

        changeClickState('clickTrue');

    }, [games]);


    if (gameWonByLetters) {
        setFinalGame(true);
        winGame();
    };

    function playGame() {
        setGames(games + 1);

        const answers = sortWord();
        const [newWord, newVisibleWord, newWordWithoutAccents] = answers;

        setWord(newWord);
        setVisibleWord(newVisibleWord);
        setWordWithoutAccents(newWordWithoutAccents);
    };

    function loseGame() {
        stopGame();
        setTitleEndGame('lose');
    };

    function winGame() {
        stopGame();
        setTitleEndGame('win');
    };

    function checkLetterInWord(letter) {

        const newVisibleWord = visibleWord.map((x) => x);
        const wordToBeHit = wordWithoutAccents;
        const chosenLetterIsInWord = wordToBeHit.includes(letter);

        const lengthWord = newVisibleWord.length;

        for (let i = 0; i < lengthWord; i++) {

            const positionLetter = wordToBeHit.indexOf(letter);
            const letterExistAtPosition = positionLetter !== -1;

            if (!chosenLetterIsInWord) {

                setErrorsCount(errorsCount + 1);

                if (JSON.stringify(visibleWord) === JSON.stringify(word)) {
                    setFinalGame("true");
                    loseGame();
                };
            };

            if (letterExistAtPosition) {

                newVisibleWord.splice(positionLetter, 1, word[positionLetter]);
                wordToBeHit.splice(positionLetter, 1, '_');
                console.log('wordToBeHit', wordToBeHit);

            };
        };
        setVisibleWord(newVisibleWord);
    };

    function changeClickState(condition, desiredComparison) {
        let newAlphabet;

        if (condition === 'equalId') {

            newAlphabet = alphabet.map(letter => {
                return letter.id === desiredComparison ? { ...letter, clicked: !letter.clicked } : letter
            });

        } else if (condition === 'clickTrue') {

            newAlphabet = alphabet.map(letter => {
                return letter.clicked === true ? { ...letter, clicked: !letter.clicked } : letter
            });

        };

        setAlphabet(newAlphabet);
    };

    function Alphabet(props) {

        const alphabet = props.listLetters;

        const listLetterInAlphabet =
            alphabet.map((l) =>
                <Letter
                    key={l.id}
                    clicked={l.clicked}
                    onClick={() => checkLetterInWord(l.letter, changeClickState('equalId', l.id))}
                >
                    {l.letter}
                </Letter>);

        return (
            <>{listLetterInAlphabet}</>
        );
    };

    return (
        <>
            <Box_Screen>

                <img src={imageHangman} alt="Hangman Game" />

                <Interface>
                    <Wrapper>
                        <Button onClick={() =>
                            window.confirm('Deseja começar um novo jogo?')
                                ? setStartGame("stop", playGame())
                                : alert('Volte sempre para jogarmos mais!')}>

                            {startGame === "start" ? "Começar o jogo" : "Outra palavra"}

                        </Button>
                    </Wrapper>

                    <Wrapper>
                        <Word>
                            {visibleWord.map(
                                (l, index) =>
                                    <LetterWord key={index} visible={finalGame ? titleEndGame : ""}>
                                        {l}
                                    </LetterWord>
                            )}
                        </Word>
                    </Wrapper>
                </Interface>

            </Box_Screen>

            <Box_Keys block={startGame}>
                <Keyboard>
                    <Alphabet listLetters={alphabet} />
                </Keyboard>
            </Box_Keys>

            <Box_Attempt block={startGame}>
                <Form onSubmit={submitAttemptWord}>

                    <Text>Eu já sei a palavra!</Text>
                    <Attempt
                        placeholder="tenta a sorte"
                        onChange={(e) => setAttemptWord(e.target.value)}
                        value={attemptWord}>
                    </Attempt>
                    <Submit value="Enviar"></Submit>

                </Form>
            </Box_Attempt>

            <GlobalStyle />
        </>
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

const Text = styled.p`
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
    margin: 0.2625em;
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
                `

        };
    }};
`;


const Box_Attempt = styled.section`
    height: 3em;
    display: flex;

    pointer-events: ${props => props.block === 'start' ? 'none' : 'auto'}; 
`;

const Form = styled.form`
    flex-wrap: wrap;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    * {
        margin: 0 0.5em;
    }
`;

const Attempt = styled.input.attrs({ type: "text" })`
    &:focus-visible {
            outline: 0px;
        }
`;

const Submit = styled.input.attrs({ type: "submit" })`
    border-radius: 0.2em;
    border: none;
    background-color: #9a9a9a;
    height: 1.5em;
`;