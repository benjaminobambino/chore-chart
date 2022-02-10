from dataclasses import fields
from rest_framework import serializers
from .models import Household, Chore
from accounts.models import CustomUser

class ChoreSerializer(serializers.HyperlinkedModelSerializer):
  household = serializers.HyperlinkedRelatedField(
    view_name = 'household_detail',
    read_only = True
  )

  household_id = serializers.PrimaryKeyRelatedField(
    queryset = Household.objects.all(),
    source = 'household'
  )

  doer = serializers.HyperlinkedRelatedField(
    required = False,
    view_name = 'user_detail',
    read_only = True,
  )

  doer_id = serializers.PrimaryKeyRelatedField(
    required = False,
    allow_null = True,
    queryset = CustomUser.objects.all(),
    source = 'doer'
  )

  chore_url = serializers.ModelSerializer.serializer_url_field(
    view_name = 'chore_detail'
  )

  class Meta:
    model = Chore
    fields = ('id', 'name', 'notes', 'priority', 'done', 'household', 'household_id', 'doer', 'doer_id', 'chore_url')

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#   household = serializers.HyperlinkedRelatedField(
#     view_name = 'household_detail',
#     read_only = True
#   )

#   household_id = serializers.PrimaryKeyRelatedField(
#     queryset = Household.objects.all(),
#     source = 'household'
#   )

#   chores = serializers.HyperlinkedRelatedField(
#     view_name = 'chore_detail',
#     many = True,
#     read_only = True
#   )

#   user_url = serializers.ModelSerializer.serializer_url_field(
#     view_name = 'user_detail'
#   )

#   class Meta:
#     model = User
#     fields = ('id', 'username', 'email', 'admin', 'image', 'user_url', 'household', 'household_id', 'chores')

class HouseholdSerializer(serializers.HyperlinkedModelSerializer):
  # users = UserSerializer(
  #   many = True,
  #   read_only = True
  # )

  chores = ChoreSerializer(
    many = True,
    read_only = True
  )

  household_url = serializers.ModelSerializer.serializer_url_field(
    view_name = 'household_detail'
  )

  class Meta:
    model = Household
    fields = ('id', 'name', 'household_url', 'users', 'chores')