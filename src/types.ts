export type Book = {
    id: string,
    title: string,
    author: string[],
    pageCount: number,
    // yearPublished: number,
    // category: string[]
}

export type BookEntry = {
    // the id is how book entries are connected w books.
    // used an indexed access type 
    id: Book['id'], 
    status: "current" | "finished" | "tbr", // this is called a 'literal type'!
    pagesRead: number,
    userRating: 1 | 2 | 3 | 4 | 5, // literal type
}