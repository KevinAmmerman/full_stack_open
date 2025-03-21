:::mermaid
    sequenceDiagram
        participant browser
        participant server

        Note right of browser: When the submit listener is executed, a new note is pushed into a local array, rendered, and a function is called to send the new note to the server.

        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate server
        server-->>browser: status code 201
        deactivate server
:::