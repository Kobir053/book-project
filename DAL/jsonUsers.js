var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from 'jsonfile';
export function writeUserToJsonFile(user) {
    jsonfile.readFile('./data/db.json')
        .then(users => {
        users.push(user);
        jsonfile.writeFile('./data/db.json', users, (err) => {
            if (err)
                console.error(err);
        });
    })
        .catch(error => console.error(error));
}
export function readFromJsonFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield jsonfile.readFile("./data/db.json");
        return users;
    });
}
