from rest_framework import generics
from .serializers import HouseholdSerializer, ChoreSerializer
from .models import Household, Chore
from rest_framework.permissions import IsAdminUser

# Create your views here.
class HouseholdList(generics.ListCreateAPIView):
  permissions = [IsAdminUser]
  queryset = Household.objects.all()
  serializer_class = HouseholdSerializer

class HouseholdDetail(generics.RetrieveUpdateDestroyAPIView):
  permissions = [IsAdminUser]
  queryset = Household.objects.all()
  serializer_class = HouseholdSerializer

# class UserList(generics.ListCreateAPIView):
#   permissions = [IsAdminUser]
#   queryset = User.objects.all()
#   serializer_class = UserSerializer

# class UserDetail(generics.RetrieveUpdateDestroyAPIView):
#   permissions = [IsAdminUser]
#   queryset = User.objects.all()
#   serializer_class = UserSerializer

class ChoreList(generics.ListCreateAPIView):
  permissions = [IsAdminUser]
  queryset = Chore.objects.all()
  serializer_class = ChoreSerializer

class ChoreDetail(generics.RetrieveUpdateDestroyAPIView):
  permissions = [IsAdminUser]
  queryset = Chore.objects.all()
  serializer_class = ChoreSerializer