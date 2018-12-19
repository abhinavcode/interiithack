from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *
from .serializers import *
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
import json
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.db.models import Avg, Max
# Create your views here.


def root(request):
    return HttpResponse("Hi")


def add_played_game(play):
    """
    Do cool analytics and processing and stuff here. Change the user level if needed.
    """
    games = Play.objects.filter(game=play.game)
    total = 0
    for game in list(games):
        total += game.score
    average_score = total/len(games)
    if ((play.score - average_score) > average_score/2.1):
        play.user.level += 1
    elif ((average_score - play.score) > average_score/1.5):
        play.user.level -= 1
    play.user.save()


def get_recommended_games(user):
    """
    Add Cool AI To Select Game Here!
    TODO - most important part of the backend
    """
    games = list(Game.objects.all())
    games.sort(key = lambda x: abs(x.level-user.level))
    return games[0:5]


def get_user_analytics(user):
    return {"detail":"lol"}


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    @action(detail=True, methods=['get'])
    def analytics(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
        except:
            return Response(json.dumps({'detail':'No such user'}), status=status.HTTP_404_NOT_FOUND)
        return JsonResponse(get_user_analytics(user), status=200)
    @action(detail=True, methods=['get'])
    def recommend(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
        except:
            return Response(json.dumps({'detail':'No such user'}), status=status.HTTP_404_NOT_FOUND)
        return JsonResponse(GameSerializer(get_recommended_games(user), many=True).data, safe=False, status=200)
    

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    @action(detail=True, methods=['get'])
    def play(self, request, pk=None):
        try:
            game = Game.objects.get(pk=pk)
        except:
            return Response(json.dumps({'detail':'No such game'}), status=status.HTTP_404_NOT_FOUND)
        game.plays += 1
        game.save()
        return JsonResponse(GameSerializer(game).data, status=status.HTTP_200_OK)
    def pre_save(self, obj):
        obj.code = self.request.FILES.get('code')

class PlayViewSet(viewsets.ModelViewSet):
    queryset = Play.objects.all()
    serializer_class = PlaySerializer
    def create(self, request):
        data = JSONParser().parse(request)
        serializer = PlaySerializer(data=data)
        if serializer.is_valid():
            instance = serializer.save()
            add_played_game(instance)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)