from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework import status
from datetime import datetime,timedelta
import json

from .forms import RegisterSerializer
@api_view(['POST'])
def registration(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from .models import Register
@api_view(['POST'])
@csrf_exempt  
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = Register.objects.get(email=username, password=password)
            if request.data.get('endpoint') == 'AdminLogin' and user.role != 'Admin':
                return Response('Access denied', status=status.HTTP_403_FORBIDDEN)

            return Response({'message': 'Login successful', 'role': user.role, 'id': user.id, 'name': user.name}, status=status.HTTP_200_OK)
        except Register.DoesNotExist:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)


from .forms import FrontOfficeSerializer
@api_view(['POST'])
@csrf_exempt
def frontoffice_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if FrontOffice.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = FrontOfficeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from .forms import FirstFloorSerializer
@api_view(['POST'])
@csrf_exempt
def firstfloor_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if FirstFloor.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = FirstFloorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import SecondFloorSerializer
@api_view(['POST'])
@csrf_exempt
def secondfloor_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if SecondFloor.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = SecondFloorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import ThirdFloorSerializer
@api_view(['POST'])
@csrf_exempt
def thirdfloor_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if ThirdFloor.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = ThirdFloorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from .forms import FirstSuitSerializer
@api_view(['POST'])
@csrf_exempt
def firstsuit_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if FirstSuit.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = FirstSuitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import SecondSuitSerializer
@api_view(['POST'])
@csrf_exempt
def secondsuit_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if SecondSuit.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = SecondSuitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import LabSerializer
@api_view(['POST'])
@csrf_exempt
def lab_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if Lab.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = LabSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import CTSerializer
@api_view(['POST'])
@csrf_exempt
def CT_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if CT.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = CTSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import MRISerializer
@api_view(['POST'])
@csrf_exempt
def MRI_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if MRI.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = MRISerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import XraySerializer
@api_view(['POST'])
@csrf_exempt
def Xray_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if Xray.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = XraySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import OPDSerializer
@api_view(['POST'])
@csrf_exempt
def OPD_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if OPD.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = OPDSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import OTSerializer
@api_view(['POST'])
@csrf_exempt
def OT_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if OT.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = OTSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import HRSerializer
@api_view(['POST'])
@csrf_exempt
def HR_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if HR.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = HRSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import PhysiotherapySerializer
@api_view(['POST'])
@csrf_exempt
def physiotherapy_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if Physiotherapy.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = PhysiotherapySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import DialysisSerializer
@api_view(['POST'])
@csrf_exempt
def dialysis_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if Dialysis.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = DialysisSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import OPPharmacySerializer
@api_view(['POST'])
@csrf_exempt
def OPPharmacy_data(request):
    if request.method == 'POST':
        serializer = OPPharmacySerializer(request.POST)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import IPPharmacySerializer
@api_view(['POST'])
@csrf_exempt
def IPPharmacy_data(request):
    if request.method == 'POST':
        serializer = IPPharmacySerializer(request.POST)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import EmergencyRoomSerializer
@api_view(['POST'])
@csrf_exempt
def emergency_room_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if EmergencyRoom.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = EmergencyRoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from .forms import MRDSerializer
@api_view(['POST'])
@csrf_exempt
def MRD_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if MRD.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = MRDSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
from .forms import ChemoWardSerializer
@api_view(['POST'])
@csrf_exempt
def chemo_ward_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if ChemoWard.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = ChemoWardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import RecoveryWardSerializer
@api_view(['POST'])
@csrf_exempt
def recovery_ward_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if RecoveryWard.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = RecoveryWardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import SICUSerializer
@api_view(['POST'])
@csrf_exempt
def SICU_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if SICU.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = SICUSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import MICUSerializer
@api_view(['POST'])
@csrf_exempt
def MICU_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if MICU.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = MICUSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
from .forms import NICUSerializer
@api_view(['POST'])
@csrf_exempt
def NICU_data(request):
    if request.method == 'POST':
        selected_date = request.data.get('selectedDate')
        
        # Check if data for the selected date already exists
        if NICU.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # If no existing data, proceed with saving
        serializer = NICUSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .forms import FirstFloorRawDataSerializer
