# EventTrackerProject

An RESTful API backend for an upcoming project for logging quotes.

## REST API

| HTTP Verb | URI             | Request Body | Response Body | Status |
|-----------|-----------------|--------------|---------------|---------|
| GET       | `/api/quotes`   |              | List of sessions | 200   |
| GET       | `/api/quotes/1` |              | Single session   | 200 or 404 |
| POST      | `/api/quotes/`    | JSON of new session       | JSON of created session | 201 or 400 |
| PUT       | `/api/quotes/2` | JSON for updating session | JSON of updated session | 200, 404, or 400 |
| DELETE    | `/api/quotes/2` |              | | 204, 404, or 400 |



