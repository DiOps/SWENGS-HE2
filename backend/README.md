# Install required Python packages using pip and requirements.txt
venv\Scripts\pip.exe install -r requirements.txt

# Create database
venv\Scripts\python.exe manage.py migrate

# Load initial data to database using Django fixtures 
venv\Scripts\python.exe manage.py loaddata initial_categories
venv\Scripts\python.exe manage.py loaddata initial_people
venv\Scripts\python.exe manage.py loaddata initial_expenses