from datetime import datetime
from django.utils import timezone
from mentors.models import mentors
from students.models import students
from institute.models import standards

# # Bulk create standards
# standard_data = [
#     standards(standard=f"Standard {i}") for i in range(1, 11)  # Adjust number of standards as needed
# ]
# standards.objects.bulk_create(standard_data)
def insertData():
    # Retrieve standards for later use in other objects
    all_standards = list(standards.objects.all())

    # Bulk create mentors
    mentor_data = [
        mentors(
            name=f"Mentor {i+1}",
            email=f"mentor{i+1}",
            password=f"mentor{i+1}",  # Replace with hashed or plain text password based on your auth setup
            createdDate=timezone.now(),
            lastActive=timezone.now()
        )
        for i in range(10)  # Adjust to create more or fewer mentors
    ]
    mentors.objects.bulk_create(mentor_data)

    # Bulk create students
    student_data = [
        students(
            name=f"Student {i+1}",
            email=f"student{i+1}",
            password=f"student{i+1}",
            createdDate=timezone.now(),
            lastActive=timezone.now()
        )
        for i in range(100)  # Adjust to create more or fewer students
    ]
    students.objects.bulk_create(student_data)



    from mentors.models import mentorStandard
    from students.models import studentStandard
    from random import choice

    # Assume that all mentors and students are in the same standard for simplicity
    mentor_standard_data = [
        mentorStandard(mentor=mentor, standard=choice(all_standards))
        for mentor in mentors.objects.all()
    ]
    mentorStandard.objects.bulk_create(mentor_standard_data)

    student_standard_data = [
        studentStandard(student=student, standard=choice(all_standards))
        for student in students.objects.all()
    ]
    studentStandard.objects.bulk_create(student_standard_data)




    from tasks.models import tasks

    task_data = [
        tasks(
            subject=f"Subject {i+1}",
            title=f"Task {i+1}",
            description="Task description here.",
            createdDate=timezone.now(),
            dueDate=timezone.now() + timezone.timedelta(days=70),
            assignor=choice(mentors.objects.all()),  # Random mentor as assignor
            assignees=choice(all_standards)  # Random standard as assignee
        )
        for i in range(20)  # Number of tasks
    ]
    tasks.objects.bulk_create(task_data)




    from tasks.models import tasksStudents

    task_student_data = [
        tasksStudents(
            task=choice(tasks.objects.all()),  # Randomly assign task
            student=student,
            completedDate=timezone.now()
        )
        for student in students.objects.all()
    ]
    tasksStudents.objects.bulk_create(task_student_data)




        