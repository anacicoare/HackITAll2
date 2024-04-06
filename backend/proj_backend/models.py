from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Location(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    city = models.CharField(max_length=255)


class NormalUser(models.Model):
    email = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.email


class ProducerUser(models.Model):
    email = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.email


class PartnerUser(models.Model):
    email = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.email


class Products(models.Model):
    name = models.CharField(max_length=255)
    price = models.CharField(max_length=255)
    carbon_footprint = models.CharField(max_length=255)

    def __str__(self):
        return self.name
