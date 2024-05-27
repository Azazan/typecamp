from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .forms import *
import json, pathlib
from django.contrib.auth import authenticate, login



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
    received_data = open(str(pathlib.Path(__file__).resolve().parent.parent) + '/typecamp_app/static/data/' + received_data, 'r', encoding="utf-8").read()
    return JsonResponse({'recieved': json.loads(received_data) }) # Отсылаем обратно



def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(username=cd['username'], password=cd['password'])
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                form.add_error(None, 'Unknown or disabled account')
                return render(request, 'login.html', {'form':form})
                
        else:
            form.add_error(None, 'Unknown or disabled account')
            return render(request, 'login.html', {'form':form})

    else:
        form = LoginForm()
    return render(request, 'login.html', {'form':form})


def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            new_user = form.save(commit=False)

            new_user.set_password(form.cleaned_data['password'])

            new_user.save()
            return render(request, 'index.html', {'user':new_user})

    else:
        form = UserRegistrationForm()

    return render(request, 'register.html', {'form':form})


# Create your views here.
