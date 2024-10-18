# models.py
from django.db import models

class Register(models.Model):
    id = models.CharField(max_length=500,primary_key=True)
    name = models.CharField(max_length=500)
    department = models.CharField(max_length=500)
    role = models.CharField(max_length=500)
    email = models.EmailField(max_length=500, unique=True)
    password = models.CharField(max_length=500)


class Login(models.Model):
    username = models.CharField(max_length=150)
    password = models.CharField(max_length=120)


class FrontOffice(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    sumTotalPatientInTimeForConsultation = models.CharField(max_length=100)
    NumberOfOutPatients = models.CharField(max_length=100)
    OutPatientECHS = models.CharField(max_length=100)
    OutPatientESI = models.CharField(max_length=100)
    OutPatientRailway = models.CharField(max_length=100)
    OutPatientTNCM = models.CharField(max_length=100)
    OutPatientPAY = models.CharField(max_length=100)
    totalNumberOfOutPatients = models.CharField(max_length=100)
    InPatientECHS = models.CharField(max_length=100)
    InPatientESI = models.CharField(max_length=100)
    InPatientRailway = models.CharField(max_length=100)
    InPatientTNCM = models.CharField(max_length=100)
    InPatientPAY = models.CharField(max_length=100)
    totalNumberOfInPatients = models.CharField(max_length=100)
    MRI = models.CharField(max_length=100)
    CT = models.CharField(max_length=100)
    USG = models.CharField(max_length=100)
    ECHO = models.CharField(max_length=100)
    LAB = models.CharField(max_length=100)
    Xray = models.CharField(max_length=100)
    sumOfTotalPatientReportingtime = models.CharField(max_length=100)
    DialysisInsurance = models.CharField(max_length=100)
    DialysisPay = models.CharField(max_length=100)
    DialysisTotal = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='Front Office', blank=True, null=True)
    def __str__(self):
        return f"Front Office Data: {self.selectedDate}"
    

