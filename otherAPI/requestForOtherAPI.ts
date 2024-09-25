import { Book } from "../models/types";

export async function tryToGetBook (title: string) : Promise<any> {
    try{

        const response: Response = await fetch(`https://openlibrary.org/search.json?title=${title}`);

        const responseJson = await response.json();
        console.log(responseJson.docs[0].author_name[0]);

        if(responseJson.numFound == 0){
            throw new Error("please pick a different name for your book");
        }

        return responseJson.docs[0];
    }
    catch(error: any){
        throw new Error("failed to get a book from the API");
    }
}