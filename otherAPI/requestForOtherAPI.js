var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function tryToGetBook(title) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://openlibrary.org/search.json?title=${title}`);
            const responseJson = yield response.json();
            console.log(responseJson.docs[0].author_name[0]);
            if (responseJson.numFound == 0) {
                throw new Error("please pick a different name for your book");
            }
            return responseJson.docs[0];
        }
        catch (error) {
            throw new Error("failed to get a book from the API");
        }
    });
}
