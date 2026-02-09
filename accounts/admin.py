from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    model = User

    list_display = ("email", "username", "is_staff", "is_active")
    list_filter = ("is_staff", "is_active")

    ordering = ("email",)
    search_fields = ("email", "username")

    fieldsets = (
        (None, {"fields": ("email", "username", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login",)}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "username", "password1", "password2", "is_staff", "is_active"),
        }),
    )

    filter_horizontal = ("groups", "user_permissions")
