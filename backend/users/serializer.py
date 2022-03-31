from rest_framework import serializers
from users.models import User,Tags

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password']
        ## Hide the password in the return
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
       
        # This will hash the password
        if (password is not None):
            instance.set_password(password)
        instance.save()
        return instance
    # Hash the password

class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ['tag', 'user']

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance
    # Hash the password