@api_view(['POST'])
@csrf_exempt
def firstfloor_rawdata(request):
    if request.method == 'POST':
        data = request.data
        id = data.get('id')
        name = data.get('name')
        selected_date = data.get('selectedDate')
        raw_data = data.get('raw_data', [])

        # Check if data for the selected date already exists
        if FirstFloorRawData.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)

        if selected_date and raw_data:
            record_data = {
                'id': id,
                'name': name,
                'selectedDate': selected_date,
                'raw_data': raw_data
            }
            serializer = FirstFloorRawDataSerializer(data=record_data)

            if serializer.is_valid():
                serializer.save()
                return Response("Data submitted successfully", status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

from .forms import FirstSuitRawDataSerializer
@api_view(['POST'])
@csrf_exempt
def firstsuit_rawdata(request):
    if request.method == 'POST':
        data = request.data
        id = data.get('id')
        name = data.get('name')
        selected_date = data.get('selectedDate')
        raw_data = data.get('raw_data', [])

        # Check if data for the selected date already exists
        if FirstSuitRawData.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)

        if selected_date and raw_data:
            record_data = {
                'id': id,
                'name': name,
                'selectedDate': selected_date,
                'raw_data': raw_data
            }
            serializer = FirstSuitRawDataSerializer(data=record_data)

            if serializer.is_valid():
                serializer.save()
                return Response("Data submitted successfully", status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

from .forms import SecondFloorRawDataSerializer
@api_view(['POST'])
@csrf_exempt
def secondfloor_rawdata(request):
    if request.method == 'POST':
        data = request.data
        id = data.get('id')
        name = data.get('name')
        selected_date = data.get('selectedDate')
        raw_data = data.get('raw_data', [])

        # Check if data for the selected date already exists
        if SecondFloorRawData.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)

        if selected_date and raw_data:
            record_data = {
                'id': id,
                'name': name,
                'selectedDate': selected_date,
                'raw_data': raw_data
            }
            serializer = SecondFloorRawDataSerializer(data=record_data)

            if serializer.is_valid():
                serializer.save()
                return Response("Data submitted successfully", status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

from .forms import SecondSuitRawDataSerializer
@api_view(['POST'])
@csrf_exempt
def secondsuit_rawdata(request):
    if request.method == 'POST':
        data = request.data
        id = data.get('id')
        name = data.get('name')
        selected_date = data.get('selectedDate')
        raw_data = data.get('raw_data', [])

        # Check if data for the selected date already exists
        if SecondSuitRawData.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)

        if selected_date and raw_data:
            record_data = {
                'id': id,
                'name': name,
                'selectedDate': selected_date,
                'raw_data': raw_data
            }
            serializer = SecondSuitRawDataSerializer(data=record_data)

            if serializer.is_valid():
                serializer.save()
                return Response("Data submitted successfully", status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
from .forms import ThirdFloorRawDataSerializer
@api_view(['POST'])
@csrf_exempt
def thirdfloor_rawdata(request):
    if request.method == 'POST':
        data = request.data
        id = data.get('id')
        name = data.get('name')
        selected_date = data.get('selectedDate')
        raw_data = data.get('raw_data', [])

        # Check if data for the selected date already exists
        if ThirdFloorRawData.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)

        if selected_date and raw_data:
            record_data = {
                'id': id,
                'name': name,
                'selectedDate': selected_date,
                'raw_data': raw_data
            }
            serializer = ThirdFloorRawDataSerializer(data=record_data)

            if serializer.is_valid():
                serializer.save()
                return Response("Data submitted successfully", status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

from .forms import SICURawDataSerializer
@api_view(['POST'])
@csrf_exempt
def sicu_rawdata(request):
    if request.method == 'POST':
        data = request.data
        id = data.get('id')
        name = data.get('name')
        selected_date = data.get('selectedDate')
        raw_data = data.get('raw_data', [])

        # Check if data for the selected date already exists
        if SICURawData.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)

        if selected_date and raw_data:
            record_data = {
                'id': id,
                'name': name,
                'selectedDate': selected_date,
                'raw_data': raw_data
            }
            serializer = SICURawDataSerializer(data=record_data)

            if serializer.is_valid():
                serializer.save()
                return Response("Data submitted successfully", status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

from .forms import MICURawDataSerializer
@api_view(['POST'])
@csrf_exempt
def micu_rawdata(request):
    if request.method == 'POST':
        data = request.data
        id = data.get('id')
        name = data.get('name')
        selected_date = data.get('selectedDate')
        raw_data = data.get('raw_data', [])

        # Check if data for the selected date already exists
        if MICURawData.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)

        if selected_date and raw_data:
            record_data = {
                'id': id,
                'name': name,
                'selectedDate': selected_date,
                'raw_data': raw_data
            }
            serializer = MICURawDataSerializer(data=record_data)

            if serializer.is_valid():
                serializer.save()
                return Response("Data submitted successfully", status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
from .forms import NICURawDataSerializer
@api_view(['POST'])
@csrf_exempt
def nicu_rawdata(request):
    if request.method == 'POST':
        data = request.data
        id = data.get('id')
        name = data.get('name')
        selected_date = data.get('selectedDate')
        raw_data = data.get('raw_data', [])

        # Check if data for the selected date already exists
        if NICURawData.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)

        if selected_date and raw_data:
            record_data = {
                'id': id,
                'name': name,
                'selectedDate': selected_date,
                'raw_data': raw_data
            }
            serializer = NICURawDataSerializer(data=record_data)

            if serializer.is_valid():
                serializer.save()
                return Response("Data submitted successfully", status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

from .forms import EmergencyRoomRawDataSerializer
@api_view(['POST'])
@csrf_exempt
def emergencyroom_rawdata(request):
    if request.method == 'POST':
        data = request.data
        id = data.get('id')
        name = data.get('name')
        selected_date = data.get('selectedDate')
        raw_data = data.get('raw_data', [])

        # Check if data for the selected date already exists
        if EmergencyRoomRawData.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)

        if selected_date and raw_data:
            record_data = {
                'id': id,
                'name': name,
                'selectedDate': selected_date,
                'raw_data': raw_data
            }
            serializer = EmergencyRoomRawDataSerializer(data=record_data)

            if serializer.is_valid():
                serializer.save()
                return Response("Data submitted successfully", status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

from .forms import ChemoWardRawDataSerializer
@api_view(['POST'])
@csrf_exempt
def chemoward_rawdata(request):
    if request.method == 'POST':
        data = request.data
        id = data.get('id')
        name = data.get('name')
        selected_date = data.get('selectedDate')
        raw_data = data.get('raw_data', [])

        # Check if data for the selected date already exists
        if ChemoWardRawData.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)

        if selected_date and raw_data:
            record_data = {
                'id': id,
                'name': name,
                'selectedDate': selected_date,
                'raw_data': raw_data
            }
            serializer = ChemoWardRawDataSerializer(data=record_data)

            if serializer.is_valid():
                serializer.save()
                return Response("Data submitted successfully", status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

from .forms import RecoverywardRawDataSerializer
@api_view(['POST'])
@csrf_exempt
def recoveryward_rawdata(request):
    if request.method == 'POST':
        data = request.data
        id = data.get('id')
        name = data.get('name')
        selected_date = data.get('selectedDate')
        raw_data = data.get('raw_data', [])

        # Check if data for the selected date already exists
        if RecoverywardRawData.objects.filter(selectedDate=selected_date).exists():
            return Response({'error': 'Data already exists for this date.'}, status=status.HTTP_400_BAD_REQUEST)

        if selected_date and raw_data:
            record_data = {
                'id': id,
                'name': name,
                'selectedDate': selected_date,
                'raw_data': raw_data
            }
            serializer = RecoverywardRawDataSerializer(data=record_data)

            if serializer.is_valid():
                serializer.save()
                return Response("Data submitted successfully", status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@csrf_exempt
def get_export_data(request):
    if request.method == 'GET':
        ward = request.GET.get('ward')
        year = request.GET.get('year')
        month = request.GET.get('month')
        date = request.GET.get('date')
        
        query_params = {}

        if ward and date:
            query_params['ward'] = ward
            parsed_date = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fZ")
            query_params['selectedDate'] = parsed_date.date()

        if ward and year and month:
            start_date = datetime(int(year), int(month), 1)
            end_date = start_date.replace(day=1, month=int(month)+1) if int(month) < 12 else start_date.replace(year=int(year)+1, month=1)
            query_params['ward'] = ward
            query_params['selectedDate__gte'] = start_date
            query_params['selectedDate__lt'] = end_date

        if query_params:
            try:
                selected_model = get_ward_model(ward)
                data = selected_model.objects.filter(**query_params).values()
                return JsonResponse(list(data), safe=False)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)
        else:
            return JsonResponse({'error': 'Please select a ward, year, and month'}, status=400)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)
    

