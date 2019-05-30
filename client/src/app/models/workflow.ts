interface IWorkflowStep {
    seqNum:number;
    stepName: string,
    stepCode:string,
    assignees: string[],
    isEmailRequired: boolean,
    emailMessage: string
}