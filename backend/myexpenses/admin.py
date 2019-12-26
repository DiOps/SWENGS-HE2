from django.contrib import admin
from .models import *


class ExpenseAdmin(admin.ModelAdmin):

    list_filter = ('categories__name', )


class OwnerAdmin(admin.ModelAdmin):
    pass


class CategoryAdmin(admin.ModelAdmin):
    pass


class MediaAdmin(admin.ModelAdmin):
    pass


admin.site.register(Expense, ExpenseAdmin)
admin.site.register(Owner, OwnerAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Media, MediaAdmin)
