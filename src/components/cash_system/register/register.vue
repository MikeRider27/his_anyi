<template>
  <div class="register">
    <h1 class="register-title">Registro de cita</h1>
    <el-form :model="register" :rules="rules" ref="registerForm" label-position="top" class="register-ruleForm">
      <el-form-item label="Nombre del paciente" prop="patientName" class="register-name">
        <el-input v-model="register.patientName"></el-input>
      </el-form-item>
      <el-form-item label="Documento" prop="certificate_value" class="register-certificate">
        <el-select v-model="register.certificate_value" placeholder="Seleccione el documento">
          <el-option label="DNI" value="idCard"></el-option>
          <el-option label="Certificado de salud" value="healthCard"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="register.certificate_value === 'idCard'" label="Número de DNI" prop="cardNumber" class="register-name">
        <el-input v-model="register.cardNumber"></el-input>
      </el-form-item>
      <el-form-item v-else-if="register.certificate_value === 'healthCard'" label="Número de certificado de salud" prop="cardNumber" class="register-name">
        <el-input v-model="register.cardNumber"></el-input>
      </el-form-item>
      <el-form-item label="Departamento" prop="department_value">
        <el-select v-model="departmentvalue" placeholder="Seleccione el departamento">
          <el-option v-for="items in register.department" :key="items.value" :label="items.text " :value="items.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Médico" prop="doctor_value" class="register-certificate">
        <el-select v-model="register.doctor_value" placeholder="Seleccione el médico">
          <el-option v-for="items in register.doctor" :key="items.id" :label="items.name " :value="items.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="register.doctor_value" label="Hora de consulta" class="register-name">
        <span>{{ visit_date }} {{ visit_time }}</span>
      </el-form-item>
      <el-form-item v-if="register.doctor_value" label="Tarifa de registro" class="register-name">
        <span>{{ register.expense }} yuanes</span>
      </el-form-item>
      <div class="register-actions">
        <el-button type="reset" @click="resetForm('registerForm')">Restablecer</el-button>
        <el-button type="primary" class="submitBtn" @click="submitForm('registerForm')">Registrar cita</el-button>
      </div>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      // Validates the ID card number format
      let checkCertificate = (rule, value, callback) => {
        if (/^\d+$/.test(value) !== false) {
          if (value.length !== 18) {
            callback(new Error('¡El número de DNI debe tener 18 dígitos!'));
          } else {
            callback();
          }
        } else {
          callback(new Error('¡Introduzca un valor numérico!'));
        }
      };
      return {
        register: {
          patientName: '',
          certificate_value: '',
          cardNumber: '',
          department: [],
          doctor: [],
          doctor_value: '',
          visit_time: '',
          expense: '',
          visit_date: '',
          department_value: ''
        },
        departmentvalue: '',
        rules: {
          patientName: [
            { required: true, message: 'Introduzca el nombre del paciente', trigger: 'blur' }
          ],
          certificate_value: [
            { required: true, message: 'Seleccione el documento', trigger: 'change' }
          ],
          cardNumber: [
            {required: true, validator: checkCertificate, trigger: 'blur'}
          ],
          department_value: [
            { required: true, message: 'Seleccione al menos un departamento', trigger: 'change' }
          ],
          doctor_value: [
            { required: true, message: 'Seleccione un médico', trigger: 'change' }
          ],
          visit_time: [
            { required: true, message: 'Indique la forma de la actividad', trigger: 'blur' }
          ]
        }
      };
    },
    created () {
      this.visit_time = this.compute_visitTime();
      this.visit_date = new Date().toLocaleDateString();
      let registerThis = this;
      registerThis.$http.get(api.department).then((response) => {
        // Assign data fetched from the JSON API to the current object
        registerThis.register.department = response.data.department;
      }, response => {
        // error callback
        registerThis.$notify.error({
          message: 'Error al solicitar los datos'
        });
      });
    },
    methods: {
      submitForm (formName) {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            this.$message.error('No se puede registrar la cita: el servicio de guardado no está disponible.');
          } else {
            this.$notify.error({
              message: 'Error al enviar'
            });
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs.registerForm.resetFields();
        this.departmentvalue = '';
      },
      compute_visitTime () {
        var hour = new Date().getHours();
        var minutes = new Date().getMinutes();
        var time = '';
        if (hour < 11) {
          time = '8:00 - 11:30';
        } else if (hour === 11) {
          if (minutes < 30) {
            time = '8:00 - 11:30';
          }
        } else {
          time = '14:00 - 17:30';
        }
        return time;
      }
    },
    watch: {
      departmentvalue: function () {      // mark: Why can the watched property only be a string???
        let registerThis = this;
        registerThis.register.department_value = registerThis.departmentvalue;
        registerThis.$http.get(api.doctor).then((response) => {
          // Assign data fetched from the JSON API to the current object
          for (let i = 0; i < response.data.doctorlist.length; i++) {
            if (registerThis.departmentvalue === response.data.doctorlist[i].officeId) {
              registerThis.register.doctor = [];
              registerThis.register.doctor.push(response.data.doctorlist[i]);
              if (response.data.doctorlist[i].isexpert === 'yes') {
                registerThis.register.expense = 12;
              } else if (response.data.doctorlist[i].isexpert === 'no') {
                registerThis.register.expense = 8;
              }
            } else {
              registerThis.register.doctor_value = '';
            }
          }
        }, response => {
          // error callback
          registerThis.$notify.error({
            message: 'Error al solicitar los datos'
          });
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .register
    .register-title
      margin: 0 0 28px
      color: #203448
      font-weight: bold
      font-size: 24px
      text-align: left

    .register-ruleForm
      box-sizing: border-box
      display:grid
      grid-template-columns:repeat(2, minmax(0, 1fr))
      gap:8px 24px
      width:100%
      padding:0
      border:0
      border-radius:0
      background:transparent

      .el-form-item
        min-width:0
        margin-bottom:12px

      .el-select,
      .el-date-editor
        width: 100%

      .register-actions
        grid-column:1 / -1
        display:flex
        justify-content:flex-end
        gap:8px
        margin-top:4px

        .el-button + .el-button
          margin-left:0

  @media (max-width: 600px)
    .register
      .register-title
        font-size: 21px

      .register-ruleForm
        grid-template-columns:minmax(0, 1fr)
        padding: 20px 16px

        .register-actions
          justify-content:flex-start
</style>
