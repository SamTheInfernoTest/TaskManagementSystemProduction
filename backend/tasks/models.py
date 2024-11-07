from django.db import models
from django.utils import timezone
from institute.models import Standard
from mentors.models import Mentor 
from students.models import Student

class Task(models.Model):
    subject = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    task_file = models.FileField(upload_to='taskFiles/%Y/%B/%d',null=True, blank=True)
    task_image = models.FileField(upload_to='taskImages/%Y/%B/%d', null=True, blank=True)
    description = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(null=True, blank=True)

    assignor = models.ForeignKey(Mentor, on_delete=models.SET_NULL, null=True, related_name="assigned_tasks")
    assignees = models.ForeignKey(Standard, on_delete=models.SET_NULL, null=True, related_name="tasks")

    def __str__(self):
        return self.title

def student_submission_upload_path(instance, filename):
    student_name = instance.student.name.replace(" ", "_")
    current_date = timezone.now()
    return f"submission/{student_name}/{current_date.year}/{current_date.strftime('%B')}/{current_date.day}/{filename}"
    
class TaskSubmission(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="submissions")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="submissions")
    completed_date = models.DateTimeField(auto_now_add=True)
    submission_file = models.FileField(upload_to=student_submission_upload_path, null=True, blank=True)

    def __str__(self):
        return f"{self.task.title} - {self.student.name}"
