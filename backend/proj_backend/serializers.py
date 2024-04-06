from rest_framework import serializers
from proj_backend.models import Location, NormalUser, ProducerUser, PartnerUser, Products

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

