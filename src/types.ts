export type Book = {
    id: string,
    title: string,
    authors: string[],
    publisher: string,
    pageCount: number,
    publishedDate: string
    // category: string[]
}

export type BookEntryData = {
    status: string, //"current" | "finished" | "tbr", // this is called a 'literal type'!
    pagesRead: number,
    userRating: number | null, 
    dateAdded: string, // or should they have the type Date?
    dateStarted: string | undefined,
    dateFinished: string | undefined
}

 // BookEntry is an intersection-- 
 // it must have ALL of the keys in both Book and BookEntryData 
export type BookEntry = Book & BookEntryData;
