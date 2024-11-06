from django.db import models

from institute.models import standards
from mentors.models import mentors
from students.models import students

# Create your models here.
class tasks(models.Model):
    subject = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    taskFile = models.FileField(upload_to='taskFiles/%Y/%B/%d')
    taskImage = models.FileField(upload_to='taskImages/%Y/%B/%d',default=None, null=True)
    description = models.TextField()
    createdDate = models.DateTimeField(auto_now_add=True)
    dueDate = models.DateTimeField(default = None, null = True)

    assignor = models.ForeignKey(mentors, on_delete=models.SET_NULL, null=True)
    assignees = models.ForeignKey(standards, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title
 

def student_submission_upload_path(instance, filename):
    # Ensure that student and task names are handled safely for file paths
    student_name = instance.student.name.replace(" ", "_")
    current_date = timezone.now()
    # Generate path based on student's name and current date (year, month, day)
    return f"submission/{student_name}/{current_date.year}/{current_date.strftime('%B')}/{current_date.day}/{filename}"
class tasksStudents(models.Model):
    task = models.ForeignKey(tasks, on_delete=models.SET_NULL, null=True)
    student = models.ForeignKey(students, on_delete=models.SET_NULL, null=True)
    completedDate = models.DateTimeField(auto_now_add=True)
    submission = models.FileField(upload_to=student_submission_upload_path)

    def __str__(self):
        return f"{self.task.title} - {self.student.name}"