@csrf_exempt
def update_export_data(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            for row in data:
                selected_date = datetime.strptime(row.get('selectedDate'), "%Y-%m-%dT%H:%M:%S.%fZ").date()
                ward = row.get('ward')
                selected_model = get_ward_model(ward)

                try:
                    # Update the record based on selected_date
                    existing_instance = selected_model.objects.get(selectedDate=selected_date)
                except selected_model.DoesNotExist:
                    return JsonResponse({'error': f'Instance with selectedDate {selected_date} does not exist'}, status=404)
                
                for key, value in row.items():
                    if key not in ['_id', 'ward', 'selectedDate']:
                        setattr(existing_instance, key, value)
                existing_instance.save()
                
            return JsonResponse({'success': 'Data updated successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only PUT requests are allowed'}, status=405)
    

@csrf_exempt
def get_export_rawdata(request):
    if request.method == 'GET':
        ward = request.GET.get('ward')
        year = request.GET.get('year')
        month = request.GET.get('month')
        date = request.GET.get('date')
        
        query_params = {}

        if ward and date:
            query_params['ward'] = ward
            parsed_date = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fZ")
            query_params['selectedDate'] = parsed_date.date()

        if ward and year and month:
            start_date = datetime(int(year), int(month), 1)
            end_date = start_date.replace(day=1, month=int(month)+1) if int(month) < 12 else start_date.replace(year=int(year)+1, month=1)
            query_params['ward'] = ward
            query_params['selectedDate__gte'] = start_date
            query_params['selectedDate__lt'] = end_date

        if query_params:
            try:
                selected_model = get_rawdata_model(ward)
                data = selected_model.objects.filter(**query_params).values()
                return JsonResponse(list(data), safe=False)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)
        else:
            return JsonResponse({'error': 'Please select a ward, year, and month'}, status=400)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)
    