class FirstFloor(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    sumOfTimeTakenforInitialAssessment = models.CharField(max_length=100)
    totalNumberOfAdmissions = models.CharField(max_length=100)
    numberOfBedsOccupied = models.CharField(max_length=100)
    numberOfInPatients = models.CharField(max_length=100)
    numberOfPatientsDischarged = models.CharField(max_length=100)
    sumOfTimeTakenForDischarge = models.CharField(max_length=100)
    totalNumberOfMedicationErrors = models.CharField(max_length=100)
    totalNumberOfMedicationErrorsRemarks = models.CharField(max_length=1200)
    totalNumberOfOpportunitiesOfMedicationErrors = models.CharField(max_length=100)
    numberOfMedicationChartsReviewed = models.CharField(max_length=100)
    numberOfMedicationChartsReviewedRemarks = models.CharField(max_length=1200)
    numberOfPatientsDevelopingAdverseDrugReactions = models.CharField(max_length=100)
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks = models.CharField(max_length=1200)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer = models.CharField(max_length=100)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks = models.CharField(max_length=1200)
    numberOfPatientFalls = models.CharField(max_length=100)
    numberOfPatientFallsRemarks = models.CharField(max_length=1200)
    numberOfTransfusionReaction = models.CharField(max_length=100)
    numberOfTransfusionReactionRemarks = models.CharField(max_length=1200)
    numberOfUnitsTransfused = models.CharField(max_length=100)
    numberOfUnitsTransfusedRemarks = models.CharField(max_length=1200)
    sumOfTimeTakenForBloodAndBloodComponents = models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonth = models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks = models.CharField(max_length=1200)
    numberOfUrinaryCatheterDaysInThatMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks = models.CharField(max_length=1200)
    numberOfCentralLineDaysInThatMonth = models.CharField(max_length=100),
    numberOfSurgicalSiteInfectionsInAGivenMonth = models.CharField(max_length=100)
    numberOfSurgicalSiteInfectionsInAGivenMonthRemarks = models.CharField(max_length=1200)
    totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved = models.CharField(max_length=100)
    numberOfNearMissReported = models.CharField(max_length=100)
    numberOfNearMissReportedRemarks = models.CharField(max_length=1200)
    numberOfIncidentsReported = models.CharField(max_length=100)
    numberOfIncidentsReportedRemarks = models.CharField(max_length=1200)
    numberOfNursingStaff = models.CharField(max_length=100)
    totalNumberOfHandoversDoneAppropriately = models.CharField(max_length=100)
    totalNumberOfHandoverOpportunities = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulation = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulationRemarks = models.CharField(max_length=1200)
    totalNumberOfRestraintPatientsDays = models.CharField(max_length=100)
    totalNumberOfRestraintPatientsDaysRemarks = models.CharField(max_length=1200)
    numberOfPatientsOnIVTherapy = models.CharField(max_length=100)
    totalNumberOfPatientWhoDevelopsphlebitisOrExtravasation = models.CharField(max_length=100)
    totalNumberOfPatientWhoDevelopsphlebitisOrExtravasationRemarks = models.CharField(max_length=1200)
    numberOfParenteralExposures = models.CharField(max_length=100)
    numberOfParenteralExposuresRemarks = models.CharField(max_length=1200)
    ward = models.CharField(max_length=100, default='First Floor', blank=True, null=True)
    def __str__(self):
        return f"First Floor Data: {self.selectedDate}"
    

class SecondFloor(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    sumOfTimeTakenforInitialAssessment = models.CharField(max_length=100)
    totalNumberOfAdmissions = models.CharField(max_length=100)
    numberOfBedsOccupied = models.CharField(max_length=100)
    numberOfInPatients = models.CharField(max_length=100)
    numberOfPatientsDischarged = models.CharField(max_length=100)
    sumOfTimeTakenForDischarge = models.CharField(max_length=100)
    totalNumberOfMedicationErrors = models.CharField(max_length=100)
    totalNumberOfMedicationErrorsRemarks = models.CharField(max_length=1200)
    totalNumberOfOpportunitiesOfMedicationErrors = models.CharField(max_length=100)
    numberOfMedicationChartsReviewed = models.CharField(max_length=100)
    numberOfMedicationChartsReviewedRemarks = models.CharField(max_length=1200)
    numberOfPatientsDevelopingAdverseDrugReactions = models.CharField(max_length=100)
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks = models.CharField(max_length=1200)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer = models.CharField(max_length=100)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks = models.CharField(max_length=1200)
    numberOfPatientFalls = models.CharField(max_length=100)
    numberOfPatientFallsRemarks = models.CharField(max_length=1200)
    numberOfTransfusionReaction = models.CharField(max_length=100)
    numberOfTransfusionReactionRemarks = models.CharField(max_length=1200)
    numberOfUnitsTransfused = models.CharField(max_length=100)
    numberOfUnitsTransfusedRemarks = models.CharField(max_length=1200)
    sumOfTimeTakenForBloodAndBloodComponents = models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonth = models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks = models.CharField(max_length=1200)
    numberOfUrinaryCatheterDaysInThatMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks = models.CharField(max_length=1200)
    numberOfCentralLineDaysInThatMonth = models.CharField(max_length=100),
    numberOfSurgicalSiteInfectionsInAGivenMonth = models.CharField(max_length=100)
    numberOfSurgicalSiteInfectionsInAGivenMonthRemarks = models.CharField(max_length=1200)
    totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved = models.CharField(max_length=100)
    numberOfNearMissReported = models.CharField(max_length=100)
    numberOfNearMissReportedRemarks = models.CharField(max_length=1200)
    numberOfIncidentsReported = models.CharField(max_length=100)
    numberOfIncidentsReportedRemarks = models.CharField(max_length=1200)
    numberOfNursingStaff = models.CharField(max_length=100)
    totalNumberOfHandoversDoneAppropriately = models.CharField(max_length=100)
    totalNumberOfHandoverOpportunities = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulation = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulationRemarks = models.CharField(max_length=1200)
    totalNumberOfRestraintPatientsDays = models.CharField(max_length=100)
    totalNumberOfRestraintPatientsDaysRemarks = models.CharField(max_length=1200)
    numberOfPatientsOnIVTherapy = models.CharField(max_length=100)
    totalNumberOfPatientWhoDevelopsphlebitisOrExtravasation = models.CharField(max_length=100)
    totalNumberOfPatientWhoDevelopsphlebitisOrExtravasationRemarks = models.CharField(max_length=1200)
    numberOfParenteralExposures = models.CharField(max_length=100)
    numberOfParenteralExposuresRemarks = models.CharField(max_length=1200)
    ward = models.CharField(max_length=100, default='Second Floor', blank=True, null=True)
    def __str__(self):
        return f"Second Floor Data: {self.ward}"
    
    
class ThirdFloor(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    sumOfTimeTakenforInitialAssessment = models.CharField(max_length=100)
    totalNumberOfAdmissions = models.CharField(max_length=100)
    numberOfBedsOccupied = models.CharField(max_length=100)
    numberOfInPatients = models.CharField(max_length=100)
    numberOfPatientsDischarged = models.CharField(max_length=100)
    sumOfTimeTakenForDischarge = models.CharField(max_length=100)
    totalNumberOfMedicationErrors = models.CharField(max_length=100)
    totalNumberOfMedicationErrorsRemarks = models.CharField(max_length=1200)
    totalNumberOfOpportunitiesOfMedicationErrors = models.CharField(max_length=100)
    numberOfMedicationChartsReviewed = models.CharField(max_length=100)
    numberOfMedicationChartsReviewedRemarks = models.CharField(max_length=1200)
    numberOfPatientsDevelopingAdverseDrugReactions = models.CharField(max_length=100)
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks = models.CharField(max_length=1200)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer = models.CharField(max_length=100)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks = models.CharField(max_length=1200)
    numberOfPatientFalls = models.CharField(max_length=100)
    numberOfPatientFallsRemarks = models.CharField(max_length=1200)
    numberOfTransfusionReaction = models.CharField(max_length=100)
    numberOfTransfusionReactionRemarks = models.CharField(max_length=1200)
    numberOfUnitsTransfused = models.CharField(max_length=100)
    numberOfUnitsTransfusedRemarks = models.CharField(max_length=1200)
    sumOfTimeTakenForBloodAndBloodComponents = models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonth = models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks = models.CharField(max_length=1200)
    numberOfUrinaryCatheterDaysInThatMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks = models.CharField(max_length=1200)
    numberOfCentralLineDaysInThatMonth = models.CharField(max_length=100),
    numberOfSurgicalSiteInfectionsInAGivenMonth = models.CharField(max_length=100)
    numberOfSurgicalSiteInfectionsInAGivenMonthRemarks = models.CharField(max_length=1200)
    totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved = models.CharField(max_length=100)
    numberOfNearMissReported = models.CharField(max_length=100)
    numberOfNearMissReportedRemarks = models.CharField(max_length=1200)
    numberOfIncidentsReported = models.CharField(max_length=100)
    numberOfIncidentsReportedRemarks = models.CharField(max_length=1200)
    numberOfNursingStaff = models.CharField(max_length=100)
    totalNumberOfHandoversDoneAppropriately = models.CharField(max_length=100)
    totalNumberOfHandoverOpportunities = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulation = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulationRemarks = models.CharField(max_length=1200)
    totalNumberOfRestraintPatientsDays = models.CharField(max_length=100)
    totalNumberOfRestraintPatientsDaysRemarks = models.CharField(max_length=1200)
    numberOfPatientsOnIVTherapy = models.CharField(max_length=100)
    totalNumberOfPatientWhoDevelopsphlebitisOrExtravasation = models.CharField(max_length=100)
    totalNumberOfPatientWhoDevelopsphlebitisOrExtravasationRemarks = models.CharField(max_length=1200)
    numberOfParenteralExposures = models.CharField(max_length=100)
    numberOfParenteralExposuresRemarks = models.CharField(max_length=1200)
    ward = models.CharField(max_length=100, default='Third Floor', blank=True, null=True)
    def __str__(self):
        return f"Third Floor Data: {self.selectedDate}"
    

class FirstSuit(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    sumOfTimeTakenforInitialAssessment = models.CharField(max_length=100)
    totalNumberOfAdmissions = models.CharField(max_length=100)
    numberOfBedsOccupied = models.CharField(max_length=100)
    numberOfInPatients = models.CharField(max_length=100)
    numberOfPatientsDischarged = models.CharField(max_length=100)
    sumOfTimeTakenForDischarge = models.CharField(max_length=100)
    totalNumberOfMedicationErrors = models.CharField(max_length=100)
    totalNumberOfMedicationErrorsRemarks = models.CharField(max_length=1200)
    totalNumberOfOpportunitiesOfMedicationErrors = models.CharField(max_length=100)
    numberOfMedicationChartsReviewed = models.CharField(max_length=100)
    numberOfMedicationChartsReviewedRemarks = models.CharField(max_length=1200)
    numberOfPatientsDevelopingAdverseDrugReactions = models.CharField(max_length=100)
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks = models.CharField(max_length=1200)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer = models.CharField(max_length=100)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks = models.CharField(max_length=1200)
    numberOfPatientFalls = models.CharField(max_length=100)
    numberOfPatientFallsRemarks = models.CharField(max_length=1200)
    numberOfTransfusionReaction = models.CharField(max_length=100)
    numberOfTransfusionReactionRemarks = models.CharField(max_length=1200)
    numberOfUnitsTransfused = models.CharField(max_length=100)
    numberOfUnitsTransfusedRemarks = models.CharField(max_length=1200)
    sumOfTimeTakenForBloodAndBloodComponents = models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonth = models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks = models.CharField(max_length=1200)
    numberOfUrinaryCatheterDaysInThatMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks = models.CharField(max_length=1200)
    numberOfCentralLineDaysInThatMonth = models.CharField(max_length=100),
    numberOfSurgicalSiteInfectionsInAGivenMonth = models.CharField(max_length=100)
    numberOfSurgicalSiteInfectionsInAGivenMonthRemarks = models.CharField(max_length=1200)
    totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved = models.CharField(max_length=100)
    numberOfNearMissReported = models.CharField(max_length=100)
    numberOfNearMissReportedRemarks = models.CharField(max_length=1200)
    numberOfIncidentsReported = models.CharField(max_length=100)
    numberOfIncidentsReportedRemarks = models.CharField(max_length=1200)
    numberOfNursingStaff = models.CharField(max_length=100)
    totalNumberOfHandoversDoneAppropriately = models.CharField(max_length=100)
    totalNumberOfHandoverOpportunities = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulation = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulationRemarks = models.CharField(max_length=1200)
    totalNumberOfRestraintPatientsDays = models.CharField(max_length=100)
    totalNumberOfRestraintPatientsDaysRemarks = models.CharField(max_length=1200)
    numberOfPatientsOnIVTherapy = models.CharField(max_length=100)
    totalNumberOfPatientWhoDevelopsphlebitisOrExtravasation = models.CharField(max_length=100)
    totalNumberOfPatientWhoDevelopsphlebitisOrExtravasationRemarks = models.CharField(max_length=1200)
    numberOfParenteralExposures = models.CharField(max_length=100)
    numberOfParenteralExposuresRemarks = models.CharField(max_length=1200)
    ward = models.CharField(max_length=100, default='First Suit', blank=True, null=True)
    def __str__(self):
        return f"First Suit Data: {self.selectedDate}"
    

class SecondSuit(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    sumOfTimeTakenforInitialAssessment = models.CharField(max_length=100)
    totalNumberOfAdmissions = models.CharField(max_length=100)
    numberOfBedsOccupied = models.CharField(max_length=100)
    numberOfInPatients = models.CharField(max_length=100)
    numberOfPatientsDischarged = models.CharField(max_length=100)
    sumOfTimeTakenForDischarge = models.CharField(max_length=100)
    totalNumberOfMedicationErrors = models.CharField(max_length=100)
    totalNumberOfMedicationErrorsRemarks = models.CharField(max_length=1200)
    totalNumberOfOpportunitiesOfMedicationErrors = models.CharField(max_length=100)
    numberOfMedicationChartsReviewed = models.CharField(max_length=100)
    numberOfMedicationChartsReviewedRemarks = models.CharField(max_length=1200)
    numberOfPatientsDevelopingAdverseDrugReactions = models.CharField(max_length=100)
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks = models.CharField(max_length=1200)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer = models.CharField(max_length=100)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks = models.CharField(max_length=1200)
    numberOfPatientFalls = models.CharField(max_length=100)
    numberOfPatientFallsRemarks = models.CharField(max_length=1200)
    numberOfTransfusionReaction = models.CharField(max_length=100)
    numberOfTransfusionReactionRemarks = models.CharField(max_length=1200)
    numberOfUnitsTransfused = models.CharField(max_length=100)
    numberOfUnitsTransfusedRemarks = models.CharField(max_length=1200)
    sumOfTimeTakenForBloodAndBloodComponents = models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonth = models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks = models.CharField(max_length=1200)
    numberOfUrinaryCatheterDaysInThatMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks = models.CharField(max_length=1200)
    numberOfCentralLineDaysInThatMonth = models.CharField(max_length=100),
    numberOfSurgicalSiteInfectionsInAGivenMonth = models.CharField(max_length=100)
    numberOfSurgicalSiteInfectionsInAGivenMonthRemarks = models.CharField(max_length=1200)
    totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved = models.CharField(max_length=100)
    numberOfNearMissReported = models.CharField(max_length=100)
    numberOfNearMissReportedRemarks = models.CharField(max_length=1200)
    numberOfIncidentsReported = models.CharField(max_length=100)
    numberOfIncidentsReportedRemarks = models.CharField(max_length=1200)
    numberOfNursingStaff = models.CharField(max_length=100)
    totalNumberOfHandoversDoneAppropriately = models.CharField(max_length=100)
    totalNumberOfHandoverOpportunities = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulation = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulationRemarks = models.CharField(max_length=1200)
    totalNumberOfRestraintPatientsDays = models.CharField(max_length=100)
    totalNumberOfRestraintPatientsDaysRemarks = models.CharField(max_length=1200)
    numberOfPatientsOnIVTherapy = models.CharField(max_length=100)
    totalNumberOfPatientWhoDevelopsphlebitisOrExtravasation = models.CharField(max_length=100)
    totalNumberOfPatientWhoDevelopsphlebitisOrExtravasationRemarks = models.CharField(max_length=1200)
    numberOfParenteralExposures = models.CharField(max_length=100)
    numberOfParenteralExposuresRemarks = models.CharField(max_length=1200)
    ward = models.CharField(max_length=100, default='Second Suit', blank=True, null=True)
    def __str__(self):
        return f"Second Suit Data: {self.selectedDate}"
    

class Lab(models.Model):
    id = models.CharField(max_length=100)  
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    numberOfReportingErrors = models.CharField(max_length=100)
    numberOfReportingErrorsRemarks = models.CharField(max_length=1200)
    numberOfTestsPerformed = models.CharField(max_length=100)
    numberOfStaffAdheringToSafety = models.CharField(max_length=100)
    numberOfStaffAudited = models.CharField(max_length=100)
    waitingTimeForDiagnostics = models.CharField(max_length=100)
    numberOfPatientsReportedInDiagnostics = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='Lab', blank=True, null=True)
    def __str__(self):
        return f"Lab Data: {self.selectedDate}"
    

class CT(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    numberOfReportingErrors = models.CharField(max_length=100)
    numberOfReportingErrorsRemarks = models.CharField(max_length=1200)
    numberOfCasePerformed = models.CharField(max_length=100)
    numberOfTestsPerformed = models.CharField(max_length=100)
    numberOfStaffAdheringToSafety = models.CharField(max_length=100)
    numberOfStaffAudited = models.CharField(max_length=100)
    waitingTimeForDiagnostics = models.CharField(max_length=100)
    numberOfPatientsReportedInDiagnostics = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='CT', blank=True, null=True)
    def __str__(self):
        return f"CT Data: {self.selectedDate}"


class MRI(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    numberOfReportingErrors = models.CharField(max_length=100)
    numberOfReportingErrorsRemarks = models.CharField(max_length=1200)
    numberOfCasePerformed = models.CharField(max_length=100)
    numberOfTestsPerformed = models.CharField(max_length=100)
    numberOfStaffAdheringToSafety = models.CharField(max_length=100)
    numberOfStaffAudited = models.CharField(max_length=100)
    waitingTimeForDiagnostics = models.CharField(max_length=100)
    numberOfPatientsReportedInDiagnostics = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='MRI', blank=True, null=True)
    def __str__(self):
        return f"MRI Data: {self.selectedDate}"
    

class Xray(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    numberOfReportingErrors = models.CharField(max_length=100)
    numberOfReportingErrorsRemarks = models.CharField(max_length=1200)
    numberOfCasePerformed = models.CharField(max_length=100)
    numberOfTestsPerformed = models.CharField(max_length=100)
    numberOfStaffAdheringToSafety = models.CharField(max_length=100)
    numberOfStaffAudited = models.CharField(max_length=100)
    waitingTimeForDiagnostics = models.CharField(max_length=100)
    numberOfPatientsReportedInDiagnostics = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='X-Ray', blank=True, null=True)
    def __str__(self):
        return f"Xray Data: {self.selectedDate}"
    

class OPD(models.Model):
        id = models.CharField(max_length=100)
        name = models.CharField(max_length=100)
        selectedDate = models.CharField(max_length=100,primary_key=True)
        sumOfTimeTakenforInitialAssessment = models.CharField(max_length=100)
        sumOfTimeTakenForConsultation = models.CharField(max_length=100)
        totalNumberOfOutPatients = models.CharField(max_length=100)
        ward = models.CharField(max_length=100, default='OPD', blank=True, null=True)
        def __str__(self):
            return f"OPD Data: {self.selectedDate}"
        
        
class OT(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    numberOfUnplannedReturnToOTOrReexploration = models.CharField(max_length=100)
    numberOfUnplannedReturnToOTOrReexplorationRemarks = models.CharField(max_length=1200)
    numberOfPatientsWhoUnderwentSurgeriesInTheOT = models.CharField(max_length=100)
    numberOfSurgeriesWhereTheProcedureWasFollowed = models.CharField(max_length=100)
    numberOfSurgeriesPlannedInTheOt = models.CharField(max_length=100)
    numberOfTransfusionReactions = models.CharField(max_length=100)
    numberOfTransfusionReactionsRemarks = models.CharField(max_length=1200)
    numberOfUnitsTransfused = models.CharField(max_length=100)
    numberOfUnitsTransfusedRemarks = models.CharField(max_length=1200)
    timeTakenForReceivingBloodFromBloodBank = models.CharField(max_length=100)
    numberOfPatientsWhoDidReceiveAppropriateProphylacticAntibiotic = models.CharField(max_length=100)
    numberOfCasesReScheduledOrCanceled = models.CharField(max_length=100)
    numberOfCasesReScheduledOrCanceledRemarks = models.CharField(max_length=1200)
    numberOfSurgicalSiteInfections = models.CharField(max_length=100)
    numberOfSurgeriesWhereProceduresWereFollowed = models.CharField(max_length=100)
    numberOfDayCareOPCases = models.CharField(max_length=100)
    numberOfDayCareIPCases = models.CharField(max_length=100)
    numberOfMinorCases = models.CharField(max_length=100)
    numberOfParenteralExposures = models.CharField(max_length=100)
    numberOfParenteralExposuresRemarks = models.CharField(max_length=1200)
    ward = models.CharField(max_length=100, default='OT', blank=True, null=True)
    def __str__(self):
        return f"{self.selectedDate} - {self.totalPatients} Patients"


class HR(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    numberOfAbsenteeism = models.CharField(max_length=100)
    numberOfNewJoinees = models.CharField(max_length=100)
    totalNumberOfStaffNursing = models.CharField(max_length=100)
    totalNumberOfPharamedicalStaff = models.CharField(max_length=100)
    totalNumberOfDoctors = models.CharField(max_length=100)
    totalNumberOfAdminStaff = models.CharField(max_length=100)
    totalNumberOfHouseKeepingStaff = models.CharField(max_length=100)
    numberOfStaffLeftTheOrganization = models.CharField(max_length=100)
    totalNumberOfStaff = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='HR', blank=True, null=True)
    def __str__(self):
        return f"HR Data: {self.selectedDate}"
    
    
class Physiotherapy(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    numberOfInPatients = models.CharField(max_length=100)
    numberOfOutPatients = models.CharField(max_length=100)
    totalCases = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='Physiotherapy', blank=True, null=True)

    def __str__(self):
        return f"Physiotherapy Data: {self.selectedDate}"
    
 
class Dialysis(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    numberOfInPatients = models.CharField(max_length=100)
    numberOfOutPatients = models.CharField(max_length=100)
    totalCases = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='Dialysis', blank=True, null=True)
    def __str__(self):
        return f"Dialysis Data: {self.selectedDate}"


class OPPharmacy(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    numberOfStockOutEmergencyDrugs = models.CharField(max_length=100)
    numberOfStockOutEmergencyDrugsRemarks = models.CharField(max_length=1200)
    totalNumberOfPrescriptionInCapitalLetters = models.CharField(max_length=100)
    totalNumberOfPrescriptionSampled = models.CharField(max_length=100)
    totalNumberOfOutPatientPrescriptionReceived = models.CharField(max_length=100)
    totalNumberOfInpatientPrescriptionReceived = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='OPPharmacy', blank=True, null=True)
    def __str__(self):
        return f"OPPharmacy Data: {self.selectedDate}"


class IPPharmacy(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    numberOfStockOutEmergencyDrugs = models.CharField(max_length=100)
    numberOfStockOutEmergencyDrugsRemarks = models.CharField(max_length=1200)
    totalNumberOfPrescriptionInCapitalLetters = models.CharField(max_length=100)
    totalNumberOfPrescriptionSampled = models.CharField(max_length=100)
    totalNumberOfOutPatientPrescriptionReceived = models.CharField(max_length=100)
    totalNumberOfInpatientPrescriptionReceived = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='IPPharmacy', blank=True, null=True)
    def __str__(self):
        return f"IPPharmacy Data: {self.selectedDate}"
    
    
class EmergencyRoom(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    sumOfTimeTakenforInitialAssessment = models.CharField(max_length=100)
    numberOfReturnsToEmergencyWithin72hoursWithSimilarPresentingComplaints = models.CharField(max_length=100)
    numberOfReturnsToEmergencyWithin72hoursWithSimilarPresentingComplaintsRemarks = models.CharField(max_length=1200)
    numberOfPatientsWhoHaveComeToTheEmergency = models.CharField(max_length=100)
    totalNumberOfSurgicalSiteInfectionInAGivenMonth = models.CharField(max_length=100)
    totalNumberOfSurgicalSiteInfectionInAGivenMonthRemarks = models.CharField(max_length=1200)
    numberOfParenteralExposures = models.CharField(max_length=100)
    numberOfParenteralExposuresRemarks = models.CharField(max_length=1200)
    numberOfIncidents = models.CharField(max_length=100)
    numberOfIncidentsRemarks = models.CharField(max_length=1200)
    ward = models.CharField(max_length=100, default='ER', blank=True, null=True)
    def __str__(self):
        return f"Emergency Room Data: {self.selectedDate}"
    
    
class MRD(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    numberOfMedicalRecords = models.CharField(max_length=100)
    numberOfDischarge = models.CharField(max_length=100)
    numberOfDeath = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='MRD', blank=True, null=True)
    def __str__(self):
        return f"MRD Data: {self.selectedDate}"
    

class ChemoWard(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    sumOfTimeTakenforInitialAssessment = models.CharField(max_length=100)
    totalNumberOfAdmissions = models.CharField(max_length=100)
    numberOfBedsOccupied = models.CharField(max_length=100)
    numberOfPatientsDischarged = models.CharField(max_length=100)
    numberOfInPatients = models.CharField(max_length=100)
    sumOfTimeTakenForDischarge = models.CharField(max_length=100)
    totalNumberOfMedicationErrors = models.CharField(max_length=100)
    totalNumberOfMedicationErrorsRemarks = models.CharField(max_length=1200)
    totalNumberOfOpportunitiesOfMedicationErrors = models.CharField(max_length=100)
    numberOfMedicationChartsWithErrorProneAbbreviation = models.CharField(max_length=100)
    numberOfMedicationChartsWithErrorProneAbbreviationRemarks = models.CharField(max_length=1200)
    numberOfMedicationChartsReviewed = models.CharField(max_length=100)
    numberOfPatientsDevelopingAdverseDrugReactions = models.CharField(max_length=100)
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks = models.CharField(max_length=1200)
    numberOfUnitsTransfused = models.CharField(max_length=100)
    numberOfUnitsTransfusedRemarks = models.CharField(max_length=1200)
    numberOfTransfusionReaction = models.CharField(max_length=100)
    numberOfTransfusionReactionRemarks = models.CharField(max_length=1200)
    sumOfTimeTakenForBloodAndBloodComponents = models.CharField(max_length=100)
    totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved = models.CharField(max_length=100)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer = models.CharField(max_length=100)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks = models.CharField(max_length=1200)
    numberOfUrinaryCatheterAssociatedUtisInThatMonth = models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks = models.CharField(max_length=1200)
    numberOfUrinaryCatheterDaysInThatMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks = models.CharField(max_length=1200)
    numberOfCentralLineDaysInThatMonth = models.CharField(max_length=100)
    numberOfSurgicalSiteInfectionsInAGivenMonth = models.CharField(max_length=100)
    numberOfSurgicalSiteInfectionsInAGivenMonthRemarks = models.CharField(max_length=1200)
    numberOfNursingStaff = models.CharField(max_length=100)
    numberOfPatientFalls = models.CharField(max_length=100)
    numberOfPatientFallsRemarks = models.CharField(max_length=1200)
    numberOfNearMissReported = models.CharField(max_length=100)
    numberOfNearMissReportedRemarks = models.CharField(max_length=100)
    numberOfIncidentsReported = models.CharField(max_length=100)
    numberOfIncidentsReportedRemarks = models.CharField(max_length=1200)
    numberOfParenteralExposures= models.CharField(max_length=100)
    numberOfParenteralExposuresRemarks = models.CharField(max_length=1200)
    totalNumberOfHandoversDoneAppropriately = models.CharField(max_length=100)
    totalNumberOfHandoverOpportunities = models.CharField(max_length=100)
    totalNumberOfPatientsDevelopingPhlebitis = models.CharField(max_length=100)
    totalnumberOfPatientsDevelopingPhlebitisRemarks = models.CharField(max_length=1200)
    numberOfRestraintInjuriesOrStrangulation = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulationRemarks = models.CharField(max_length=1200)
    totalNumberOfRestraintPatientsDays = models.CharField(max_length=100)
    numberOfPatientsOnIVTherapy = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='Chemo Ward', blank=True, null=True)
    def __str__(self):
        return f"Chemo Ward Data: {self.selectedDate}"
    
    
class RecoveryWard(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    sumOfTimeTakenforInitialAssessment = models.CharField(max_length=100)
    totalNumberOfAdmissions = models.CharField(max_length=100)
    numberOfBedsOccupied = models.CharField(max_length=100)
    totalNumberOfMedicationErrors = models.CharField(max_length=100)
    totalNumberOfMedicationErrorsRemarks = models.CharField(max_length=1200)
    numberOfPatientsDevelopingAdverseDrugReactions = models.CharField(max_length=100)
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks = models.CharField(max_length=1200)
    numberOfNursingStaff = models.CharField(max_length=100)
    numberOfPatientFalls = models.CharField(max_length=100)
    numberOfPatientFallsRemarks = models.CharField(max_length=1200)
    numberOfUnitsTransfused = models.CharField(max_length=100)
    numberOfUnitsTransfusedRemarks = models.CharField(max_length=1200)
    numberOfTransfusionReaction = models.CharField(max_length=100)
    numberOfTransfusionReactionRemarks = models.CharField(max_length=1200)
    totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved = models.CharField(max_length=100)
    sumOfTimeTakenForBloodAndBloodComponents = models.CharField(max_length=100)
    numberOfCentralLineDaysInThatMonth = models.CharField(max_length=100)
    numberOfNearMissReported = models.CharField(max_length=100)
    numberOfNearMissReportedRemarks = models.CharField(max_length=1200)
    numberOfIncidentsReported = models.CharField(max_length=100)
    numberOfParenteralExposures = models.CharField(max_length=100)
    numberOfParenteralExposuresRemarks = models.CharField(max_length=1200)
    totalNumberOfHandoversDoneAppropriately = models.CharField(max_length=100)
    totalNumberOfHandoverOpportunities = models.CharField(max_length=100),
    totalNumberOfPatientsDevelopingPhlebitis = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulation = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='Recovery ward', blank=True, null=True)
    def __str__(self):
        return f"Recovery ward Data: {self.selectedDate}"

class SICU(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    sumOfTimeTakenforInitialAssessment= models.CharField(max_length=100)
    totalNumberOfAdmissions = models.CharField(max_length=100)
    numberOfBedsOccupied = models.CharField(max_length=100)
    numberOfPatientsDischarged = models.CharField(max_length=100)
    numberOfInPatients = models.CharField(max_length=100)
    sumOfTimeTakenForDischarge = models.CharField(max_length=100)
    totalNumberOfMedicationErrors = models.CharField(max_length=100)
    totalNumberOfMedicationErrorsRemarks = models.CharField(max_length=1200)
    totalNumberOfOpportunitiesOfMedicationErrors = models.CharField(max_length=100)
    numberOfMedicationChartsWithErrorProneAbbreviation = models.CharField(max_length=100)
    numberOfMedicationChartsWithErrorProneAbbreviationRemarks = models.CharField(max_length=1200)
    numberOfMedicationChartsReviewed = models.CharField(max_length=100)
    numberOfMedicationChartsReviewedRemarks = models.CharField(max_length=1200)
    numberOfPatientsDevelopingAdverseDrugReactions = models.CharField(max_length=100)
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks = models.CharField(max_length=1200)
    numberOfTransfusionReaction = models.CharField(max_length=100)
    numberOfTransfusionReactionRemarks = models.CharField(max_length=1200)
    numberOfUnitsTransfused = models.CharField(max_length=100)
    numberOfUnitsTransfusedRemarks = models.CharField(max_length=1200)
    sumOfTimeTakenForBloodAndBloodComponents = models.CharField(max_length=100)
    totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved = models.CharField(max_length=100)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer = models.CharField(max_length=100)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks = models.CharField(max_length=1200)
    numberOfUrinaryCatheterAssociatedUtisInThatMonth= models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks = models.CharField(max_length=1200)
    numberOfUrinaryCatheterDaysInThatMonth = models.CharField(max_length=100)
    numberOfUrinaryCatheterDaysInThatMonthRemarks = models.CharField(max_length=1200)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks = models.CharField(max_length=1200)
    numberOfCentralLineDaysInThatMonth = models.CharField(max_length=100)
    numberOfSurgicalSiteInfectionsInAGivenMonth = models.CharField(max_length=100)
    numberOfSurgicalSiteInfectionsInAGivenMonthRemarks = models.CharField(max_length=1200)
    numberOfNursingStaff = models.CharField(max_length=100)
    numberOfPatientFalls = models.CharField(max_length=100)
    numberOfPatientFallsRemarks = models.CharField(max_length=1200)
    numberOfNearMissReported = models.CharField(max_length=100)
    numberOfNearMissReportedRemarks = models.CharField(max_length=1200)
    numberOfIncidentsReported = models.CharField(max_length=100)
    numberOfIncidentsReportedRemarks = models.CharField(max_length=1200)
    numberOfParenteralExposures = models.CharField(max_length=100)
    numberOfParenteralExposuresRemarks = models.CharField(max_length=1200)
    totalNumberOfHandoversDoneAppropriately = models.CharField(max_length=100)
    totalNumberOfHandoverOpportunities = models.CharField(max_length=100)
    totalNumberOfPatientsDevelopingPhlebitis = models.CharField(max_length=100)
    totalNumberOfPatientsDevelopingPhlebitisRemarks = models.CharField(max_length=1200)
    numberOfRestraintInjuriesOrStrangulation = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulationRemarks = models.CharField(max_length=1200)
    totalNumberOfRestraintPatientsDays = models.CharField(max_length=100)
    numberOfPatientsOnIVTherapy = models.CharField(max_length=100)
    ward = models.CharField(max_length=100, default='SICU', blank=True, null=True)
    def __str__(self):
        return f"SICU Data: {self.selectedDate}"
    

class MICU(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    sumOfTimeTakenforInitialAssessment= models.CharField(max_length=100)
    totalNumberOfAdmissions = models.CharField(max_length=100)
    numberOfBedsOccupied = models.CharField(max_length=100)
    numberOfPatientsDischarged = models.CharField(max_length=100)
    numberOfInPatients = models.CharField(max_length=100)
    sumOfTimeTakenForDischarge = models.CharField(max_length=100)
    totalNumberOfMedicationErrors = models.CharField(max_length=100)
    totalNumberOfMedicationErrorsRemarks = models.CharField(max_length=1200)
    totalNumberOfOpportunitiesOfMedicationErrors = models.CharField(max_length=100)
    numberOfMedicationChartsWithErrorProneAbbreviation = models.CharField(max_length=100)
    numberOfMedicationChartsWithErrorProneAbbreviationRemarks = models.CharField(max_length=1200)
    numberOfMedicationChartsReviewed = models.CharField(max_length=100)
    numberOfMedicationChartsReviewedRemarks = models.CharField(max_length=1200)
    numberOfPatientsDevelopingAdverseDrugReactions = models.CharField(max_length=100)
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks = models.CharField(max_length=1200)
    numberOfTransfusionReaction = models.CharField(max_length=100)
    numberOfTransfusionReactionRemarks = models.CharField(max_length=1200)
    numberOfUnitsTransfused = models.CharField(max_length=100)
    numberOfUnitsTransfusedRemarks = models.CharField(max_length=1200)
    sumOfTimeTakenForBloodAndBloodComponents = models.CharField(max_length=100)
    totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved = models.CharField(max_length=100)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer = models.CharField(max_length=100)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks = models.CharField(max_length=1200)
    numberOfUrinaryCatheterAssociatedUtisInThatMonth= models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks = models.CharField(max_length=1200)
    numberOfUrinaryCatheterDaysInThatMonth = models.CharField(max_length=100)
    numberOfUrinaryCatheterDaysInThatMonthRemarks = models.CharField(max_length=1200)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks = models.CharField(max_length=1200)
    numberOfCentralLineDaysInThatMonth = models.CharField(max_length=100)
    numberOfSurgicalSiteInfectionsInAGivenMonth = models.CharField(max_length=100)
    numberOfSurgicalSiteInfectionsInAGivenMonthRemarks = models.CharField(max_length=1200)
    numberOfNursingStaff = models.CharField(max_length=100)
    numberOfPatientFalls = models.CharField(max_length=100)
    numberOfPatientFallsRemarks = models.CharField(max_length=1200)
    numberOfNearMissReported = models.CharField(max_length=100)
    numberOfNearMissReportedRemarks = models.CharField(max_length=1200)
    numberOfIncidentsReported = models.CharField(max_length=100)
    numberOfIncidentsReportedRemarks = models.CharField(max_length=1200)
    numberOfParenteralExposures = models.CharField(max_length=100)
    numberOfParenteralExposuresRemarks = models.CharField(max_length=1200)
    totalNumberOfHandoversDoneAppropriately = models.CharField(max_length=100)
    totalNumberOfHandoverOpportunities = models.CharField(max_length=100)
    totalNumberOfPatientsDevelopingPhlebitis = models.CharField(max_length=100)
    totalNumberOfPatientsDevelopingPhlebitisRemarks = models.CharField(max_length=1200)
    numberOfRestraintInjuriesOrStrangulation = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulationRemarks = models.CharField(max_length=1200)
    actualDeathsInICU = models.CharField(max_length=100)
    actualDeathsInICURemarks = models.CharField(max_length=1200)
    predictedDeathsInICU = models.CharField(max_length=100)
    numberOfVentilatorAssociatedPneumonia = models.CharField(max_length=100)
    numberOfVentilatorAssociatedPneumoniaRemarks = models.CharField(max_length=1200)
    totalNumberOfRestraintPatientsDays = models.CharField(max_length=100)
    numberOfPatientsOnIVTherapy = models.CharField(max_length=100)
    incidentsOfDelining = models.CharField(max_length=100)
    incidentsOfDeliningRemarks = models.CharField(max_length=1200)
    ward = models.CharField(max_length=100, default='MICU', blank=True, null=True)
    def __str__(self):
        return f"MICU Data: {self.selectedDate}"
    

class NICU(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    sumOfTimeTakenforInitialAssessment= models.CharField(max_length=100)
    totalNumberOfAdmissions = models.CharField(max_length=100)
    numberOfBedsOccupied = models.CharField(max_length=100)
    numberOfPatientsDischarged = models.CharField(max_length=100)
    numberOfInPatients = models.CharField(max_length=100)
    sumOfTimeTakenForDischarge = models.CharField(max_length=100)
    totalNumberOfMedicationErrors = models.CharField(max_length=100)
    totalNumberOfMedicationErrorsRemarks = models.CharField(max_length=1200)
    totalNumberOfOpportunitiesOfMedicationErrors = models.CharField(max_length=100)
    numberOfMedicationChartsWithErrorProneAbbreviation = models.CharField(max_length=100)
    numberOfMedicationChartsWithErrorProneAbbreviationRemarks = models.CharField(max_length=1200)
    numberOfMedicationChartsReviewed = models.CharField(max_length=100)
    numberOfMedicationChartsReviewedRemarks = models.CharField(max_length=1200)
    numberOfPatientsDevelopingAdverseDrugReactions = models.CharField(max_length=100)
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks = models.CharField(max_length=1200)
    numberOfTransfusionReaction = models.CharField(max_length=100)
    numberOfTransfusionReactionRemarks = models.CharField(max_length=500)
    numberOfUnitsTransfused = models.CharField(max_length=100)
    numberOfUnitsTransfusedRemarks = models.CharField(max_length=500)
    sumOfTimeTakenForBloodAndBloodComponents = models.CharField(max_length=100)
    totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved = models.CharField(max_length=100)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer = models.CharField(max_length=100)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks = models.CharField(max_length=1200)
    numberOfUrinaryCatheterAssociatedUtisInThatMonth= models.CharField(max_length=100)
    numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks = models.CharField(max_length=1200)
    numberOfUrinaryCatheterDaysInThatMonth = models.CharField(max_length=100)
    numberOfUrinaryCatheterDaysInThatMonthRemarks = models.CharField(max_length=1200)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonth = models.CharField(max_length=100)
    numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks = models.CharField(max_length=1200)
    numberOfCentralLineDaysInThatMonth = models.CharField(max_length=100)
    numberOfSurgicalSiteInfectionsInAGivenMonth = models.CharField(max_length=100)
    numberOfSurgicalSiteInfectionsInAGivenMonthRemarks = models.CharField(max_length=1200)
    numberOfNursingStaff = models.CharField(max_length=100)
    numberOfPatientFalls = models.CharField(max_length=100)
    numberOfPatientFallsRemarks = models.CharField(max_length=1200)
    numberOfNearMissReported = models.CharField(max_length=100)
    numberOfNearMissReportedRemarks = models.CharField(max_length=1200)
    numberOfIncidentsReported = models.CharField(max_length=100)
    numberOfIncidentsReportedRemarks = models.CharField(max_length=1200)
    numberOfParenteralExposures = models.CharField(max_length=100)
    numberOfParenteralExposuresRemarks = models.CharField(max_length=1200)
    totalNumberOfHandoversDoneAppropriately = models.CharField(max_length=100)
    totalNumberOfHandoverOpportunities = models.CharField(max_length=100)
    totalNumberOfPatientsDevelopingPhlebitis = models.CharField(max_length=100)
    totalNumberOfPatientsDevelopingPhlebitisRemarks = models.CharField(max_length=1200)
    numberOfRestraintInjuriesOrStrangulation = models.CharField(max_length=100)
    numberOfRestraintInjuriesOrStrangulationRemarks = models.CharField(max_length=1200)
    numberOfCasesheetsWhereNursingCarePlanIsDocumented = models.CharField(max_length=100)
    actualDeathsInICU = models.CharField(max_length=100)
    actualDeathsInICURemarks = models.CharField(max_length=1200)
    predictedDeathsInICU = models.CharField(max_length=100)
    numberOfVentilatorAssociatedPneumonia = models.CharField(max_length=100)
    numberOfVentilatorAssociatedPneumoniaRemarks = models.CharField(max_length=1200)
    totalNumberOfRestraintPatientsDays = models.CharField(max_length=100)
    numberOfVentilatorDays = models.CharField(max_length=100)
    numberOfPatientsOnIVTherapy = models.CharField(max_length=100)
    incidentsOfDelining = models.CharField(max_length=100)
    incidentsOfDeliningRemarks = models.CharField(max_length=1200)
    ward = models.CharField(max_length=100, default='NICU', blank=True, null=True)
    def __str__(self):
        return f"NICU Data: {self.selectedDate}"


class FirstFloorRawData(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    raw_data = models.JSONField()
    ward = models.CharField(max_length=100, default='First Floor Raw Data', blank=True, null=True)
    def __str__(self):
        return f"FirstFloor RawData for {self.selectedDate}"
    

class FirstSuitRawData(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    raw_data = models.JSONField()
    ward = models.CharField(max_length=100, default='First Suit Raw Data', blank=True, null=True)
    def __str__(self):
        return f"FirstSuit RawData for {self.selectedDate}"


class SecondFloorRawData(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    raw_data = models.JSONField()
    ward = models.CharField(max_length=100, default='Second Floor Raw Data', blank=True, null=True)
    def __str__(self):
        return f"SecondFloor RawData for {self.selectedDate}"
    

class SecondSuitRawData(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    raw_data = models.JSONField()
    ward = models.CharField(max_length=100, default='Second Suit Raw Data', blank=True, null=True)
    def __str__(self):
        return f"SecondSuit RawData for {self.selectedDate}"
    

class ThirdFloorRawData(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    raw_data = models.JSONField()
    ward = models.CharField(max_length=100, default='Third Floor Raw Data', blank=True, null=True)
    def __str__(self):
        return f"ThirdFloor RawData for {self.selectedDate}"
    

class SICURawData(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    raw_data = models.JSONField()
    ward = models.CharField(max_length=100, default='SICU Raw Data', blank=True, null=True)
    def __str__(self):
        return f"SICU RawData for {self.selectedDate}"
    

class MICURawData(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    raw_data = models.JSONField()
    ward = models.CharField(max_length=100, default='MICU Raw Data', blank=True, null=True)
    def __str__(self):
        return f"MICU RawData for {self.selectedDate}"
    
    
class NICURawData(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    raw_data = models.JSONField()
    ward = models.CharField(max_length=100, default='NICU Raw Data', blank=True, null=True)
    def __str__(self):
        return f"NICU RawData for {self.selectedDate}"
    

class EmergencyRoomRawData(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    raw_data = models.JSONField()
    ward = models.CharField(max_length=100, default='EmergencyRoom Raw Data', blank=True, null=True)
    def __str__(self):
        return f"EmergencyRoom RawData for {self.selectedDate}"
    

class ChemoWardRawData(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    raw_data = models.JSONField()
    ward = models.CharField(max_length=100, default='ChemoWard Raw Data', blank=True, null=True)
    def __str__(self):
        return f"ChemoWard RawData for {self.selectedDate}"
    

class RecoverywardRawData(models.Model):
    id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    selectedDate = models.CharField(max_length=100,primary_key=True)
    raw_data = models.JSONField()
    ward = models.CharField(max_length=100, default='Recoveryward Raw Data', blank=True, null=True)
    def __str__(self):
        return f"Recoveryward RawData for {self.selectedDate}"
    

class AvailabilityOfRoomsAndBeds(models.Model):
    selectedward = models.CharField(max_length=100)
    numberOfBedsOccupied = models.CharField(max_length=100)
    numberOfAvailability = models.CharField(max_length=100)
    def __str__(self):
        return f"Availability Of Rooms And Beds: {self.selectedward}"

