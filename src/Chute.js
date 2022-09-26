import styled from "styled-components";

export default function Bli(props) {
    const { stateStart, functionSubmit, setStateAttempt, stateAttempt } = props;

    return (
        <Box_Attempt block={stateStart}>
            <Form onSubmit={functionSubmit}>

                <Text>Eu já sei a palavra!</Text>
                <Attempt
                    data-identifier="type-guess"
                    placeholder="tenta a sorte"
                    onChange={(e) => setStateAttempt(e.target.value)}
                    value={stateAttempt}>
                </Attempt>
                <Submit data-identifier="guess-button" value="Chutar"></Submit>

            </Form>
        </Box_Attempt>
    );
};

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

const Text = styled.p`
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
    margin: 0.2625em;
`;