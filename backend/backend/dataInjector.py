import csv
import random
from django.utils import timezone
from institute.models import Standard
from mentors.models import Mentor
from students.models import Student
from tasks.models import Task, TaskSubmission

# Step 1: Load Standards from CSV
def load_standards():
    with open('standards.csv', 'r') as file:
        reader = csv.DictReader(file)
        standards = [Standard(name=row['standard']) for row in reader]
        Standard.objects.bulk_create(standards)

# Step 2: Load Mentors and Create uid if Missing
def load_mentors():
    mentors = []
    with open('mentors.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            uid = row['uid'] if row['uid'] else f"{row['name'].replace(' ', '').lower()}"
            mentors.append(Mentor(name=row['name'], uid=uid, password='defaultpassword'))
    Mentor.objects.bulk_create(mentors)

# Step 3: Assign Standards to Mentors
def assign_standards_to_mentors():
    mentor_dict = {mentor.name: mentor for mentor in Mentor.objects.all()}
    standard_dict = {standard.name: standard for standard in Standard.objects.all()}
    
    with open('mentor_standards.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            mentor = mentor_dict.get(row['mentor_name'])
            standard = standard_dict.get(row['standard_name'])
            if mentor and standard:
                mentor.standards.add(standard)

# Step 4: Load Students and Create uid if Missing
def load_students():
    students = []
    with open('students.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            uid = row['uid'] if row['uid'] else f"{row['name'].replace(' ', '').lower()}"
            students.append(Student(name=row['name'], uid=uid, password='defaultpassword'))
    Student.objects.bulk_create(students)

# Step 5: Assign Standards to Students
def assign_standards_to_students():
    student_dict = {student.name: student for student in Student.objects.all()}
    standard_dict = {standard.name: standard for standard in Standard.objects.all()}
    
    with open('student_standards.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            student = student_dict.get(row['student_name'])
            standard = standard_dict.get(row['standard_name'])
            if student and standard:
                student.standards.add(standard)

# Step 6: Create Random Tasks Assigned by Mentors
def create_random_tasks():
    mentors = list(Mentor.objects.all())
    standards = list(Standard.objects.all())
    task_data = [
        {'subject': 'Math', 'title': 'Algebra Basics', 'description': 'Intro to Algebra'},
        {'subject': 'Science', 'title': 'Physics 101', 'description': 'Basics of Physics'},
        {'subject': 'History', 'title': 'World War II', 'description': 'An overview of WWII'},
        {'subject': 'Literature', 'title': 'Shakespeare', 'description': 'Study of Shakespeare’s works'},
    ]
    
    tasks = []
    for data in task_data:
        assignor = random.choice(mentors)
        assignee = random.choice(standards)
        tasks.append(Task(
            subject=data['subject'],
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
        num_submissions = random.randint(1, len(students) // 2)  # Partial submissions
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
    load_standards()
    load_mentors()
    assign_standards_to_mentors()
    load_students()
    assign_standards_to_students()
    create_random_tasks()
    create_task_submissions()

# Run this function to perform bulk creation
run_bulk_creation()
