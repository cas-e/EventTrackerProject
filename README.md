# EventTrackerProject

An RESTful API backend for an upcoming project for logging study sessions.

## REST API

| HTTP Verb | URI             | Request Body | Response Body | Status |
|-----------|-----------------|--------------|---------------|---------|
| GET       | `/api/sessions`   |              | List of sessions | 200   |
| GET       | `/api/sessions/1` |              | Single session   | 200 or 404 |
| POST      | `/api/sessions/`    | JSON of new session       | JSON of created session | 201 or 400 |
| PUT       | `/api/session/2` | JSON for updating session | JSON of updated session | 200, 404, or 400 |
| DELETE    | `/api/session/2` |              | | 204, 404, or 400 |

## Technologies Used

* Java
* Spring framework
* MySql
* Postman
* git

## Lessons Learned

Here we learned an alternative strategy to embedding our data in JSPs. We
instead design a REST based api for transferring data, and in this case
we used JSON to encode and decode data into our java objects. For now, this seems
much simpler. 

In doing so we learned a bit about JSON data representation. 

JSON is an interesting
format, because it wasn't really "designed" as a data exchange format at all. 
Douglas Crockford just posted
a [railroad diagram](https://en.wikipedia.org/wiki/Syntax_diagram) 
of the syntax for a subset of Javascript's built in data literal
notation. This diagram is still [up online](https://www.json.org/json-en.html). 
Since the format was less verbose than XML, and since people pretty
much are forced into using Javascript for web applications anyways, it became a de facto 
standard. Eventually JSON was officially adopted as an "official" standard by important 
standards bodies like ECMA and IEEE. 


