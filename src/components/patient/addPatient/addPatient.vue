<template>
  <div class="addPatient">
    <el-form :model="ruleForm" class="demo-ruleForm patient-form" ref="ruleForm" :rules="rules" label-position="top">
      <div class="patient-form-header">
        <h1 class="record">Nuevo expediente de paciente</h1>
        <el-form-item label="Fecha de alta del expediente">
          <el-date-picker v-model="ruleForm.date" type="date" placeholder="Seleccione una fecha" :picker-options="pickerOptions" prop="date"></el-date-picker>
        </el-form-item>
      </div>
      <section class="patient-form-section">
        <div class="patient-form-grid">
        <el-form-item label="Nombre del paciente" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Procedencia del paciente" prop="region">
          <el-select v-model="ruleForm.region" placeholder="Seleccione la procedencia">
            <el-option label="Registro de citas" value="guahao"></el-option>
            <el-option label="Consultas externas" value="menzhen"></el-option>
            <el-option label="Urgencias" value="jizhen"></el-option>
            <el-option label="Análisis" value="huayan"></el-option>
            <el-option label="Cirugía" value="shoushu"></el-option>
            <el-option label="Hospitalización" value="huayan"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Número de DNI" prop="idCard">
          <el-input v-model="ruleForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="Edad del paciente" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="Contacto" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input> 
        </el-form-item>
        <el-form-item label="Sexo del paciente" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio :label="1" label-width="150px">Hombre</el-radio>
            <el-radio :label="2" label-width="150px">Mujer</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Dirección" class="patient-address-item">
          <div class="patient-address-fields">
          <el-select v-model="selectProvince1" placeholder="Seleccione provincia">
            <el-option v-for="item in ruleForm.provinces" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="selectCity1" placeholder="Seleccione ciudad">
            <el-option v-for="item in ruleForm.citys" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-input v-model="ruleForm.moreAddress" placeholder="Dirección detallada"></el-input>
          </div>
        </el-form-item>
        </div>
      </section>
      <section class="patient-form-section">
        <h3>Datos de contacto</h3>
        <div class="patient-form-grid">
        <el-form-item label="Nombre del contacto" prop="Name">
          <el-input v-model="ruleForm.Name"></el-input>
        </el-form-item>
        <el-form-item label="Contacto" prop="Phone">
          <el-input v-model.number="ruleForm.Phone"></el-input>
        </el-form-item>
        <el-form-item label="Relación con el paciente" prop="relation">
          <el-select v-model="ruleForm.relation" placeholder="Relación con el paciente">
            <el-option label="Padre-hijo" value="1"></el-option>
            <el-option label="Padre-hija" value="2"></el-option>
            <el-option label="Madre-hijo" value="3"></el-option>
            <el-option label="Madre-hija" value="4"></el-option>
            <el-option label="Hermanos" value="5"></el-option>
            <el-option label="Hermanas" value="6"></el-option>
            <el-option label="Familiar" value="7"></el-option>
            <el-option label="Amigo(a)" value="8"></el-option>
            <el-option label="Tutor legal" value="9"></el-option>
            <el-option label="Otros" value="10"></el-option>
          </el-select>
        </el-form-item>
        </div>
      </section>
      <section class="patient-form-section">
        <h3>Información médica</h3>
        <div class="patient-form-grid">
          <el-form-item label="Estado de salud actual" prop="symptoms" class="patient-form-wide">
            <el-input type="textarea" v-model="ruleForm.symptoms"></el-input>
          </el-form-item>
          <el-form-item label="Breve descripción de los antecedentes" prop="illHistory" class="patient-form-wide">
            <el-input type="textarea" v-model="ruleForm.illHistory"></el-input>
          </el-form-item>
        </div>
      </section>
      <section class="patient-form-section">
        <h3>Datos del médico</h3>
        <div class="patient-form-grid">
        <el-form-item label="Nombre del médico responsable" prop="doctor">
          <el-input v-model="ruleForm.doctor"></el-input>
        </el-form-item>
        <el-form-item label="Departamento" prop="department">
          <el-select v-model="ruleForm.department" placeholder="Seleccione departamento">
            <el-option label="Cirugía" value="1"></el-option>
            <el-option label="Medicina Interna" value="2"></el-option>
            <el-option label="Ginecología y Obstetricia" value="3"></el-option>
            <el-option label="Traumatología" value="4"></el-option>
            <el-option label="Pediatría" value="5"></el-option>
            <el-option label="Otros" value="6"></el-option>
          </el-select>
        </el-form-item>
        </div>
      </section>
      <div class="patient-form-actions">
        <el-form-item class="center">
          <el-button type="primary" @click="onSubmit">Crear ahora</el-button>
          <el-button @click="offReset('ruleForm')">Restablecer</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
