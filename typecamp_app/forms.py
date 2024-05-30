from django import forms
from django.contrib.auth.models import User
from .models import Profile, Comment, Post


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

class SendComment(forms.ModelForm):
    
    class Meta:
        model = Comment
        fields = ('text',)
        labels = {
            "text": "",
        }
        widgets = {
            "text": forms.Textarea(attrs={"placeholder":"Write a comment"}),
        }
        
class WritePostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('title', 'body', 'photo')
        widgets = {
                    "title": forms.TextInput(attrs={"placeholder":"Write a title", "class":"w-50"}),
                    "body": forms.Textarea(attrs={"placeholder":"Write a post", "class":"w-100"}),
        }
class EditPostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('title', 'body', 'photo')
        widgets = {
                    "title": forms.TextInput(attrs={"placeholder":"Write a title"}),
                    "body": forms.Textarea(attrs={"placeholder":"Write a post", "class":"w-100"}),
                }
        


class UserRegistrationForm(forms.Form,forms.ModelForm):
    username = forms.CharField()
    email = forms.CharField(label='email', widget=forms.EmailInput)
    password = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(label="Repeat password", widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('username', 'email')


    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError('Passwords don\'t match')
        
        return cd['password2']

class UserEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username', 'email')
        help_texts = {
            'username': None,
            'email': None,
        }   

class StaffEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('is_staff',)
        help_texts = {
            'is_staff': '<span class="text-danger">Be careful!</span>',
            
        }   



class ProfileEditForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('quote',)
    




