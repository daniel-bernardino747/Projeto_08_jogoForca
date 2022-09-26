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

import Jogo from "./Jogo";
import Letras from "./Letras";
import Chute from "./Chute";
import GlobalStyle from "./GlobalStyle";

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
        changeClickState('blockLetters');
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
        setErrorsCount(0)

    }, [games]);


    if (gameWonByLetters) {
        setFinalGame(true);
        winGame();
    };

    function playGame() {
        setGames(games + 1, changeClickState('clickTrue'));

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

        } else if (condition === 'blockLetters') {
            newAlphabet = alphabet.map(letter => {
                return { ...letter, clicked: true }
            });
        }

        ;

        setAlphabet(newAlphabet);
    };

    return (
        <>
            <Jogo
                image={imageHangman}
                setStateStart={setStartGame}
                stateStart={startGame}
                functionPlay={playGame}
                wordVisible={visibleWord}
                stateEndGame={finalGame}
                stateTitleEnd={titleEndGame}
            />

            <Letras
                stateStart={startGame}
                listABC={alphabet}
                functionCheck={checkLetterInWord}
                functionClick={changeClickState}
            />

            <Chute
                stateStart={startGame}
                functionSubmit={submitAttemptWord}
                setStateAttempt={setAttemptWord}
                stateAttempt={attemptWord}

            />

            <GlobalStyle />
        </>
    );
};
