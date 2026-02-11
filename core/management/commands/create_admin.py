from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

User = get_user_model()

class Command(BaseCommand):
    help = "Create admin user if not exists"

    def handle(self, *args, **kwargs):
        email = os.environ.get("ADMIN_EMAIL")
        username = os.environ.get("ADMIN_USERNAME")
        password = os.environ.get("ADMIN_PASSWORD")

        if not email or not username or not password:
            self.stdout.write("Admin env vars not set")
            return

        if User.objects.filter(email=email).exists():
            self.stdout.write("Admin already exists")
            return

        User.objects.create_superuser(
            email=email,
            username=username,
            password=password
        )

        self.stdout.write("Admin user created successfully")
