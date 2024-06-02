from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .forms import *
import json, pathlib
from django.contrib.auth import authenticate, login
from .models import Profile, SiteStatistics, Post, History
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from datetime import datetime


def index(request):
    leaderboard_wpm = Profile.objects.all().order_by('-wpm')[0:20]
    leaderboard_game = Profile.objects.all().order_by('-game_score')[0:20]

    return render(request, 'index.html', {
        'leaderboard_wpm':leaderboard_wpm,
        'leaderboard_game':leaderboard_game
    })


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

def game_stats_update(request):
    recieved_data = json.loads(request.body)
    if (request.user.is_authenticated):
        user = request.user
        profile_score = Profile.objects.get(user=user)
        profile_score.game_score = recieved_data['score']
        profile_score.save()
    return JsonResponse({'recieved': 'good' })
        

def stats_update(request):
    recieved_data = json.loads(request.body)
    
    if (request.user.is_authenticated):
        user = request.user
        profile_keys = Profile.objects.get(user=user)
        for key, val in profile_keys.keys.items():
            profile_keys.keys[key] += recieved_data[key]
        profile_keys.save()
        
        

    else:
        print('no')
    return JsonResponse({'recieved': 'good' })

def total_stats_update(request):
    recieved_data = json.loads(request.body)
    
    if (request.user.is_authenticated):
        user = request.user
        profile_keys = Profile.objects.get(user=user)
        for key, val in profile_keys.total_stat.items():
            profile_keys.total_stat[key] += recieved_data[key]
        profile_keys.wpm = max(recieved_data['total_wpm'], profile_keys.wpm)
        profile_keys.save()
        total = SiteStatistics.objects.get(id=1)
        total.total_mistakes += recieved_data['total_mistakes']
        total.total_time += recieved_data['total_time']
        total.total_tests += 1
        total.total_words += recieved_data['total_words']
        total.total_keys += recieved_data['total_keys']
        total.save()

        user.history_set.create(
            test_num = user.history_set.count() + 1,
            wpm=recieved_data['total_wpm'],
            lpm=recieved_data['total_lpm'],
            time=recieved_data['total_time'],
            mistakes=recieved_data['total_mistakes'],
            accuracy=recieved_data['total_accuracy']
        )
        
        print(Profile.objects.get(user=user).wpm)

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
            return redirect('home')

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
                    keys[key] *= 20
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
    'history':user.history_set.all(),
    'total_accuracy':total_accuracy,
    'total_wpm':total_wpm,
    'total_lpm':total_lpm,
    'total_time':stats['total_time'],
    'total_tests_cnt':stats['total_test_cnt'],
    'total_mistakes':stats['total_mistakes'],
    'keys':keys
    
    
    })
@login_required
def edit_profile(request, id):
    
    if request.method == 'POST':
        if request.user.is_superuser:
            staff_form = StaffEditForm(instance=User.objects.get(id=id), data=request.POST)
        user_form = UserEditForm(instance=User.objects.get(id = id), data=request.POST)
        profile_form = ProfileEditForm(instance=User.objects.get(id = id).profile, data=request.POST)
        if user_form.is_valid() and profile_form.is_valid():
            user = request.user
            user_form.save()
            profile_form.save()
            if request.user.is_superuser and staff_form.is_valid():
                print('asdfasdf')
                staff_form.save(commit=True)
            return redirect('user_detail', id = id)

        else:
            return render(request,
                      'edit.html',
                      {'user_form': user_form,
                       'profile_form': profile_form,
                       'id':int(id)
                       })

    else:
        if (request.user.is_superuser):
            
            user_form = UserEditForm(instance=User.objects.get(id = id))
            profile_form = ProfileEditForm(instance=User.objects.get(id = id).profile)
            staff_form = StaffEditForm(instance=User.objects.get(id = id))
            return render(request,
                        'edit.html',
                        {'user_form': user_form,
                        'profile_form': profile_form,
                        'staff_form': staff_form,
                        'id':int(id)
                        })
        else:
            user_form = UserEditForm(instance=User.objects.get(id = id))
            profile_form = ProfileEditForm(instance=User.objects.get(id = id).profile)
            return render(request,
                        'edit.html',
                        {'user_form': user_form,
                        'profile_form': profile_form,
                        'id':int(id)
                        })

