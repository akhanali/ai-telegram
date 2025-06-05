export interface Message {
    id: string;
    content: string;
    isSender: boolean;
    timestamp: number;
    isAI: boolean;
}