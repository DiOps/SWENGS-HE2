# Generated by Django 2.2.7 on 2019-12-25 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myexpenses', '0002_auto_20191225_1614'),
    ]

    operations = [
        migrations.AlterField(
            model_name='owner',
            name='job',
            field=models.TextField(blank=True, null=True),
        ),
    ]