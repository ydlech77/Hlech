from django.db import models
from django.conf import settings

class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='core_profile'
    )
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.email
