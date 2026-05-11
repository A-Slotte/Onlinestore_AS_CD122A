// webserver.js
// Jesper Larsson, Malmö universitet, 2026
//
// En enkel server för att hämta filer och köra webbtjänster som registreras i den.

// Importera modul för http-server.
const http = require('node:http');

// Importera funktionen readFile, promises-versionen, från modulen fs.
const { readFile } = require('node:fs/promises');

// Följande funktion är det man får när man importerar denna modul med require. Dess parametrar är:
// - name: namnet på servern, för att användas i meddelandetexter
// - port: numret på porten som man ska nå servern på
module.exports = (name, port) => {

    // Funktion för att skicka ett felmeddelande till klienten.
    // - resp: response-objektet att skriva till
    // - code: http-koden för felet, exempelvis 404
    // - message: meddelandet som ska stå i innehållet om svaret visas som en webbsida
    const errorReply = (resp, code, message) => {
        resp.statusCode = code;
        resp.write("<!DOCTYPE html><meta charset='UTF-8'><title>"+name+" error</title>");
        resp.write(message);
        resp.end();
    }

    // Mappar URL-paths till filnamn, när en path motsvarar en fil som ska läsas in och skickas till
    // klienten.
    const files = { };

    // Mappar URL-paths till funktioner, när en path mappas till någonting som ska köras.
    const services = { };

    // Funktionen som ska anropas när en klient hämtar någonting från servern. Parametrarna är de
    // request- och response-objekt som kommer till requestListener-parametern till
    // http.createServer (https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener).
    const handleRequest = (req, resp) => {
        
        // Skapa ett URL-objekt (https://nodejs.org/api/url.html#class-url) för att extrahera delar
        // av den URL som klienten angett.
        const url = new URL(req.url, "http://dummy/");

        // Kolla om URL-ens pathname-del är någonting som finns registrerat som en fil. Testa också
        // att hänga på ett "/" på slutet, för att inte vara för petig.
        let filePath = files[url.pathname];
        if (!filePath) { filePath = files[url.pathname+"/"] }

        // Om pathname-delen finns registrerad för en fil, läs in och skicka filen.
        if (filePath) {
            readFile(filePath)
                .then(contents => {
                    resp.write(contents);
                    resp.end();
                })
                .catch(error => {
                    errorReply(resp, 404, filePath+" not found: "+error.message);
                });
            return;                             // klart!
        }

        // Kolla om URL-ens pathname-del är någonting som finns registrerat som en tjänst, i så
        // fall, anropa funktionen som implementerar tjänsten. Parametrarna som skickas med till
        // funktionen är:
        // - sökparametrar, en URLSearchParams (https://nodejs.org/api/url.html#class-urlsearchparams)
        // - response-objektet att skriva till
        // - request-objekt //Alexander Slotte
        // - en funktion som tjänsten kan anropa ifall något går fel (errorReply)
        // 
        const serviceHandler = services[url.pathname];
        if (serviceHandler) {
            try {
                serviceHandler(req, resp, url.searchParams, errorReply);
            } catch (error) {
                errorReply(resp, 500, "error processing request");
                console.error(error);
            }
            return;                             // klart!
        }

        // Om vi kommit hit så finns ingenting som matchar pathname.
        errorReply(resp, 404, "no such service: "+url.pathname);
    }

    // Returnera ett objekt som funkar som gränssnitt till servern.
    return {
        // Startar servern.
        start: () => {
            http.createServer(handleRequest).listen(port);
        },

        // Registrerar en fil.
        registerFile: (urlPath, filePath) => {
            files[urlPath] = filePath;
        },

        // Registrerar en tjänst.
        registerService: (urlPath, serviceHandler) => {
            services[urlPath] = serviceHandler;
        }
    }
}
