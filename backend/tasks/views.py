from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Task, TaskSubmission
from institute.models import Standard
from students.models import Student

@api_view(['GET'])
def studentGetTasks(request, standard):
    std = Standard.objects.get(std=standard)
    tasks = Task.objects.filter(assignees=std.id)

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
    student = Student.objects.get(uid=student_uid)
    file = request.FILES.get('file')
    task_submission = TaskSubmission(task=task, student=student, submission_file=file)
    task_submission.save()

    return Response({'message': 'Task submitted successfully'}, status=status.HTTP_200_OK)