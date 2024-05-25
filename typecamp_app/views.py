from django.shortcuts import render

from django.http import HttpResponse

def index(request):
    return render(request, 'index.html')


def test(request):
    return render(request, 'typingtest.html')

def game(request):
    return render(request, 'keyboard_game.html')

def lessons(request):
    return render(request, 'lessons.html')



# Create your views here.
