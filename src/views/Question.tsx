import { useEffect, useState, type JSX } from "react";
import { useGetDailyQuestions } from "../hooks/useGetDailyQuestion";
import ReactMarkdown from "react-markdown";
import Spinner from "./components/Spinner";

type Subjects = 'geral'| 'matematica' | 'linguagens' | 'ciencias-humanas' | 'ciencias-natureza'

type QuestionProps = {
    subject: Subjects
};

function Question({ subject }: QuestionProps): JSX.Element {
    const { question, questionLoaded } = useGetDailyQuestions(subject);
    const [ questionChosen, toggleQuestionChosen] = useState<boolean>(false);

    useEffect(() => {
        if (!question?.title) return;

        toggleQuestionChosen(false);

        const oldQuestion = localStorage.getItem(`${subject}-question`);
        const chosen = localStorage.getItem(`${subject}-chosen`);

        if (oldQuestion !== question?.title) {
            localStorage.setItem(`${subject}-chosen`, 'false');
            localStorage.setItem(`${subject}-question`, question.title);   
            toggleQuestionChosen(false);
        } else if (chosen === 'true') {
            toggleQuestionChosen(true);
        }
    }, [question?.title]);

    const chooseQuestion: () => void = function() {
        toggleQuestionChosen(true);
        localStorage.setItem(`${subject}-chosen`, 'true');
        if (question?.title != null) {
            localStorage.setItem(`${subject}-question`, question.title);   
        }
    }; 

    const changeQuestionBg: (isCorrect: boolean) => string = function(isCorrect) {
        if (questionChosen && isCorrect) {
            return 'bg-correct';
        } else if (questionChosen) {
            return 'bg-wrong';
        } else {
            return 'bg-highlight';
        }
    };

    return (
        <div className="p-8 text-text w-full h-full">
            {
                questionLoaded 
                    ?
                    question != null && Array.isArray(question?.alternatives)
                        ?
                        (
                            <section className="flex gap-5">
                                <div className="flex-col gap-1">
                                    <h2 className="text-2xl font-bold">{question.title}</h2>
                                    <h3>&#x2022; {question.discipline}</h3>
                                    <div className="flex flex-col gap-3 mt-3 mb-3 text-justify">
                                        <ReactMarkdown skipHtml={false}>{question.context}</ReactMarkdown>
                                    </div>

                                    <h3 className="text-justify mb-3">{question.alternativesIntroduction}</h3>

                                    <ul  className="flex flex-col gap-2 mt-3">
                                        {
                                            question.alternatives.map((alternative, index: number) => (
                                                <li key={index}>
                                                    <button onClick={chooseQuestion} className={`flex gap-2 px-5 py-2 rounded cursor-pointer transiton-colors-transform-bg ease-in duration-100 
                                                        ${!questionChosen && 'hover:bg-hover text-justify'} ${changeQuestionBg(alternative.isCorrect)}`}>
                                                        <span className="font-bold">{ alternative.letter + '.' }</span>
                                                        <div className="flex flex-col gap-3">
                                                            {
                                                                alternative.text !== null && ( <p>{alternative.text}</p> )
                                                            }
                                                            {
                                                                alternative.file !== null && ( <img src={alternative.file} alt={`alternative ${alternative.letter} image`} /> )
                                                            }
                                                        </div>
                                                    </button>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="hidden xl:inline" id="container-578a5eadeb6d1362bd6b0bf2a5fbac51"></div>
                            </section>
                        )
                        :
                        (
                            <section className="flex items-center justify-center">Não foi possível carregar a questão.</section>
                        )
                    :
                    (
                        <section className="flex h-full w-full justify-center items-center">
                            <Spinner />
                        </section>
                    )
            } 
        </div>
    ); 
}

export default Question;