from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
import pytz
from datetime import datetime
from django.conf import settings

from .models import Task, TaskSubmission
from institute.models import Standard 
from students.models import Student
from mentors.models import Mentor

@api_view(['GET'])
def studentGetTasks(request, standard):
    std = Standard.objects.get(std=standard)
    
     # Filter tasks by assignees and by due_date >= current time
    current_time = timezone.now()
    tasks = Task.objects.filter(assignees=std.id, due_date__gte=current_time)

    tasks_data = []
    for task in tasks:
        task_data = {
            'id': task.id,
            'subject': task.subject,
            'title': task.title,
            'task_file': task.task_file.url if task.task_file else None,  # URL for task file
            'task_image': task.task_image.url if task.task_image else None,  # URL for task image
            'description': task.description,
            'created_date': task.created_date,
            'due_date': task.due_date,
            'assignor': task.assignor.name if task.assignor else None,  # Name of the assignor
        }
        tasks_data.append(task_data)
    
    return Response(tasks_data, status=status.HTTP_200_OK)


@api_view(['POST'])
def studentSubmitTask(request):
    data = request.data
    task_id = data.get('task_id')
    student_uid = data.get('student_uid')
    task = Task.objects.get(id=task_id)

    current_time = timezone.now()
    if task.due_date < current_time:
        return Response({'message': 'Task is past due date'}, status=status.HTTP_400_BAD_REQUEST)

    student = Student.objects.get(uid=student_uid)
    file = request.FILES.get('file')
    task_submission = TaskSubmission(task=task, student=student, submission_file=file)
    task_submission.save()

    return Response({'message': 'Task submitted successfully'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def studentGetSubmissions(request, standard, student_uid):
    std = Standard.objects.get(std=standard)

     # Filter tasks by assignees and by due_date >= current time
    current_time = timezone.now()
    tasks = Task.objects.filter(assignees=std, due_date__gte=current_time)

    student = Student.objects.get(uid=student_uid)

    task_submissions = TaskSubmission.objects.filter(student=student, task__in=tasks)

    submissions_data = []
    for submission in task_submissions:
        submission_data = {
            'id': submission.id,
            'task_id': submission.task.id,
            'submission_file': submission.submission_file.url if submission.submission_file else None,  
            'submitted_date': submission.completed_date,
        }
        submissions_data.append(submission_data)

    return Response(submissions_data, status=status.HTTP_200_OK)


@api_view(['POST'])
def assignTask(request):
    data = request.data
    file = request.FILES.get('file')
    image = request.FILES.get('image')
    uid = data.get('uid')
    assignee = data.get('assignee')
    subject = data.get('subject')
    title = data.get('title')
    description = data.get('description')
    dueDate = data.get('dueDate')

    assignor = Mentor.objects.get(uid=uid)
    assignee = Standard.objects.get(std=assignee)

    # Parse the string into a naive datetime object
    naive_datetime = datetime.strptime(dueDate, '%Y-%m-%dT%H:%M')

    # Define the Kolkata timezone 
    local_tz = pytz.timezone(settings.TIME_ZONE)

    # Convert the naive datetime to a timezone-aware datetime 
    aware_datetime = local_tz.localize(naive_datetime)

    due_date = aware_datetime

    task = Task.objects.create(
        subject=subject,
        title = title,
        task_file = file,
        task_image = image,
        description = description,
        due_date = due_date,
        assignor = assignor,
        assignees = assignee
    )

    task.save()

    return Response({'message': 'Task assigned successfully'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def mentorGetTasks(request, uid, startDate, endDate):
    mentor = Mentor.objects.get(uid=uid)
    tasks = Task.objects.filter(assignor=mentor)

    startTimeStamp = int(startDate) / 1000
    endTimeStamp = int(endDate) / 1000

    start = timezone.datetime.fromtimestamp(startTimeStamp)
    end = timezone.datetime.fromtimestamp(endTimeStamp)

    tasks = tasks.filter(due_date__range=[start, end])

    data = tasks.values()

    for d in data:
        d['assignees_id'] = Standard.objects.get(id=d['assignees_id']).std

    return Response( data, status=status.HTTP_200_OK)