from asyncore import write
from rest_framework import serializers
from .models import Household, Chore
from accounts.models import CustomUser

# class CustomUserSerializer(serializers.ModelSerializer):

class UserSerializer(serializers.HyperlinkedModelSerializer):
  household = serializers.HyperlinkedRelatedField(
    required = False,
    view_name = 'household_detail',
    read_only = True
  )

  household_id = serializers.PrimaryKeyRelatedField(
    required = False,
    queryset = Household.objects.all(),
    source = 'household'
  )

  chores = serializers.HyperlinkedRelatedField(
    view_name = 'chore_detail',
    many = True,
    read_only = True
  )

  user_url = serializers.ModelSerializer.serializer_url_field(
    view_name = 'user_detail'
  )

  email = serializers.EmailField(required=True, write_only=True)
  username = serializers.CharField(required=True)
  password = serializers.CharField(min_length=8, write_only=True)

  class Meta:
    model = CustomUser
    fields = ('id', 'username', 'email', 'password', 'admin', 'image', 'user_url', 'household', 'household_id', 'chores')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
      password = validated_data.pop('password', None)
      # as long as the fields are the same, we can just use this
      instance = self.Meta.model(**validated_data)
      if password is not None:
          instance.set_password(password)
      instance.save()
      return instance

  # class Meta:
  #   model = CustomUser
  #   fields = ('id', 'username', 'email', 'admin', 'image', 'user_url', 'household', 'household_id', 'chores')

class ChoreSerializer(serializers.HyperlinkedModelSerializer):
  household = serializers.HyperlinkedRelatedField(
    view_name = 'household_detail',
    read_only = True
  )

  household_id = serializers.PrimaryKeyRelatedField(
    queryset = Household.objects.all(),
    source = 'household'
  )

  # doer = serializers.HyperlinkedRelatedField(
  #   required = False,
  #   view_name = 'user_detail',
  #   read_only = True,
  # )

  doer = UserSerializer(
    # many = True,
    read_only = True
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



class HouseholdSerializer(serializers.HyperlinkedModelSerializer):
  users = UserSerializer(
    many = True,
    read_only = True
  )

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