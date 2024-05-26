from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json, pathlib

def index(request):
    return render(request, 'index.html')


def test(request):
    return render(request, 'typingtest.html')

def game(request):
    return render(request, 'keyboard_game.html')

def lessons(request):
    return render(request, 'lessons.html')

def custom(request):
    return render(request, 'custom.html')


@require_http_methods(["POST"]) # Фикс ответ на запрос POST
def dict_load(request):
    received_data = json.loads(request.body)['dict_name']  # Принимаем данные из запроса
    print(received_data)
    received_data = open(str(pathlib.Path.cwd()) + '\\typecamp_app\\static\\data\\' + received_data, 'r', encoding="utf-8").read()
    return JsonResponse({'recieved': json.loads(received_data) }) # Отсылаем обратно

# Create your views here.
