<template>
  <div class="addPersonalDate">
    <h1 class="employee-form-title">Ficha de datos del empleado</h1>
    <el-form :model="ruleForm" label-position="top" class="employee-form" ref="ruleForm">
      <section class="employee-form-section">
        <h3>Datos básicos del empleado</h3>
        <div class="employee-form-grid">
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Edad" prop="age">
          <el-input v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="Teléfono de contacto" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="Etnia" prop="nation">
          <el-input v-model="ruleForm.nation"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model="ruleForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="Teléfono de emergencia" prop="PHONE">
          <el-input v-model="ruleForm.PHONE"></el-input>
        </el-form-item>
        <el-form-item label="Lugar de empadronamiento" prop="registration">
          <el-input v-model="ruleForm.registration"></el-input>
        </el-form-item>
        <el-form-item label="Correo electrónico" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Número de DNI" prop="idCard">
          <el-input v-model="ruleForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="Altura" prop="height">
          <el-input v-model="ruleForm.height"></el-input>
        </el-form-item>
        <el-form-item label="Sexo" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio :label="1">Hombre</el-radio>
            <el-radio :label="2">Mujer</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Afiliación política" prop="politics">
          <el-input v-model="ruleForm.politics"></el-input>
        </el-form-item>
        </div>
      </section>
      <section class="employee-form-section">
        <h3>Formación académica</h3>
        <div class="employee-form-grid">
        <el-form-item label="Centro de estudios" prop="school">
          <el-input v-model="ruleForm.school"></el-input>
        </el-form-item>
        <el-form-item label="Carrera" prop="profession">
          <el-input v-model="ruleForm.profession"></el-input>
        </el-form-item>
        <el-form-item label="Fecha de graduación" prop="graduationTime" class="demonstration">
          <el-date-picker v-model="ruleForm.graduationTime" type="date" placeholder="Seleccione una fecha" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        </div>
      </section>
      <section class="employee-form-section">
        <h3>Certificados obtenidos</h3>
        <div class="employee-form-grid">
        <el-form-item label="Certificado obtenido" prop="getCertificate">
          <el-input v-model="ruleForm.getCertificate"></el-input>
        </el-form-item>
        <el-form-item label="Fecha de obtención" prop="getTime">
          <el-date-picker v-model="ruleForm.getTime" type="date" placeholder="Seleccione una fecha" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="N.º de certificado" prop="certificateNumber">
          <el-input v-model="ruleForm.certificateNumber"></el-input>
        </el-form-item>
        </div>
      </section>
      <section class="employee-form-section">
        <h3>Puesto actual</h3>
        <div class="employee-form-grid">
        <el-form-item label="Puesto actual" prop="job">
          <el-input v-model="ruleForm.job"></el-input>
        </el-form-item>
        <el-form-item label="Departamento" prop="department">
          <el-input v-model="ruleForm.department"></el-input>
        </el-form-item>
        <el-form-item label="Fecha de ingreso:" prop="hiredate">
          <el-date-picker v-model="ruleForm.hiredate" type="date" placeholder="Seleccione una fecha" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        </div>
      </section>
      <div class="employee-form-actions">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Crear ahora</el-button>
          <el-button @click="offReset">Restablecer</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        age: '',
        phone: '',
        nation: '',
        qq: '',
        PHONE: '',
        registration: '',
        email: '',
        height: '',
        sex: 2,
        politics: '',
        school: '',
        profession: '',
        graduationTime: '',
        getCertificate: '',
        getTime: '',
        certificateNumber: '',
        job: '',
        department: '',
        hiredate: ''
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now - 8.64e7;
        }
      }
    };
  },
  methods: {
    onSubmit () {
    },
    offReset () {
      this.ruleForm = {
        name: '',
        age: '',
        phone: '',
        nation: '',
        qq: '',
        PHONE: '',
        registration: '',
        email: '',
        height: '',
        sex: 2,
        politics: '',
        school: '',
        profession: '',
        graduationTime: '',
        getCertificate: '',
        getTime: '',
        certificateNumber: '',
        job: '',
        department: '',
        hiredate: ''
      };
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .addPersonalDate
    max-width:100%

    .employee-form-title
      margin:0 0 24px
      color:#263b4d
      font-size:24px
      font-weight:600
      text-align:center

    .employee-form-section
      margin-bottom:24px

      h3
        margin:0 0 16px
        color:#34495e
        font-size:17px
        font-weight:600

    .employee-form-grid
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

      .el-radio-group
        display:flex
        align-items:center
        min-height:40px
        gap:18px

    .employee-form-actions
      display:flex
      justify-content:center
      padding-top:8px

      .el-form-item
        margin:0 !important

      .el-form-item__content
        display:flex
        justify-content:center
        gap:10px
        margin-left:0 !important

  @media (max-width: 900px)
    .addPersonalDate .employee-form-grid
      grid-template-columns:repeat(2, minmax(0, 1fr))

  @media (max-width: 600px)
    .addPersonalDate .employee-form-grid
      grid-template-columns:minmax(0, 1fr)

    .addPersonalDate .employee-form-actions .el-form-item__content
      flex-wrap:wrap
</style>