def total_stats_detail(request):
    total_stats = SiteStatistics.objects.get(id=1)

    return render(request, 'total_stats.html', {
        'total_stats':total_stats
    })

def blog_list(request):
    object_list = Post.objects.filter(status='published')
    if request.user.is_authenticated:
        drafts = Post.objects.filter(status='draft', author=request.user).count()

    else:
        drafts = 0
    
    paginator = Paginator(object_list, 3)
    page = request.GET.get('page')
    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    return render(request,
                  'blog_list.html',
                  {'page': page,
                   'posts': posts,
                   'drafts':drafts
                   })


def post_detail(request, year, month, day, post):

    post = get_object_or_404(Post, slug=post,
                                   publish__year=year,
                                   publish__month=month,
                                   publish__day=day)
    post.views += 1
    post.save()
    new_comment = None
    comments = post.comment_set.all()
    if request.method == 'POST':
        # A comment was posted
        comment_form = SendComment(data=request.POST)
        if comment_form.is_valid():
            # Create Comment object but don't save to database yet          
            new_comment = comment_form.save(commit=False)
            # Assign the current post to the comment
            
            new_comment.post = post
            new_comment.user = request.user
            # Save the comment to the database
            new_comment.save()
            return redirect('post_detail', year=year, month=month, day=day, post=post.slug)
    else:
        comment_form = SendComment()                   
    return render(request,
                  'post_detail.html',
                  {'post': post,
                   'comments': comments,
                   'new_comment': new_comment,
                   'comment_form': comment_form})

def delete_comment(request, id):

    comment = Comment.objects.get(id=id)
    if request.user.is_staff or comment.user.pk == request.user.pk:
        comment.delete()
    
    post = comment.post
    return redirect('post_detail',
                     year=post.publish.year,
                     month=post.publish.strftime('%m'), 
                     day=post.publish.strftime('%d'),
                     post=post.slug
                     )


def write_post(request):
    if request.method == 'POST':
        
        post_form = WritePostForm(data=request.POST, files=request.FILES)
        if post_form.is_valid():       
            new_post = post_form.save(commit=False)
          
            
            new_post.author = request.user
            new_post.status = 'draft'
            new_post.save()
           
            return redirect('drafts')
    else:
        post_form = WritePostForm()                   
    return render(request,
                  'write_post.html',
                  {'post_form': post_form})


def drafts(request):
    
    object_list = Post.objects.filter(status='draft', author=request.user)
    paginator = Paginator(object_list, 3)
    page = request.GET.get('page')
    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    return render(request,
                  'drafts.html',
                  {'page': page,
                   'posts': posts})

@login_required
def edit_post(request, id):
    if request.method == 'POST':
        post_form = EditPostForm(instance=Post.objects.get(id = id), data=request.POST, files=request.FILES)
        if post_form.is_valid():       
            new_post = post_form.save(commit=False)
            new_post.status = 'draft'
            new_post.updated = datetime.now()
            new_post.save()
           
            return redirect('drafts')
    else:
        post_form = EditPostForm(instance=Post.objects.get(id = id))                   
    return render(request,
                    'edit_post.html',
                    {'post_form': post_form})


def delete_post(request, id):
    post = Post.objects.get(id=id)
    if request.user.is_staff or post.author.pk == request.user.pk:
        post.delete()
    
    return redirect('drafts')

def draft_post(request, id):
    post = Post.objects.get(id=id)
    if request.user.is_staff or post.author.pk == request.user.pk:
        post = Post.objects.get(id=id)
        post.status = 'draft'
        post.save()
    return redirect('blog_list')

def public_post(request, id):
    post = Post.objects.get(id=id)
    if post.author.id == request.user.id:
        post = Post.objects.get(id=id)
        post.status = 'published'
        post.publish = datetime.now()
        post.save()
    return redirect('drafts')

def user_posts(request, id):
    if request.user.is_authenticated:
        drafts = Post.objects.filter(status='draft', author=request.user).count()

    else:
        drafts = 0
    user = User.objects.get(id=id)
    object_list = Post.objects.filter(author=user, status='published')
    paginator = Paginator(object_list, 3)
    page = request.GET.get('page')
    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)

    return render(request, 'user_posts.html', {'posts':posts, 'drafts':drafts, 'user':user.username})