import {Equation} from "./Equation";

export interface PrintPageProps {
    equations: Equation[];
    parentHeight: number;
    showAnswers: boolean;
}