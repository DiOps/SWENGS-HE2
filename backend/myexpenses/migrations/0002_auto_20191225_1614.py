# Generated by Django 2.2.7 on 2019-12-25 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myexpenses', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='owner',
            name='getsSalary',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='owner',
            name='job',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
