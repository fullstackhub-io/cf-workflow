export interface IPageWorkflow {
    _id: string,
    pageTitle: string,
    pageUrl: string,
    currWorkflowStep: IWorkflowStep, //seqNum will help to find the previous and next step  
    comment: IComment
}

export interface IComment {
    _id: string,
    category: string,  //TODO: Create new Admin form for Category Management
    contentElement: string,  //TODO: Create new Admin form for Content Element Management
    location: string,
    comment: string,
    commentingUser:string,
    dateAdded:Date,
    dateUpdated:Date
}