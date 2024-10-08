export interface User {
    id?: string;
    username: string;
    password: string;
    books: Book[];
}

export interface Book {
    id?: string;
    title: string;
    author: string;
}

export interface UsernameAndPassword {
    username: string;
    password: string;
}

// author = response.docs[0].authorName[0]
// title = response.docs[0].title