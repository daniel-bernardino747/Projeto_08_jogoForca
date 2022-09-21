import hangman0 from "./assets/forca0.png";
import hangman1 from "./assets/forca1.png";
import hangman2 from "./assets/forca2.png";
import hangman3 from "./assets/forca3.png";
import hangman4 from "./assets/forca4.png";
import hangman5 from "./assets/forca5.png";
import hangman6 from "./assets/forca6.png";
import palavras from "./palavras";

import { useState } from "react";

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
    const answer = window.confirm('Deseja começar um novo jogo?');

    if (!answer) {
        return
    }

    const randomNumber = Math.floor(Math.random() * palavras.length);
    const newWord = palavras[randomNumber];
    const listLetters = newWord.split("");
    const listVisible = [];
    const lettersWithoutAccents = replaceSpecialChars(newWord).split("");

    listLetters.map(() => listVisible.push("_"));

    return [listLetters, listVisible, lettersWithoutAccents];
}

export default function App() {
    const [imageHangman, setImageHangman] = useState(hangman0);
    const [startGame, setStartGame] = useState("c-main__after-start");

    const [word, setWord] = useState([])
    const [wordWithoutAccents, setWordWithoutAccents] = useState([])
    const [visibleWord, setVisibleWord] = useState(word);
    const [errorsCount, setErrorsCount] = useState(0);

    const [attemptWord, setAttemptWord] = useState("");

    const [alphabet, setAlphabet] = useState([
        { id: 1, letter: "a", clicked: false }, { id: 2, letter: "b", clicked: false },
        { id: 3, letter: "c", clicked: false }, { id: 4, letter: "d", clicked: false },
        { id: 5, letter: "e", clicked: false }, { id: 6, letter: "f", clicked: false },
        { id: 7, letter: "g", clicked: false }, { id: 8, letter: "h", clicked: false },
        { id: 9, letter: "i", clicked: false }, { id: 10, letter: "j", clicked: false },
        { id: 11, letter: "k", clicked: false }, { id: 12, letter: "l", clicked: false },
        { id: 13, letter: "m", clicked: false }, { id: 14, letter: "n", clicked: false },
        { id: 15, letter: "o", clicked: false }, { id: 16, letter: "p", clicked: false },
        { id: 17, letter: "q", clicked: false }, { id: 18, letter: "r", clicked: false },
        { id: 19, letter: "s", clicked: false }, { id: 20, letter: "t", clicked: false },
        { id: 21, letter: "u", clicked: false }, { id: 22, letter: "v", clicked: false },
        { id: 23, letter: "w", clicked: false }, { id: 24, letter: "x", clicked: false },
        { id: 25, letter: "y", clicked: false }, { id: 26, letter: "z", clicked: false }]);

    console.log('attempt:', attemptWord)
    console.log("word:", word);
    /* console.log("visible word:", visibleWord);
    console.log('word without accents:', wordWithoutAccents) */

    const completeWord = (JSON.stringify(visibleWord) == JSON.stringify(word));

    /* console.log(completeWord);
    console.log(errorsCount); */

    if (completeWord && word.length > 0) {
        console.log("TÁ PRONTO");
    }

    if (errorsCount === 6) {
        console.log('PERDEU');
    }

    function playGame() {
        const answers = sortWord();

        setWord(answers[0]);
        setVisibleWord(answers[1]);
        setWordWithoutAccents(answers[2]);

    }

    function checkLetterInWord(letter) {

        const newWord = wordWithoutAccents;
        const newVisibleWord = visibleWord.map((x) => x);
        const lengthWord = newVisibleWord.length;
        const bla = newWord.includes(letter);
        let inWord = undefined;

        for (let i = 0; i < lengthWord; i++) {
            const positionLetter = newWord.indexOf(letter);
            inWord = positionLetter !== -1;

            if (!bla) {
                setErrorsCount(errorsCount + 1);
                changeImage();
                return console.log('NÃO TEM ESSA LETRA', errorsCount);
            }

            if (inWord) {
                newVisibleWord.splice(positionLetter, 1, word[positionLetter]);
                newWord.splice(positionLetter, 1, '_');
                console.log('i:', i)
            }
        }
        setVisibleWord(newVisibleWord);
    }

    const attemptWorda = (e) => {
        e.preventDefault();
        const listAttemptWord = attemptWord.split("");

        if ((JSON.stringify(word) === JSON.stringify(listAttemptWord))) {
            console.log('AS PALAVRAS SÃO IGUAIS')
        }
    };

    function changeImage() {
        switch (errorsCount) {
            case 0:
                setImageHangman(hangman1);
                break;
            case 1:
                setImageHangman(hangman2);
                break;
            case 2:
                setImageHangman(hangman3);
                break;
            case 3:
                setImageHangman(hangman4);
                break;
            case 4:
                setImageHangman(hangman5);
                break;
            case 5:
                setImageHangman(hangman6);
                break;
            default:
                setImageHangman(hangman0);
        }
    }

    function keyPress(id) {
        const newAlpha = alphabet.map(letter => {
            return letter.id === id ? { ...letter, clicked: !letter.clicked } : letter
        })

        setAlphabet(newAlpha);
    }



    function Alphabet(props) {

        const alphabet = props.abc;

        const listLetterInAlphabet =
            alphabet.map((l) =>
                <li key={l.id}
                    className={l.clicked ? `u-block u-all-center u-display-flex` : `u-all-center u-display-flex`}
                    onClick={() => checkLetterInWord(l.letter, keyPress(l.id))}
                >{l.letter}</li>);

        return (
            <>{listLetterInAlphabet}</>
        );
    };

    return (
        <main className={startGame}>

            <section className="c-screen u-display-flex">

                <img src={imageHangman} alt="Hangman Game" />

                <div className="c-screen__box-zone u-display-flex">
                    <div className="u-all-center u-display-flex">

                        <button
                            className="c-screen__button"
                            onClick={() => setStartGame("c-main__before-start", playGame())}
                        >
                            Sortear palavra
                        </button>

                    </div>

                    <div className="u-all-center u-display-flex">
                        <ul className="c-screen__word u-all-center u-display-flex">

                            {visibleWord.map((l) => <li>{l}</li>)}

                        </ul>
                    </div>
                </div>

            </section>

            <section className="c-keyboard u-display-flex">
                <ul className="c-keyboard__key u-all-center u-display-flex">

                    <Alphabet abc={alphabet} />

                </ul>
            </section>

            <section className="c-attempt u-display-flex">
                <form onSubmit={attemptWorda} className="c-attempt__form u-all-center u-display-flex">

                    <label>Eu já sei a palavra!</label>

                    <input type="text" placeholder="tenta a sorte" onChange={(e) => setAttemptWord(e.target.value)}></input>

                    <input type="submit" value="Enviar"></input>

                </form>
            </section>

        </main>
    );
};