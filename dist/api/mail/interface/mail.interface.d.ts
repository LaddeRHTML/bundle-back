export interface Mail {
    readonly from: string;
    readonly to: string;
    readonly subject: string;
    readonly text: string;
}
