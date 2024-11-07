# Generated by Django 5.1.2 on 2024-11-07 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('institute', '0002_standard'),
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentstandard',
            name='student',
        ),
        migrations.RemoveField(
            model_name='studentstandard',
            name='standard',
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('uid', models.CharField(max_length=100, unique=True)),
                ('password', models.CharField(max_length=200)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('last_active', models.DateTimeField(auto_now=True)),
                ('profile_image', models.FileField(blank=True, null=True, upload_to='students/profileImages')),
                ('standards', models.ManyToManyField(related_name='students', to='institute.standard')),
            ],
        ),
    ]