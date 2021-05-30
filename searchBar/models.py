from django.db import models

# Create your models here.

class Company_symbol(models.Model):
    symbol = models.CharField(max_length=500)
    name = models.CharField(max_length=500)
    industry = models.CharField(max_length=500)
    country = models.CharField(max_length=500)
    
    class Meta:
        verbose_name_plural = "Company_symbol"

    def __str__(self):
        return self.name