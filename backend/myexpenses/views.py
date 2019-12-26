from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from django.contrib.auth.decorators import permission_required
from rest_framework import views
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser, FileUploadParser, MultiPartParser
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.http import HttpResponse
from django.db.models import Sum, Subquery


from myexpenses.models import Owner, Category, Expense, Media
from myexpenses.serializers import OwnerOptionSerializer, CategoryOptionSerializer, ExpenseListSerializer, ExpenseFormSerializer, MediaSerializer, ExpenseChartSerializer


@swagger_auto_schema(method='GET', responses={200: OwnerOptionSerializer(many=True)})
@api_view(['GET'])
def owner_option_list(request):
    owners = Owner.objects.all()
    serializer = OwnerOptionSerializer(owners, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: CategoryOptionSerializer(many=True)})
@api_view(['GET'])
def category_option_list(request):
    categories = Category.objects.all()
    serializer = CategoryOptionSerializer(categories, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: ExpenseListSerializer(many=True)})
@api_view(['GET'])
@permission_required('myexpenses.view_expense', raise_exception=True)
def expenses_list(request):
    owners = Expense.objects.all()
    serializer = ExpenseListSerializer(owners, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: ExpenseChartSerializer(many=True)})
@api_view(['GET'])
def expenses_chart(request):
    # expenses_per_owner = Expense.objects.raw('''
    #     SELECT *,
    #     SUM(amount) as total_amount
    #     FROM myexpenses_expense e
    #     INNER JOIN myexpenses_owner o
    #     ON e.owner =  myexpenses_owner.id
    #     GROUP BY o.id;
    #     ''')

    # expenses_per_owner = Expense.objects.all().select_related(
    #     'owner').annotate(total_amount=Sum('amount'))

    expenses_per_owner = Expense.objects.all()
    serializer = ExpenseChartSerializer(expenses_per_owner, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=ExpenseFormSerializer, responses={200: ExpenseFormSerializer()})
@api_view(['POST'])
@permission_required('myexpenses.add_expense', raise_exception=True)
def expense_form_create(request):
    data = JSONParser().parse(request)
    serializer = ExpenseFormSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='POST', request_body=OwnerOptionSerializer, responses={200: OwnerOptionSerializer()})
@api_view(['POST'])
@permission_required('myexpenses.add_owner', raise_exception=True)
def person_form_create(request):
    data = JSONParser().parse(request)
    serializer = OwnerOptionSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=ExpenseFormSerializer, responses={200: ExpenseFormSerializer()})
@api_view(['PUT'])
@permission_required('myexpenses.change_expense', raise_exception=True)
def expense_form_update(request, pk):
    try:
        expense = Expense.objects.get(pk=pk)
    except Expense.DoesNotExist:
        return Response({'error': 'Expense does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = ExpenseFormSerializer(expense, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=OwnerOptionSerializer, responses={200: OwnerOptionSerializer()})
@api_view(['PUT'])
@permission_required('myexpenses.change_owner', raise_exception=True)
def person_form_update(request, pk):
    try:
        owner = Owner.objects.get(pk=pk)
    except Owner.DoesNotExist:
        return Response({'error': 'Owner does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = OwnerOptionSerializer(owner, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: ExpenseFormSerializer()})
@api_view(['GET'])
@permission_required('myexpenses.view_expense', raise_exception=True)
def expense_form_get(request, pk):
    try:
        expense = Expense.objects.get(pk=pk)
    except Expense.DoesNotExist:
        return Response({'error': 'Expense does not exist.'}, status=404)

    serializer = ExpenseFormSerializer(expense)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: OwnerOptionSerializer()})
@api_view(['GET'])
@permission_required('myexpenses.view_expense', raise_exception=True)
def person_form_get(request, pk):
    try:
        owner = Owner.objects.get(pk=pk)
    except Owner.DoesNotExist:
        return Response({'error': 'Owner does not exist.'}, status=404)

    serializer = OwnerOptionSerializer(owner)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('myexpenses.delete_expense', raise_exception=True)
def expense_delete(request, pk):
    try:
        expense = Expense.objects.get(pk=pk)
    except Owner.DoesNotExist:
        return Response({'error': 'Expense does not exist.'}, status=404)
    expense.delete()
    return Response(status=204)


@api_view(['DELETE'])
@permission_required('myexpenses.delete_owner', raise_exception=True)
def person_form_delete(request, pk):
    try:
        owner = Owner.objects.get(pk=pk)
    except Owner.DoesNotExist:
        return Response({'error': 'Person does not exist.'}, status=404)
    owner.delete()
    return Response(status=204)


#######
# media


class FileUploadView(views.APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        file = request.FILES['file']
        file_input = {
            'original_file_name': file.name,
            'content_type': file.content_type,
            'size': file.size,
        }
        serializer = MediaSerializer(data=file_input)
        if serializer.is_valid():
            serializer.save()
            default_storage.save(
                'media/' + str(serializer.data['id']), ContentFile(file.read()))
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


def media_download(request, pk):
    media = Media.objects.get(pk=pk)
    data = default_storage.open('media/' + str(pk)).read()
    content_type = media.content_type
    response = HttpResponse(data, content_type=content_type)
    original_file_name = media.original_file_name
    response['Content-Disposition'] = 'inline; filename=' + original_file_name
    return response


@swagger_auto_schema(method='GET', responses={200: MediaSerializer()})
@api_view(['GET'])
def media_get(request, pk):
    try:
        media = Media.objects.get(pk=pk)
    except Expense.DoesNotExist:
        return Response({'error': 'Media does not exist.'}, status=404)

    serializer = MediaSerializer(media)
    return Response(serializer.data)
