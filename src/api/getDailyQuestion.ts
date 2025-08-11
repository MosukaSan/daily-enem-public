import axios from "axios";
import type { QuestionObject } from "../types/questionType";

export async function getDailyQuestions(subject: string): Promise<QuestionObject>  {
    try {
        const response = await axios.get('http://localhost:3000/questions/getDailyQuestion', {
            params: {
                subject: subject,
            }
        });
        const data: QuestionObject = await response.data;
        return data;
    } catch (err) {
        console.log('[Error] ', err)
        return null
    }
}
