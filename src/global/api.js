// API configuration

// All APIs are wrapped in this frontend config file (numbered to match the API docs); with multiple environments you can switch every API site-wide at once instead of editing each page.
// Paths are relative to the page, so they work both with the Vite dev server (served from public/)
// and behind nginx, which proxies /static/*.json to the MongoDB-backed API.
const staticPath = import.meta.env.BASE_URL;

export const api = {
  'login': staticPath + 'static/userLogin.json',
  'home': staticPath + 'static/home.json',
  'department': staticPath + 'static/department.json',
  'patientList': staticPath + 'static/patientList.json',
  'doctor': staticPath + 'static/doctor/doctor.json',
  'complaintPatient': staticPath + 'static/doctor/complaintPatient.json',
  'shiftList': staticPath + 'static/doctor/shiftList.json',
  'staffFlow': staticPath + 'static/doctor/staffFlow.json',
  'Storage': staticPath + 'static/Storage.json',
  'putInStorage': staticPath + 'static/putInStorage.json',
  'stockRemoval': staticPath + 'static/stockRemoval.json',
  'complaints': staticPath + 'static/complaints.json',
  'patientCount': staticPath + 'static/patientCount.json',
  'staffIntroduction': staticPath + 'static/staffIntroduction.json',
  'complainInfo': staticPath + 'static/complainInfo.json',
  'hasNurse': staticPath + 'static/hasNurse.json',
  'table_shift': staticPath + 'static/table_shift.json',
  'turnOver': staticPath + 'static/turnOver.json',
  'drugs': staticPath + 'static/drugs.json',
  'registered': staticPath + 'static/doctor/registered.json',
  'trashy': staticPath + 'static/trashy.json',
  'provinces': staticPath + 'static/provinces.json',
  'patientList1': staticPath + 'static/patientList1.json'
};
