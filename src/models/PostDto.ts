export interface PostDto {
    id: number;
    title: string;
    content: string;
    imagePath?: string;        // относительный URL, например "uploads/…"
    authorUsername: string;
    createdAt: string;         // ISO-строка
    updatedAt?: string | null; // ISO-строка или null
}