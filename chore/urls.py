from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
  path('households/', views.HouseholdList.as_view(), name='household_list'),
  path('households/<int:pk>', views.HouseholdDetail.as_view(), name='household_detail'),
  path('users/', views.UserList.as_view(), name='user_list'),
  path('users/<int:pk>', views.UserDetail.as_view(), name='user_detail'),
  path('chores/', views.ChoreList.as_view(), name='chore_list'),
  path('chores/<int:pk>', views.ChoreDetail.as_view(), name='chore_detail')
]