from django.conf.urls import url
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token
from myexpenses.views import FileUploadView

from . import views

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('owner/options', views.owner_option_list),
    path('expense/list', views.expenses_list),
    path('expense/chart', views.expenses_chart),
    path('expense/create', views.expense_form_create),
    path('expense/<int:pk>/get', views.expense_form_get),
    path('expense/<int:pk>/update', views.expense_form_update),
    path('expense/<int:pk>/delete', views.expense_delete),
    path('category/options', views.category_option_list),
    path('person/create', views.person_form_create),
    path('person/<int:pk>/get', views.person_form_get),
    path('person/<int:pk>/update', views.person_form_update),
    path('person/<int:pk>/delete', views.person_form_delete),

    url(r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger',
                                           cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc',
                                         cache_timeout=0), name='schema-redoc'),
    url(r'^api-token-auth/', obtain_jwt_token),

    url(r'^media$', FileUploadView.as_view()),
    path('media/<int:pk>', views.media_download),
    path('media/<int:pk>/get', views.media_get),

]
