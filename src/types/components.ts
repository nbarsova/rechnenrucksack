import {Equation} from "./index";

export interface PrintPageProps {
    equations: Equation[];
    parentHeight: number;
    showAnswers: boolean;
}