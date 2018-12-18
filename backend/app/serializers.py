from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('level', 'name', 'phone')

class PlaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Play
        fields = ('score', 'time', 'level', 'user', 'game')

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('genre', 'name', 'plays', 'image', 'code')