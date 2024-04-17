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
  - March 24th
      - worked on backend, need to continue
      - frontend with UX/UI is approved by all members
  - April 5th
      - Finished setting up for the webpage
      - Need a meeting to discuss data models used for Redis database
  - April 9th
      - Teammates discussed on the Redis Data models
      - Elena will continue on implementing data models for Cart, Host's availability, and Booking History
      - Phuong will start working on drawing data model diagrams and report setup.  

### Data Model:
- User: JsonModel
- Host: JsonModel
  - Availability (list?)
- Cart
- Review?
<img src="https://github.com/PhuongHuynh9987/CS157C-Team11/assets/54336313/c143dbe2-c64a-4776-b6a3-89e663d51d28" width="500">

### UX/UI

![UX-UI design](https://github.com/PhuongHuynh9987/CS157C-Team11/assets/54336313/a33ea9c2-0922-41d0-b4a3-a8184b569916 )
<img src="https://github.com/PhuongHuynh9987/CS157C-Team11/assets/54336313/a33ea9c2-0922-41d0-b4a3-a8184b569916" width="800">

### Implementation:
- Download python3 and redis-stack-server
- Clone the repo, then in Visual Studio Code, open the folder and in the terminal,
   - Frontend:
      + cd to frontend
      + npm run dev (or yarn if use yarn)
   - Backend:
      + cd to backend
      + source venv/bin/activate
      + python3 server.py
