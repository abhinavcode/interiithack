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
# Create your views here.
def root(request):
    return HttpResponse("Hi")

def add_played_game(play):
    """
    Do cool analytics and processing and stuff here. Change the user level if needed.
    """
def get_recommended_games(user):
    """
    Add Cool AI To Select Game Here!
    """
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
        return JsonResponse(get_recommended_games(user), status=200)

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
        return JSONResponse({'code':game.code}, status=status.HTTP_200_OK)
        
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

        
