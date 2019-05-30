export interface IWorkflow {
    workflowSteps: IWorkflowStep[]
}

interface IWorkflowStep {
    stepName: string,
    assignees: string[],
    isEmailRequired: boolean,
    emailMessage: string
}