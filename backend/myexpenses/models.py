from django.db import models


class Media(models.Model):
    original_file_name = models.TextField()
    content_type = models.TextField()
    size = models.PositiveIntegerField()

    class Meta:
        verbose_name_plural = "Media"

    def __str__(self):
        return self.original_file_name


class Owner(models.Model):

    first_name = models.TextField()
    last_name = models.TextField()
    year_of_birth = models.IntegerField()
    getsSalary = models.BooleanField(null=True, blank=True)
    job = models.TextField(null=True, blank=True)

    def __str__(self):
        return '%s %s (%s)' % (self.first_name, self.last_name, self.year_of_birth)


class Expense(models.Model):

    title = models.TextField()
    date = models.DateField()
    description = models.TextField(null=True, blank=True)
    amount = models.PositiveIntegerField(help_text='in €')
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, null=True)
    categories = models.ManyToManyField('Category', blank=True)
    pictures = models.ManyToManyField('Media', blank=True)

    def __str__(self):
        return self.title


class Category(models.Model):

    name = models.TextField()
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return '%s' % (self.name)
