from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
from accounts.views import CustomUserCreate

app_name = 'users'

urlpatterns = [
  # path('accounts/login', auth_views.LoginView.as_view(), name='login'),
  # path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
  # path('accounts/signup', views.sign_up, name="signup")
    path('signup/', CustomUserCreate.as_view(), name="create_user"),

]