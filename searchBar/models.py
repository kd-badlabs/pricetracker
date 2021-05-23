from django.db import models

# Create your models here.

class Company_symbol(models.Model):
    symbol = models.CharField(max_length=10)
    name = models.CharField(max_length=200)
    industry = models.CharField(max_length=200)
    country = models.CharField(max_length=100)
    
    class Meta:
        verbose_name_plural = "Company_symbol"

    def __str__(self):
        return self.name