from django.db import models
# Create your models here.

class Game(models.Model):
    name = models.TextField(default="Unnamed Game", blank=False)
    genre = models.TextField(default="Education", blank=False)
    plays = models.IntegerField(default=0)
    image = models.TextField(default="")
    code = models.FileField()
    level = models.IntegerField(default=0)
        
class User(models.Model):
    level = models.IntegerField(default=0)
    name = models.TextField(default="Alice", blank=False)
    phone = models.TextField(unique=True, primary_key=True, null=False)
    owned_games = models.ManyToManyField(Game)

class Play(models.Model):
    last_played = models.DateTimeField(auto_now=True)
    level = models.IntegerField(default=0)
    time = models.FloatField(default=0.0)
    score = models.FloatField(default=0.0)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)