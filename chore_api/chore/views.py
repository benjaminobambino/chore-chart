from rest_framework import generics
from .serializers import HouseholdSerializer, UserSerializer, ChoreSerializer
from .models import Household, User, Chore
from django.contrib.auth.decorators import login_required

# Create your views here.
class HouseholdList(generics.ListCreateAPIView):
  queryset = Household.objects.all()
  serializer_class = HouseholdSerializer

class HouseholdDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Household.objects.all()
  serializer_class = HouseholdSerializer

class UserList(generics.ListCreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class ChoreList(generics.ListCreateAPIView):
  queryset = Chore.objects.all()
  serializer_class = ChoreSerializer

class ChoreDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Chore.objects.all()
  serializer_class = ChoreSerializer