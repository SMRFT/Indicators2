# urls.py
from django.urls import path
from . import views
from .views import registration,login,frontoffice_data,firstfloor_data,firstsuit_data,secondsuit_data,secondfloor_data,thirdfloor_data
from .views import lab_data,CT_data,MRI_data,Xray_data,OPD_data,OT_data,HR_data
from .views import physiotherapy_data,dialysis_data,OPPharmacy_data,IPPharmacy_data
from .views import emergency_room_data,MRD_data,recovery_ward_data,chemo_ward_data
from .views import firstfloor_rawdata,firstsuit_rawdata,secondfloor_rawdata,secondsuit_rawdata,thirdfloor_rawdata,recoveryward_rawdata
from .views import SICU_data,MICU_data,NICU_data,micu_rawdata,nicu_rawdata,sicu_rawdata,chemoward_rawdata,emergencyroom_rawdata
from .views import availabilityofroomsandbeds,get_export_data,update_export_data,get_export_rawdata,update_export_rawdata,get_formula_data

urlpatterns = [
    path('registration/',registration, name = 'registration'),
    path('login/', login, name = 'login'),
    path('FrontOffice/', frontoffice_data, name = 'frontoffice_data'),
    path('FirstFloor/', firstfloor_data, name = 'firstfloor_data'),
    path('FirstSuit/', firstsuit_data, name = 'firstsuit_data'),
    path('SecondFloor/', secondfloor_data, name = 'secondfloor_data'),
    path('SecondSuit/', secondsuit_data, name = 'secondsuit_data'),
    path('ThirdFloor/', thirdfloor_data, name = 'thirdfloor_data'),
    path('Lab/', lab_data, name = 'lab_data'),
    path('MRI/', MRI_data, name = 'MRI_data'),
    path('CT/', CT_data, name ='CT_data'),
    path('Xray/', Xray_data, name = 'Xray_data'),
    path('OPD/', OPD_data, name = 'OPD_data'),
    path('OT/', OT_data, name = 'OT_data'),
    path('HR/', HR_data, name = 'HR_data'),
    path('Physiotherapy/', physiotherapy_data, name = 'physiotherapy_data'),
    path('Dialysis/', dialysis_data, name = 'dialysis_data'),
    path('OPPharmacy/', OPPharmacy_data, name = 'OPPharmacy_data'),
    path('IPPharmacy/', IPPharmacy_data, name ='IPPharmacy_data'),
    path('EmergencyRoom/', emergency_room_data, name = 'emergency_room_data'),
    path('MRD/', MRD_data, name = 'MRD_data'),
    path('ChemoWard/', chemo_ward_data, name = 'chemo_ward_data'),
    path('RecoveryWard/', recovery_ward_data, name = 'recovery_ward_data'),
    path('SICU/', SICU_data, name = 'SICU_data'),
    path('NICU/', NICU_data, name = 'NICU_data'),
    path('MICU/', MICU_data, name = 'MICU_data'),
    path('FirstFloorRawData/', firstfloor_rawdata, name = 'FirstFloorRawData'),
    path('FirstSuitRawData/', firstsuit_rawdata, name = 'FirstSuitRawData'),
    path('SecondFloorRawData/', secondfloor_rawdata, name = 'SecondFloorRawData'),
    path('SecondSuitRawData/', secondsuit_rawdata, name = 'SecondSuitRawData'),
    path('ThirdFloorRawData/', thirdfloor_rawdata, name = 'ThirdFloorRawData'),
    path('SICURawData/', sicu_rawdata, name = 'SICURawData'),
    path('MICURawData/', micu_rawdata, name = 'MICURawData'),
    path('NICURawData/', nicu_rawdata, name = 'NICURawData'),
    path('EmergencyRoomRawData/', emergencyroom_rawdata, name = 'EmergencyRoomRawData'),
    path('RecoverywardRawData/', recoveryward_rawdata, name = 'RecoverywardRawData'),
    path('ChemowardRawData/', chemoward_rawdata, name = 'ChemowardRawData'),
    path('get-export-data/', get_export_data, name = 'get_export_data'),
    path('update-export-data/', update_export_data, name = 'update_export_data'),
    path('get_export_rawdata/', get_export_rawdata, name = 'get_export_rawdata'),
    path('update-export_rawdata/', update_export_rawdata, name = 'update_export_rawdata'),
    path('availabilityofroomsandbeds/<str:ward>/',availabilityofroomsandbeds, name = 'availabilityofroomsandbeds'),
    path('formula-data/',get_formula_data, name = 'get_formula_data'),

]