@csrf_exempt
def update_export_rawdata(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            for row in data:
                selected_date = datetime.strptime(row.get('selectedDate'), "%Y-%m-%dT%H:%M:%S.%fZ").date()
                ward = row.get('ward')
                selected_model = get_ward_model(ward)

                try:
                    # Update the record based on selected_date
                    existing_instance = selected_model.objects.get(selectedDate=selected_date)
                except selected_model.DoesNotExist:
                    return JsonResponse({'error': f'Instance with selectedDate {selected_date} does not exist'}, status=404)
                
                for key, value in row.items():
                    if key not in ['_id', 'ward', 'selectedDate']:
                        setattr(existing_instance, key, value)
                existing_instance.save()
                
            return JsonResponse({'success': 'Data updated successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only PUT requests are allowed'}, status=405)


from .migrations.Views.constant import floor_beds
def availabilityofroomsandbeds(request, ward):
    try:
        # Get the corresponding model class based on the selected ward
        selected_model = get_ward_model(ward)
        if selected_model:
            # Query the selected model for occupancy date
            yesterday = (datetime.today() - timedelta(days=1)).date()
            form_data = selected_model.objects.filter(selectedDate=yesterday).first()
            occupied_beds = int(form_data.numberOfBedsOccupied) if form_data else 0
            
            # Logging for debugging
            print('Yesterday:', yesterday)
            print('Form Data:', form_data)
            if form_data:
                print('Occupied Beds:', form_data.numberOfBedsOccupied)
            else:
                print('No data found for the given date.')
            
        else:
            return JsonResponse({'error': 'Ward type not recognized'}, status=400)

        # Calculate the number of available beds using data from constants.py
        total_beds = floor_beds.get(ward, 0)
        available_beds = total_beds - occupied_beds

        # Return the data in JSON format
        return JsonResponse({
            'ward': ward,
            'numberOfBedsOccupied': occupied_beds,
            'numberOfBedsAvailable': available_beds
        })

    except Exception as e:
        # Log the exception for debugging purposes
        print(f"Error: {e}")
        # Return a more descriptive error message
        return JsonResponse({'error': 'An error occurred while processing your request'}, status=500)
    

from .models import FrontOffice,FirstFloor,FirstSuit,SecondFloor,SecondSuit,ThirdFloor,Lab,CT,MRI,Xray,OPPharmacy,IPPharmacy
from .models import OT,MRD,MICU,NICU,SICU,RecoveryWard,ChemoWard,Physiotherapy,Dialysis,EmergencyRoom,OPD,HR 
def get_ward_model(ward):
    ward_model_map = {
        'Front Office': FrontOffice,
        "HR": HR,
        'First Floor': FirstFloor,
        'First Suit': FirstSuit,
        'Second Floor': SecondFloor,
        'Second Suit': SecondSuit,
        'Third Floor': ThirdFloor,
        'Lab': Lab,
        'CT': CT,
        'MRI': MRI,
        'X-Ray': Xray,
        'OT': OT,
        'MRD': MRD,
        'MICU': MICU,
        'NICU': NICU,
        'SICU': SICU,
        'Recovery Ward': RecoveryWard,
        'Chemo Ward': ChemoWard,
        'Physiotherapy': Physiotherapy,
        'Dialysis': Dialysis,
        'ER': EmergencyRoom,
        'OPD': OPD,
        'IPPharmacy': IPPharmacy,
        'OPPharmacy': OPPharmacy
    }
    selected_model = ward_model_map.get(ward, None)
    if selected_model:
        return selected_model
    else:
        raise ValueError('Ward type not recognized')
    

from .models import FirstFloorRawData,SecondFloorRawData,SecondSuitRawData,FirstSuitRawData,ThirdFloorRawData 
from .models import NICURawData,MICURawData,SICURawData,EmergencyRoomRawData,RecoverywardRawData,ChemoWardRawData 
def get_rawdata_model(ward):
    rawdata_model_map = {
        'First Floor Raw Data': FirstFloorRawData,
        'First Suit Raw Data': FirstSuitRawData,
        'Second Floor Raw Data': SecondFloorRawData,
        'Second Suit Raw Data': SecondSuitRawData,
        'Third Floor Raw Data': ThirdFloorRawData,
        'SICU Raw Data': SICURawData,
        'MICU Raw Data': MICURawData,
        'NICU Raw Data': NICURawData,
        'EmergencyRoom Raw Data': EmergencyRoomRawData,
        'Recoveryward Raw Data': RecoverywardRawData,
        'ChemoWard Raw Data': ChemoWardRawData,
    }
    selected_rawdata_model = rawdata_model_map.get(ward, None)
    if selected_rawdata_model:
        return selected_rawdata_model
    else:
        raise ValueError('Ward type not recognized')


from collections import defaultdict
def get_formula_data(request):
    if request.method == 'GET':
        year = request.GET.get('year')
        month = request.GET.get('month')
        
        # Debugging: Print received parameters
        # print("Received parameters - year:", year, "month:", month)  
        
        query_params = {}

        if year and month:
            # Construct the start and end date for the selected month and year
            start_date = datetime(int(year), int(month), 1)
            end_date = start_date.replace(day=1, month=int(month)+1) if int(month) < 12 else start_date.replace(year=int(year)+1, month=1)
            query_params['selectedDate__gte'] = start_date
            query_params['selectedDate__lt'] = end_date

        # Debugging: Print query parameters
        # print("Query parameters:", query_params)  

        if query_params:  
            try:
                all_data = []
                totalNumberOfAdmissions = 0  # Initialize total admissions counter
                sumOfTimeTakenforInitialAssessment = 0  # Initialize total time taken counter
                numberOfTestsPerformed = 0  # Initialize total admissions counter
                numberOfReportingErrors = 0  # Initialize total time taken counter
                numberOfStaffAdheringToSafety = 0
                numberOfStaffAudited = 0
                totalNumberOfOpportunitiesOfMedicationErrors = 0
                totalNumberOfMedicationErrors = 0
                numberOfTransfusionReactions = 0
                numberOfUnitsTransfused = 0
                actualDeathsInICU = 0
                predictedDeathsInICU = 0
                numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer = 0
                totalNumberOfRestraintPatientsDays = 0
                numberOfReturnsToEmergencyWithin72hoursWithSimilarPresentingComplaints =0
                numberOfPatientsWhoHaveComeToTheEmergency =0
                numberOfUrinaryCatheterAssociatedUtisInThatMonth=0
                numberOfUrinaryCatheterDaysInThatMonth=0
                numberOfVentilatorAssociatedPneumonia=0
                numberOfVentilatorDays=0
                numberCentralLineAssociatedBloodStreamInfectionsInAMonth=0
                numberOfCentralLineDaysInThatMonth=0
                numberOfSurgicalSiteInfectionsInAGivenMonth=0
                numberOfSurgeriesPlannedInTheOt=0
                sumOfTimeTakenForBloodAndBloodComponents=0
                totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved=0
                numberOfNursingStaff=0
                numberOfBedsOccupied=0
                numberOfPatientsDischarged=0
                sumOfTimeTakenForDischarge=0
                numberOfMedicalRecords=0
                numberOfDischarge=0
                Numberofdeath=0
                waitingTimeForDiagnostics=0
                numberOfPatientsReportedInDiagnostics=0
                sumTotalPatientInTimeForConsultation=0
                numberOfOutPatients=0
                numberOfNearMissReported=0
                numberOfIncidentsReported=0
                totalNumberOfHandoversDoneAppropriately=0
                totalNumberOfHandoverOpportunities=0
                totalNumberOfPrescriptionInCapitalLetters=0
                totalNumberOfPrescriptionSampled=0
                numberOfStockOutEmergencyDrugs=0
                numberOfInPatients=0
                numberOfPatientsDevelopingAdverseDrugReactions=0
                numberOfUnplannedReturnToOTOrReexploration=0
                numberOfSurgeriesWhereTheProcedureWasFollowed=0
                numberOfSurgeriesPlannedInTheOt=0
                numberOfPatientsWhoDidReceiveAppropriateProphylacticAntibiotic=0
                numberOfCasesReScheduledOrCanceled=0

                # Define a dictionary of model classes
                model_classes = {
        'Front Office': FrontOffice,
        'First Floor': FirstFloor,
        'First Suit': FirstSuit,
        'Second Floor': SecondFloor,
        'Second Suit': SecondSuit,
        'Third Floor': ThirdFloor,
        'Lab': Lab,
        'CT': CT,
        'MRI': MRI,
        'X-Ray': Xray,
        'OT': OT,
        'MRD': MRD,
        'MICU': MICU,
        'NICU': NICU,
        'SICU': SICU,
        'Recovery Ward': RecoveryWard,
        'Chemo Ward': ChemoWard,
        'Physiotherapy': Physiotherapy,
        'Dialysis': Dialysis,
        'ER': EmergencyRoom,
        'OPD':OPD,
        'OPPharmacy':OPPharmacy
                }

                # Inside the try block
                for ward, model in model_classes.items():
                    data = model.objects.filter(**query_params).values()
                    # print(f"Retrieved data for {ward}:", data)  # Add this line for debugging
                    all_data.extend(data)
                    for entry in data:
                        totalNumberOfAdmissions += int(entry.get('totalNumberOfAdmissions', 0))
                        sumOfTimeTakenforInitialAssessment += int(entry.get('sumOfTimeTakenforInitialAssessment', 0))
                        numberOfTestsPerformed += int(entry.get('numberOfTestsPerformed', 0))
                        numberOfReportingErrors += int(entry.get('numberOfReportingErrors', 0))
                        numberOfStaffAdheringToSafety += int(entry.get('numberOfStaffAdheringToSafety', 0))
                        numberOfStaffAudited += int(entry.get('numberOfStaffAudited', 0))
                        totalNumberOfOpportunitiesOfMedicationErrors += int(entry.get('totalNumberOfOpportunitiesOfMedicationErrors', 0))
                        totalNumberOfMedicationErrors += int(entry.get('totalNumberOfMedicationErrors', 0))
                        numberOfTransfusionReactions += int(entry.get('numberOfTransfusionReactions', 0))
                        numberOfUnitsTransfused += int(entry.get('numberOfUnitsTransfused', 0))
                        actualDeathsInICU += int(entry.get('actualDeathsInICU', 0))
                        predictedDeathsInICU += int(entry.get('predictedDeathsInICU', 0))
                        numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer += int(entry.get('numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer', 0))
                        totalNumberOfRestraintPatientsDays += int(entry.get('totalNumberOfRestraintPatientsDays', 0))
                        numberOfReturnsToEmergencyWithin72hoursWithSimilarPresentingComplaints += int (entry.get('numberOfReturnsToEmergencyWithin72hoursWithSimilarPresentingComplaints',0))
                        numberOfPatientsWhoHaveComeToTheEmergency += int (entry.get('numberOfPatientsWhoHaveComeToTheEmergency',0))
                        numberOfUrinaryCatheterAssociatedUtisInThatMonth += int(entry.get('numberOfUrinaryCatheterAssociatedUtisInThatMonth',0))
                        numberOfUrinaryCatheterDaysInThatMonth += int(entry.get('numberOfUrinaryCatheterDaysInThatMonth',0))
                        numberOfVentilatorAssociatedPneumonia += int (entry.get('numberOfVentilatorAssociatedPneumonia',0))
                        numberOfVentilatorDays += int (entry.get('numberOfVentilatorDays',0))
                        numberOfCentralLineDaysInThatMonth += int(entry.get('numberOfCentralLineDaysInThatMonth',0))
                        numberCentralLineAssociatedBloodStreamInfectionsInAMonth += int(entry.get('numberCentralLineAssociatedBloodStreamInfectionsInAMonth',0))
                        numberOfSurgicalSiteInfectionsInAGivenMonth += int(entry.get('numberOfSurgicalSiteInfectionsInAGivenMonth',0))
                        numberOfSurgeriesPlannedInTheOt += int(entry.get('numberOfSurgeriesPlannedInTheOt',0))
                        sumOfTimeTakenForBloodAndBloodComponents += int(entry.get("sumOfTimeTakenForBloodAndBloodComponents",0))
                        totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved += int(entry.get('totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved',0))
                        numberOfNursingStaff += int(entry.get('numberOfNursingStaff',0))
                        numberOfBedsOccupied += int(entry.get('numberOfBedsOccupied',0))
                        numberOfPatientsDischarged += int(entry.get('numberOfPatientsDischarged',0))
                        sumOfTimeTakenForDischarge += int(entry.get('sumOfTimeTakenForDischarge',0))
                        numberOfMedicalRecords += int (entry.get('numberOfMedicalRecords',0))
                        numberOfDischarge += int(entry.get('numberOfDischarge',0))
                        Numberofdeath += int(entry.get('Numberofdeath',0))
                        waitingTimeForDiagnostics += int(entry.get('waitingTimeForDiagnostics',0))
                        numberOfPatientsReportedInDiagnostics += int(entry.get('numberOfPatientsReportedInDiagnostics',0))
                        sumTotalPatientInTimeForConsultation += int(entry.get('sumTotalPatientInTimeForConsultation',0))
                        numberOfOutPatients += int(entry.get('numberOfOutPatients',0))
                        numberOfNearMissReported += int(entry.get('numberOfNearMissReported',0))
                        numberOfIncidentsReported += int (entry.get('numberOfIncidentsReported',0))
                        totalNumberOfHandoversDoneAppropriately += int((entry.get('totalNumberOfHandoversDoneAppropriately',0)))
                        totalNumberOfHandoverOpportunities += int(entry.get('totalNumberOfHandoverOpportunities',0))
                        totalNumberOfPrescriptionInCapitalLetters += int (entry.get('totalNumberOfPrescriptionInCapitalLetters',0))
                        totalNumberOfPrescriptionSampled += int (entry.get('totalNumberOfPrescriptionSampled',0))
                        numberOfStockOutEmergencyDrugs += int (entry.get('numberOfStockOutEmergencyDrugs',0))
                        numberOfPatientsDevelopingAdverseDrugReactions += int(entry.get('numberOfPatientsDevelopingAdverseDrugReactions',0))
                        numberOfInPatients += int(entry.get('numberOfInPatients',0))
                        numberOfUnplannedReturnToOTOrReexploration += int(entry.get('numberOfUnplannedReturnToOTOrReexploration',0))
                        numberOfSurgeriesWhereTheProcedureWasFollowed += int (entry.get('numberOfSurgeriesWhereTheProcedureWasFollowed',0))
                        numberOfSurgeriesPlannedInTheOt += int(entry.get('numberOfSurgeriesPlannedInTheOt',0))
                        numberOfPatientsWhoDidReceiveAppropriateProphylacticAntibiotic += int(entry.get('numberOfPatientsWhoDidReceiveAppropriateProphylacticAntibiotic',0))
                        numberOfCasesReScheduledOrCanceled += int(entry.get('numberOfCasesReScheduledOrCanceled',0))
                # Debugging: Print retrieved data
                # print("Retrieved data:", all_data)  

                # Calculate average time taken for initial assessment per admission
                average_time_taken = sumOfTimeTakenforInitialAssessment / totalNumberOfAdmissions if totalNumberOfAdmissions > 0 else 0
                numberOfReportingErrors1 = numberOfReportingErrors / numberOfTestsPerformed if numberOfTestsPerformed > 0 else 0
                adherencetosafety = numberOfStaffAdheringToSafety / numberOfStaffAudited if numberOfStaffAudited > 0 else 0
                transfusedreactions = numberOfTransfusionReactions / numberOfUnitsTransfused if numberOfUnitsTransfused > 0 else 0
                totalNumberOfMedicationErrors = totalNumberOfMedicationErrors / totalNumberOfOpportunitiesOfMedicationErrors if totalNumberOfOpportunitiesOfMedicationErrors > 0 else 0
                morality_ratio_ICU = actualDeathsInICU / predictedDeathsInICU if predictedDeathsInICU > 0 else 0
                ulcers_admission = numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer / totalNumberOfRestraintPatientsDays if totalNumberOfRestraintPatientsDays  > 0 else 0
                return_of_emergency = numberOfReturnsToEmergencyWithin72hoursWithSimilarPresentingComplaints/numberOfPatientsWhoHaveComeToTheEmergency if numberOfPatientsWhoHaveComeToTheEmergency >0 else 0
                catheterassociated_CDC_NHSN= numberOfUrinaryCatheterAssociatedUtisInThatMonth/numberOfUrinaryCatheterDaysInThatMonth if numberOfUrinaryCatheterDaysInThatMonth >0 else 0
                ventilatorassociated_CDC_NHSN=numberOfVentilatorAssociatedPneumonia/numberOfVentilatorDays if numberOfVentilatorDays > 0 else 0
                bloodstrea_CDC_NHSN=numberCentralLineAssociatedBloodStreamInfectionsInAMonth / numberOfCentralLineDaysInThatMonth if numberOfCentralLineDaysInThatMonth > 0 else 0
                surgicalCDCandNHSN=numberOfSurgicalSiteInfectionsInAGivenMonth / numberOfSurgeriesPlannedInTheOt if numberOfSurgeriesPlannedInTheOt > 0 else 0
                available_transfusion= sumOfTimeTakenForBloodAndBloodComponents / totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved if totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved > 0 else 0
                patient_ratio_icu=numberOfBedsOccupied / numberOfNursingStaff if  numberOfNursingStaff > 0 else 0
                time_taken_discharge= sumOfTimeTakenForDischarge / numberOfPatientsDischarged if numberOfPatientsDischarged > 0 else 0
                numberofdischargesanddeaths=(numberOfDischarge + Numberofdeath )
                incomplete_improper_constent= numberOfMedicalRecords / numberofdischargesanddeaths if numberofdischargesanddeaths >0 else 0
                waiting_time_diagnostics = waitingTimeForDiagnostics / numberOfPatientsReportedInDiagnostics if numberOfPatientsReportedInDiagnostics >0 else 0
                time_outpatient_consultation=sumTotalPatientInTimeForConsultation / numberOfOutPatients if numberOfOutPatients  > 0 else 0
                near_misses=numberOfNearMissReported / numberOfIncidentsReported if numberOfIncidentsReported > 0 else 0
                handovers_shift_change=totalNumberOfHandoversDoneAppropriately / totalNumberOfHandoverOpportunities if totalNumberOfHandoverOpportunities > 0 else 0                # Construct JSON response
                medication_prescription_capitals=totalNumberOfPrescriptionInCapitalLetters / totalNumberOfPrescriptionSampled if totalNumberOfPrescriptionSampled >0 else 0
                stock_outs_emergency_medications= numberOfStockOutEmergencyDrugs / 20 
                adverse_drug_reaction = numberOfPatientsDevelopingAdverseDrugReactions / numberOfInPatients if numberOfInPatients > 0 else 0
                unplanned_return_ot=numberOfUnplannedReturnToOTOrReexploration/numberOfSurgeriesWhereTheProcedureWasFollowed if numberOfSurgeriesWhereTheProcedureWasFollowed >0 else 0
                percentage_of_surgeries=numberOfSurgeriesWhereTheProcedureWasFollowed/numberOfSurgeriesPlannedInTheOt if numberOfSurgeriesPlannedInTheOt>0 else 0
                percentage_prophylacticAntibiotic=numberOfSurgeriesWhereTheProcedureWasFollowed/numberOfPatientsWhoDidReceiveAppropriateProphylacticAntibiotic if numberOfPatientsWhoDidReceiveAppropriateProphylacticAntibiotic >0 else 0
                re_scheduling_sugeries=numberOfCasesReScheduledOrCanceled/numberOfSurgeriesWhereTheProcedureWasFollowed if numberOfSurgeriesWhereTheProcedureWasFollowed >0 else 0                
                response_data = {
                    # 'data': list(all_data),
                    'totalNumberOfAdmissions': totalNumberOfAdmissions,
                    'timeTakenForInitialAssessment': sumOfTimeTakenforInitialAssessment,
                    'averagetimetakenperadmission': (int(average_time_taken)),
                    'numberOfTestsPerformed': numberOfTestsPerformed,
                    'numberOfReportingErrors': numberOfReportingErrors,
                    'numberOfReportingErrors1': numberOfReportingErrors1,
                    'numberOfStaffAdheringToSafety': numberOfStaffAdheringToSafety,
                    'numberOfStaffAudited': numberOfStaffAudited,
                    'adherencetosafety': adherencetosafety,
                    'totalNumberOfMedicationErrors': totalNumberOfMedicationErrors,
                    'totalNumberOfOpportunitiesOfMedicationErrors': totalNumberOfOpportunitiesOfMedicationErrors,
                    'totalNumberOfMedicationErrors': totalNumberOfMedicationErrors,
                    'numberOfTransfusionReactions': numberOfTransfusionReactions,
                    'numberOfUnitsTransfused': numberOfUnitsTransfused,
                    'transfusedreactions': transfusedreactions,
                    'actualDeathInICU': actualDeathsInICU,
                    'predictedDeathsInICU': predictedDeathsInICU,
                    'morality_ratio_ICU': morality_ratio_ICU,
                    "numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer": numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer,
                    "totalNumberOfRestraintPatientsDays": totalNumberOfRestraintPatientsDays,
                    "ulcers_admission": ulcers_admission,
                    'numberOfReturnsToEmergencyWithin72hoursWithSimilarPresentingComplaints':numberOfReturnsToEmergencyWithin72hoursWithSimilarPresentingComplaints,
                    "patientsToEmergency":numberOfPatientsWhoHaveComeToTheEmergency,
                    'return_of_emergency':return_of_emergency,
                    'numberOfUrinaryCatheterAssociatedUtisInThatMonth':numberOfUrinaryCatheterAssociatedUtisInThatMonth,
                    'numberOfUrinaryCatheterDaysInThatMonth':numberOfUrinaryCatheterDaysInThatMonth,
                    'catheterassociated_CDC_NHSN':catheterassociated_CDC_NHSN,
                    'numberOfVentilatorAssociatedPneumonia':numberOfVentilatorAssociatedPneumonia,
                    'numberOfVentilatorDays':numberOfVentilatorDays,
                    'ventilatorassociated_CDC_NHSN':ventilatorassociated_CDC_NHSN,
                    'numberCentralLineAssociatedBloodStreamInfectionsInAMonth':numberCentralLineAssociatedBloodStreamInfectionsInAMonth,
                    'numberOfCentralLineDaysInThatMonth':numberOfCentralLineDaysInThatMonth,
                    'bloodstrea_CDC_NHSN':bloodstrea_CDC_NHSN,
                    'numberOfSurgicalSiteInfectionsInAGivenMonth':numberOfSurgicalSiteInfectionsInAGivenMonth,
                    'numberOfSurgeriesPlannedInTheOt':numberOfSurgeriesPlannedInTheOt,
                    'surgicalCDCandNHSN':surgicalCDCandNHSN,
                    'sumOfTimeTakenForBloodAndBloodComponents':sumOfTimeTakenForBloodAndBloodComponents,
                    'totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved':totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved,
                    'available_transfusion':available_transfusion,
                    "numberOfNursingStaff":numberOfNursingStaff,
                    "numberOfBedsOccupied":numberOfBedsOccupied,
                    "patient_ratio_icu":patient_ratio_icu,
                    'sumOfTimeTakenForDischarge':sumOfTimeTakenForDischarge,
                    'numberOfPatientsDischarged':numberOfPatientsDischarged,
                    'time_taken_discharge':time_taken_discharge,
                    'numberOfMedicalRecords':numberOfMedicalRecords,
                    'numberofdischargesanddeaths':numberofdischargesanddeaths,
                    'incomplete_improper_constent':incomplete_improper_constent,
                    'waitingTimeForDiagnostics':waitingTimeForDiagnostics,
                    'numberOfPatientsReportedInDiagnostics':numberOfPatientsReportedInDiagnostics,
                    'waiting_time_diagnostics':waiting_time_diagnostics,
                    'sumTotalPatientInTimeForConsultation':sumTotalPatientInTimeForConsultation,
                    'numberOfOutPatients':numberOfOutPatients,
                    'time_outpatient_consultation':time_outpatient_consultation,
                    'numberOfNearMissReported':numberOfNearMissReported,
                    'numberOfIncidentsReported':numberOfIncidentsReported,
                    'near_misses':near_misses,
                    'totalNumberOfHandoversDoneAppropriately':totalNumberOfHandoversDoneAppropriately,
                    'totalNumberOfHandoverOpportunities':totalNumberOfHandoverOpportunities,
                    'handovers_shift_change':handovers_shift_change,
                    'totalNumberOfPrescriptionInCapitalLetters':totalNumberOfPrescriptionInCapitalLetters,
                    'totalNumberOfPrescriptionSampled':totalNumberOfPrescriptionSampled,
                    'medication_prescription_capitals':medication_prescription_capitals,
                    'numberOfStockOutEmergencyDrugs':numberOfStockOutEmergencyDrugs,
                    'stock_outs_emergency_medications':stock_outs_emergency_medications,
                    'numberOfPatientsDevelopingAdverseDrugReactions':numberOfPatientsDevelopingAdverseDrugReactions,
                    'numberOfInPatients':numberOfInPatients,
                    'adverse_drug_reaction':adverse_drug_reaction,
                    'numberOfUnplannedReturnToOTOrReexploration':numberOfUnplannedReturnToOTOrReexploration,
                    "numberOfSurgeriesWhereTheProcedureWasFollowed":numberOfSurgeriesWhereTheProcedureWasFollowed,
                    'unplanned_return_ot':unplanned_return_ot,
                    "numberOfSurgeriesWhereTheProcedureWasFollowed":numberOfSurgeriesWhereTheProcedureWasFollowed,
                    'plannedSurgeries':numberOfSurgeriesPlannedInTheOt,
                    'percentage_of_surgeries':percentage_of_surgeries,
                    'numberOfPatientsWhoDidReceiveAppropriateProphylacticAntibiotic':numberOfPatientsWhoDidReceiveAppropriateProphylacticAntibiotic,
                    'plannedSurgeries':numberOfSurgeriesPlannedInTheOt,
                    'percentage_prophylacticAntibiotic':percentage_prophylacticAntibiotic,
                    'rescheduledCases':numberOfCasesReScheduledOrCanceled,
                    'plannedSurgeries':numberOfSurgeriesPlannedInTheOt,
                    're_scheduling_sugeries':re_scheduling_sugeries
                }

                return JsonResponse(response_data, safe=False)
            except Exception as e:
                # Handle database errors
                return JsonResponse({'error': str(e)}, status=500)
        else:
            # Informative error message for missing parameters
            return JsonResponse({'error': 'Please select a year and month'}, status=400)
    else:
        # Error message for disallowed methods
        return JsonResponse({'error': 'Only GET requests are'})




    
