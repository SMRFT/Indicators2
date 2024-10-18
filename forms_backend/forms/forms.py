# forms.py
from django import forms
from rest_framework import serializers

from .models import Register
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = '__all__'


from .models import Login
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model =   Login
        fields = '__all__'


from .models import FrontOffice
class FrontOfficeSerializer(forms.ModelForm):
    class Meta:
        model = FrontOffice
        fields = '__all__'


from .models import FirstFloor
class FirstFloorSerializer(forms.ModelForm):
    class Meta:
        model = FirstFloor
        fields = '__all__'


from .models import SecondFloor
class SecondFloorSerializer(forms.ModelForm):
    class Meta:
        model = SecondFloor
        fields = '__all__'


from .models import ThirdFloor
class ThirdFloorSerializer(forms.ModelForm):
    class Meta:
        model = ThirdFloor
        fields = '__all__'

from .models import FirstSuit
class FirstSuitSerializer(forms.ModelForm):
    class Meta:
        model = FirstSuit
        fields = '__all__'


from .models import SecondSuit
class SecondSuitSerializer(forms.ModelForm):
    class Meta:
        model = SecondSuit
        fields = '__all__'


from .models import Lab
class LabSerializer(forms.ModelForm):
    class Meta:
        model = Lab
        fields = '__all__'


from .models import CT
class CTSerializer(forms.ModelForm):
    class Meta:
        model = CT
        fields = '__all__'


from .models import MRI
class MRISerializer(forms.ModelForm):
    class Meta:
        model = MRI
        fields = '__all__'


from .models import Xray
class XraySerializer(forms.ModelForm):
    class Meta:
        model = Xray
        fields = '__all__'


from .models import OPD
class OPDSerializer(forms.ModelForm):
    class Meta:
        model = OPD
        fields = '__all__'


from .models import OT
class OTSerializer(forms.ModelForm):
    class Meta:
        model = OT
        fields = '__all__'


from .models import HR
class HRSerializer(forms.ModelForm):
    class Meta:
        model = HR
        fields = '__all__'


from .models import Physiotherapy
class PhysiotherapySerializer(forms.ModelForm):
    class Meta:
        model = Physiotherapy
        fields = '__all__'


from .models import Dialysis
class DialysisSerializer(forms.ModelForm):
    class Meta:
        model = Dialysis
        fields = '__all__'


from .models import OPPharmacy
class OPPharmacySerializer(forms.ModelForm):
    class Meta:
        model = OPPharmacy
        fields = '__all__'


from .models import IPPharmacy
class IPPharmacySerializer(forms.ModelForm):
    class Meta:
        model = IPPharmacy
        fields = '__all__'


from .models import EmergencyRoom
class EmergencyRoomSerializer(forms.ModelForm):
    class Meta:
        model = EmergencyRoom
        fields = '__all__'


from .models import MRD
class MRDSerializer(forms.ModelForm):
    class Meta:
        model = MRD
        fields = '__all__'


from .models import ChemoWard
class ChemoWardSerializer(forms.ModelForm):
    class Meta:
        model = ChemoWard
        fields = '__all__'


from .models import RecoveryWard
class RecoveryWardSerializer(forms.ModelForm):
    class Meta:
        model = RecoveryWard
        fields = '__all__'


from .models import SICU
class SICUSerializer(forms.ModelForm):
    class Meta:
        model = SICU
        fields = '__all__'


from .models import MICU
class MICUSerializer(forms.ModelForm):
    class Meta:
        model = MICU
        fields = '__all__'


from .models import NICU
class NICUSerializer(forms.ModelForm):
    class Meta:
        model = NICU
        fields = '__all__'


from .models import FirstFloorRawData
class FirstFloorRawDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirstFloorRawData
        fields = '__all__'


from .models import FirstSuitRawData
class FirstSuitRawDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirstSuitRawData
        fields = '__all__'


from .models import SecondFloorRawData
class SecondFloorRawDataSerializer(forms.ModelForm):
    class Meta:
        model = SecondFloorRawData
        fields = '__all__'


from .models import SecondSuitRawData
class SecondSuitRawDataSerializer(forms.ModelForm):
    class Meta:
        model = SecondSuitRawData
        fields = '__all__'


from .models import ThirdFloorRawData
class ThirdFloorRawDataSerializer(forms.ModelForm):
    class Meta:
        model = ThirdFloorRawData
        fields = '__all__'


from .models import SICURawData
class SICURawDataSerializer(forms.ModelForm):
    class Meta:
        model = SICURawData
        fields = '__all__'


from .models import MICURawData
class MICURawDataSerializer(forms.ModelForm):
    class Meta:
        model = MICURawData
        fields = '__all__'


from .models import NICURawData
class NICURawDataSerializer(forms.ModelForm):
    class Meta:
        model = NICURawData
        fields = '__all__'


from .models import EmergencyRoomRawData
class EmergencyRoomRawDataSerializer(forms.ModelForm):
    class Meta:
        model = EmergencyRoomRawData
        fields = '__all__'


from .models import ChemoWardRawData
class ChemoWardRawDataSerializer(forms.ModelForm):
    class Meta:
        model = ChemoWardRawData
        fields = '__all__'


from .models import RecoverywardRawData
class RecoverywardRawDataSerializer(forms.ModelForm):
    class Meta:
        model = RecoverywardRawData
        fields = '__all__'


from .models import AvailabilityOfRoomsAndBeds
class AvailabilityOfRoomsAndBedsSerializer(forms.ModelForm):
    class Meta:
        model = AvailabilityOfRoomsAndBeds
        fields = "__all__"
