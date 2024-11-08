import random
from django.utils import timezone
from faker import Faker
from institute.models import Standard
from mentors.models import Mentor
from students.models import Student
from tasks.models import Task, TaskSubmission

# Initialize Faker
fake = Faker()

# Step 1: Generate Standards
def create_standards():
    standard_names = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"]
    standards = [Standard(std=name) for name in standard_names]
    Standard.objects.bulk_create(standards)

# Step 2: Generate Mentors
def create_mentors(num_mentors=5):
    mentors = []
    for _ in range(num_mentors):
        name = fake.name()
        uid = name.replace(" ", "").lower()
        mentors.append(Mentor(name=name, uid=uid, password='defaultpassword'))
    Mentor.objects.bulk_create(mentors)

# Step 3: Assign Standards to Mentors
def assign_standards_to_mentors():
    standards = list(Standard.objects.all())
    mentors = Mentor.objects.all()
    
    for mentor in mentors:
        assigned_standards = random.sample(standards, k=random.randint(1, len(standards)))
        mentor.standards.set(assigned_standards)

# Step 4: Generate Students
def create_students(num_students=20):
    students = []
    for _ in range(num_students):
        name = fake.name()
        uid = name.replace(" ", "").lower()
        students.append(Student(name=name, uid=uid, password='defaultpassword'))
    Student.objects.bulk_create(students)

# Step 5: Assign Standards to Students
def assign_standards_to_students():
    standards = list(Standard.objects.all())
    students = Student.objects.all()
    
    for student in students:
        assigned_standard = random.choice(standards)
        student.standards.add(assigned_standard)

# Step 6: Create Random Tasks Assigned by Mentors
def create_random_tasks(num_tasks=10):
    mentors = list(Mentor.objects.all())
    standards = list(Standard.objects.all())
    
    subjects = ["Math", "Science", "History", "Literature"]
    task_data = [
        {"title": "Algebra Basics", "description": "Intro to Algebra"},
        {"title": "Physics 101", "description": "Basics of Physics"},
        {"title": "World War II", "description": "An overview of WWII"},
        {"title": "Shakespeare", "description": "Study of Shakespeare’s works"},
    ]
    
    tasks = []
    for _ in range(num_tasks):
        data = random.choice(task_data)
        assignor = random.choice(mentors)
        assignee = random.choice(standards)
        tasks.append(Task(
            subject=random.choice(subjects),
            title=data['title'],
            description=data['description'],
            assignor=assignor,
            assignees=assignee,
            created_date=timezone.now(),
            due_date=timezone.now() + timezone.timedelta(days=7)
        ))
    Task.objects.bulk_create(tasks)

# Step 7: Create Partial Task Submissions
def create_task_submissions():
    students = list(Student.objects.all())
    tasks = list(Task.objects.all())
    submissions = []
    
    for task in tasks:
        num_submissions = random.randint(1, len(students) // 2)
        selected_students = random.sample(students, num_submissions)
        
        for student in selected_students:
            submissions.append(TaskSubmission(
                task=task,
                student=student,
                completed_date=timezone.now()
            ))
    TaskSubmission.objects.bulk_create(submissions)

# Step 8: Run All Steps
def run_bulk_creation():
    create_standards()
    create_mentors()
    assign_standards_to_mentors()
    create_students()
    assign_standards_to_students()
    create_random_tasks()
    create_task_submissions()

