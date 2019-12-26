from rest_framework import serializers
from .models import Owner, Category, Expense, Media


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'original_file_name', 'content_type', 'size']


class CategoryOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class OwnerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'


class ExpenseListSerializer(serializers.ModelSerializer):
    owner_first_name = serializers.SerializerMethodField()

    class Meta:
        model = Expense
        fields = ['id', 'title', 'amount', 'date', 'owner_first_name']

    def get_owner_first_name(self, obj):
        return obj.owner.first_name if obj.owner else ''


class ExpenseChartSerializer(serializers.ModelSerializer):
    # total_amount = serializers.IntegerField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = Expense
        fields = ['name', 'amount']

    def get_name(self, obj):
        return obj.owner.first_name if obj.owner else ''


class ExpenseFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expense
        fields = '__all__'
