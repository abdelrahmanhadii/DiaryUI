export interface DiaryModel {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    image: string;
    completed: boolean;
    Notified:boolean;
}
