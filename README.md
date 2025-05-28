
# SmartPark

A modern parking web app with a FastAPI backend and a Next.js (React) frontend.  
Features user authentication, parking lot booking, notifications, and account management.  
The backend serves both API and static frontend assets for a seamless full-stack experience.

---

## Features

- **User Authentication**: Sign up and log in securely.
- **Parking Lot Booking**: Reserve or book parking lots for specific durations.
- **Account Management**: View and manage your account balance and parking history.
- **Notifications**: Receive updates about your bookings and account.
- **Full-stack Integration**: FastAPI backend serves both API and built frontend assets.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React, Tailwind CSS)
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/)
- **Database**: SQLAlchemy ORM (SQLite or your choice)
- **API**: RESTful endpoints for all core features

---

## Project Structure

```
SmartPark/
│
├── backendF/           # FastAPI backend
│   ├── main.py         # FastAPI app entry point
│   ├── models.py       # Database models
│   ├── schemas.py      # Pydantic schemas
│   ├── services.py     # Business logic
│   ├── database.py     # DB connection
│   └── requirements.txt# Python dependencies
│
├── modFontend/         # Next.js frontend
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   ├── public/         # Static assets
│   ├── package.json    # Node dependencies
│   └── ...             # Other config files
│
└── README.md           # This file
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/tirivashemutanho/SmartPark.git
cd SmartPark
```

### 2. Backend Setup

```bash
cd backendF
python -m venv venv
# Activate your virtual environment:
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

The backend will be running at [http://localhost:8000](http://localhost:8000).

### 3. Frontend Setup

```bash
cd ../modFontend
npm install
npm run build
```

The frontend is built and served as static files by the FastAPI backend.

---

## API Endpoints

- `POST /api/users` — Register a new user
- `POST /api/login` — User login
- `GET /api/notifications/{userid}` — Get user notifications
- `GET /api/my_account/` — Get account balance
- `POST /api/book_parking` — Book a parking lot
- `GET /api/my_parkinglot` — Get current parking lot
- ...and more (see `backendF/main.py` for all endpoints)

---

## Environment Variables

- By default, the backend runs on `localhost:8000`.
- Update the API base URL in `modFontend/components/servers/backend.js` if you deploy to a different address.

---

## Deployment

- For production, use a process manager (like Gunicorn or uvicorn with `--workers`) and a reverse proxy (like Nginx) to serve both the FastAPI backend and the static frontend.
- You can also deploy the frontend separately (e.g., Vercel) and point it to your FastAPI API.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

## Author

tirivashemutanho  
[https://github.com/tirivashemutanho/SmartPark](https://github.com/tirivashemutanho/SmartPark)
