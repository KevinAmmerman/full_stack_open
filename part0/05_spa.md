:::mermaid
    sequenceDiagram
        participant browser
        participant server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
        activate server
        server-->>browser: HTMl document
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: CSS main.css
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
        activate server
        server-->>browser: JS spa.js
        deactivate server

        Note right of browser: Browser executes the JavaScript code that fetches the JSON form the server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server-->>browser: [{"content": "Hallo World", "date": "2025-3-18"}, ...]
        deactivate server

        Note right of browser: If the request function status is 4 and the server status code is 200, the functions will execute to render all the notes.
:::