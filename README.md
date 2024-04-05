# CS157C-Team11


### Progress
  - March 9th, 2024:
      - flow diagram and UX/UI brief design
      - frontend with JavaScript
      - Todo: use Python for backend and connect to the front end 
  - March 14th, 2024:
      - frontend finish homepage, login, and register page
      - To do:
         - need to discuss to make a decision on the Redis data model
         - need to talk about connecting frontend and backend as well as with Redis database
  - March 24
      - worked on backend, need to continue
      - frontend with UX/UI is approved by all members
  - April 5
      - Finished setting up for the webpage
      - Need a meeting to discuss data models used for Redis database 
   

### Data Model:
- User: JsonModel
- Host: JsonModel
  - Availability (list?)
- Cart
- Review?

### Implementation:
- Download python3 and redis-stack-server
- Clone the repo, then in Visual Studio Code, open the folder and in the terminal,
   - Frontend:
      + cd to frontend
      + npm run dev (or yarn if use yarn)
   - Backend:
      + cd to backend:api
      + source venv/bin/activate
      + python3 server.py
