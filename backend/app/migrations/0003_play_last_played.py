# Generated by Django 2.1.4 on 2018-12-18 23:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_game_level'),
    ]

    operations = [
        migrations.AddField(
            model_name='play',
            name='last_played',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
