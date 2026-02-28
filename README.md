# Task Manager App

This repository contains a Django REST backend with a React+Vite frontend for managing simple tasks.

## Setup 

### Backend

1. Copy `.env.example` to `.env` and fill in values (SECRET_KEY, DEBUG, MONGO_URI).
2. Install Python dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Apply migrations:

```bash
cd backend
python manage.py makemigrations tasks
python manage.py migrate
```

4. Run development server:

```bash
python manage.py runserver
```

By default the API will be available at `http://localhost:8000/api/tasks/`.

### Frontend

This project uses CSS for all styling, with the main UI rules defined in `src/App.css`. The layout is responsive and optimised for all devices:

- **Mobile first**: elements stack and occupy full width on small screens.
- **Tablet & desktop**: container expands up to very wide widths (up to 80rem) with appropriate padding.
- **Typography**: headings and controls scale up on larger viewports for readability.
- **Dark mode** support via system preferences.

No Tailwind dependency is required – styling is self-contained in `App.css`.

1. Change to the frontend directory and install packages:

```bash
cd frontend
npm install
```

2. Start development server:

```bash
npm run dev
```

3. The React app will open at `http://localhost:5173` (or whichever port Vite reports).

Make sure `VITE_API_URL` is set in your environment or `.env` file to point at your backend.

## Notes

- The Django project uses Djongo to store data in MongoDB.
- Redux or other state management is not used; tasks are fetched directly from the API.
