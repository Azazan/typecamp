from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .forms import *
import json, pathlib
from django.contrib.auth import authenticate, login
from .models import Profile



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

def stats_update(request):
    recieved_data = json.loads(request.body)
    
    if (request.user.is_authenticated):
        user = request.user
        profile_keys = Profile.objects.get(user=user)
        total_keys = profile_keys.keys
        for key, val in total_keys.items():
            total_keys[key] += recieved_data[key]
        profile_keys.save()
        

    else:
        print('no')
    return JsonResponse({'recieved': 'good' })

def total_stats_update(request):
    recieved_data = json.loads(request.body)
    
    if (request.user.is_authenticated):
        user = request.user
        profile_keys = Profile.objects.get(user=user)
        total_keys = profile_keys.total_stat
        for key, val in total_keys.items():
            total_keys[key] += recieved_data[key]
        profile_keys.save()
        
        print(Profile.objects.get(user=user).total_stat)

    else:
        print('no')
    return JsonResponse({'recieved': 'good' })



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
            Profile.objects.create(user=new_user)
            login(request, new_user)
            return render(request, 'index.html', {'user': new_user})

    else:
        form = UserRegistrationForm()

    return render(request, 'register.html', {'form': form})

def user_detail(request, id):
    user = User.objects.get(id=id)
    
    profile = Profile.objects.get(user=user)
    stats = profile.total_stat
    keys = profile.keys
    for key, val in keys.items():
                if (stats['total_mistakes'] == 0):
                    keys[key] = 0
                else:
                    keys[key] /= stats['total_mistakes']
                    keys[key] *= 5
    if stats['total_test_cnt'] == 0:
        total_accuracy = 0
        total_wpm = 0
        total_lpm = 0
        
    else:
        total_accuracy = stats['total_accuracy'] / stats['total_test_cnt']
        total_wpm = stats['total_wpm'] / stats['total_test_cnt']
        total_lpm = stats['total_lpm'] / stats['total_test_cnt']
        



    return render(request, 'profile.html',
    {'profile':profile, 
    'total_accuracy':total_accuracy,
    'total_wpm':total_wpm,
    'total_lpm':total_lpm,
    'total_time':stats['total_time'],
    'total_tests_cnt':stats['total_test_cnt'],
    'total_mistakes':stats['total_mistakes'],
    'keys':keys
    
    
    })
# Create your views here.
