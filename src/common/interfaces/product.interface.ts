export interface Characteristic {
    group: string;
    characteristics: {
        name: string;
        value: string;
    }[];
}
