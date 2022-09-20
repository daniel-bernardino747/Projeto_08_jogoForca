import hangman0 from "./assets/forca0.png";
import hangman1 from "./assets/forca1.png";
import hangman2 from "./assets/forca2.png";
import hangman3 from "./assets/forca3.png";
import hangman4 from "./assets/forca4.png";
import hangman5 from "./assets/forca5.png";
import hangman6 from "./assets/forca6.png";
import palavras from "./palavras";

import { useState } from "react";

export default function App() {

    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const word = ["e", "_", "e", "_", "_", "_", "_", "e"];
    const [imageHangman, setImageHangman] = useState(hangman0);
    const [startGame, setStartGame] = useState("c-main__start")

    return (
        <main className={startGame}>

            <section className="c-screen u-display-flex">

                <img src={imageHangman} alt="Hangman Game" />

                <div className="c-screen__box-zone u-display-flex">
                    <div className="u-all-center u-display-flex">

                        <button className="c-screen__button">Escolher palavra</button>

                    </div>

                    <div className="u-all-center u-display-flex">
                        <ul className="c-screen__word u-all-center u-display-flex">

                            {word.map((l) => <li>{l}</li>)}

                        </ul>
                    </div>
                </div>

            </section>

            <section className="c-keyboard u-display-flex">
                <ul className="c-keyboard__key u-all-center u-display-flex">

                    {alphabet.map((l) => <li className="u-all-center u-display-flex">{l}</li>)}

                </ul>
            </section>

            <section className="c-attempt u-display-flex">
                <form className="c-attempt__form u-all-center u-display-flex">

                    <label>Eu já sei a palavra!</label>

                    <input type="text" placeholder="tenta a sorte"></input>

                    <input type="submit" value="Enviar"></input>

                </form>
            </section>

        </main>
    );
};