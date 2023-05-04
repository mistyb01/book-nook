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
    userRating: number, 
}

 // BookEntry is an intersection-- 
 // it must have ALL of the keys in both Book and BookEntryData 
export type BookEntry = Book & BookEntryData;

// let testEntry : BookEntry = {
//     id: 'string',
//     title: 'string',
//     authors: [''],
//     publisher: 'string',
//     pageCount: 2,
//     publishedDate: 'string',
//     status: "current",
//     pagesRead: 1,
//     userRating: 1
// }