import {api} from '../../../global/api.js';
export default {
  data () {
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('La edad no puede estar vacía'));
      };
      setTimeout(() => {
        if (/^\d+$/.test(value) === false) {
          callback(new Error('Introduzca un valor numérico'));
        } else {
          callback();
        }
      }, 300);
    };
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('El nombre no puede estar vacío'));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('El teléfono no puede estar vacío'));
      };
      setTimeout(() => {
        if (/^\d+$/.test(value) === false) {
          callback(new Error('Introduzca un valor numérico'));
        } else if (value.length > 11) {
          callback(new Error('Introduzca un número válido'));
        } else {
          callback();
        }
      }, 500);
    };
    var checkidCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('El número de DNI no puede estar vacío'));
      };
      setTimeout(() => {
        if (/^(\w){6,20}$/.test(value) === false) {
          callback(new Error('Introduzca un número de DNI válido'));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      ruleForm: {
        date: '',
        name: '',
        region: '',
        idCard: '',
        sex: 2,
        age: '',
        phone: '',
        Name: '',
        Phone: '',
        relation: '',
        address: '',
        provinces: [],
        citys: [],
        moreAddress: '',
        symptoms: '',
        illHistory: '',
        doctor: '',
        department: ''
      },
      selectProvince1: '',
      selectCity1: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now - 8.64e7;
        }
      },
      rules: {
        name: [
          { required: true, validator: checkName, trigger: 'blur' }
        ],
        age: [
          { required: true, validator: checkAge, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],
        region: [
          { required: true, trigger: 'blur' }
        ],
        idCard: [
          { required: true, validator: checkidCard, trigger: 'blur' }
        ],
        sex: [
          { required: true, trigger: 'blur' }
        ]
      }
    };
  },
  mounted () {
    let me = this;
    me.$http.get(api.provinces).then(function (response) {
      me.ruleForm.provinces = response.data.provinces;
    }, function (response) {
      me.$message.error('No se pudo cargar la información de direcciones. Inténtalo de nuevo más tarde.');
    });
  },
  methods: {
    onSubmit () {
      // let me = this;
      // this.$http.post('../../static/patient/addPatient.json').then(function (response) {
      //   me.ruleForm = me.data.ruleForm;
      // }, function (response) {
      // });
    },
    offReset (form) {
      this.$refs[form].resetFields();
      this.ruleForm.date = '';
      this.ruleForm.moreAddress = '';
      this.selectProvince1 = '';
      this.selectCity1 = '';
    }
  },
  watch: {
    selectProvince1: function () {
      for (let i = 0; i < this.ruleForm.provinces.length; i++) {
        if (this.selectProvince1 === this.ruleForm.provinces[i].value) {
          this.ruleForm.citys = this.ruleForm.provinces[i].citys;
        }
      }
    }
  }
};
</script>
<!-- <script src="https://unpkg.com/vue"></script> -->
<style lang="stylus" rel="stylesheet/stylus">
  .addPatient
    max-width:100%

    .patient-form
      padding-bottom:0

    .patient-form-header
      display:flex
      align-items:flex-end
      justify-content:space-between
      gap:24px
      margin-bottom:24px
      padding-bottom:20px
      border-bottom:1px solid #e8eef2

      .record
        margin:0
        color:#263b4d
        font-size:24px
        line-height:1.3

      .el-form-item
        flex:0 1 280px
        margin:0 !important

    .patient-form-section
      margin-bottom:24px

      h3
        margin:0 0 16px
        color:#34495e
        font-size:17px
        font-weight:600

    .patient-form-grid
      display:grid
      grid-template-columns:repeat(3, minmax(0, 1fr))
      gap:16px 24px

      .el-form-item
        min-width:0
        margin:0 !important

      .el-form-item__label
        float:none
        width:100% !important
        padding:0 0 6px
        line-height:1.4
        text-align:left
        white-space:normal

      .el-form-item__content
        min-width:0
        margin-left:0 !important

      .el-input,
      .el-select,
      .el-date-editor
        width:100%

      .el-textarea__inner
        min-height:96px

      .patient-form-wide,
      .patient-address-item
        grid-column:1 / -1

      .patient-address-fields
        display:grid
        grid-template-columns:repeat(3, minmax(0, 1fr))
        gap:10px

      .el-radio-group
        display:flex
        align-items:center
        min-height:40px
        gap:18px

    .patient-form-actions
      display:flex
      justify-content:center
      padding-top:8px

      .el-form-item
        margin:0 !important

      .el-form-item__content
        margin-left:0 !important

  @media (max-width: 900px)
    .addPatient .patient-form-grid
      grid-template-columns:repeat(2, minmax(0, 1fr))

  @media (max-width: 600px)
    .addPatient
      .patient-form-header
        align-items:stretch
        flex-direction:column
        gap:14px

        .el-form-item
          flex-basis:auto

      .patient-form-grid
        grid-template-columns:minmax(0, 1fr)

        .patient-address-fields
          grid-template-columns:minmax(0, 1fr)

      .patient-form-actions .el-form-item__content
        display:flex
        flex-wrap:wrap
        justify-content:center
        gap:8px
</style>
