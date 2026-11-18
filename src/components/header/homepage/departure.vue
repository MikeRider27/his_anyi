<template>
  <div class="departure">
    <h1 class="departure-form-title">Solicitud de baja del empleado</h1>
    <el-form :model="ruleForm" label-position="top" class="departure-form" ref="ruleForm">
      <section class="departure-form-section">
        <h2>Datos básicos del empleado</h2>
        <div class="departure-form-grid">
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Equipo/departamento" prop="department">
          <el-input v-model="ruleForm.department"></el-input>
        </el-form-item>
        <el-form-item label="Cargo/puesto" prop="jobs">
          <el-input v-model="ruleForm.jobs"></el-input>
        </el-form-item>
        <el-form-item label="Fecha de ingreso" prop="hiredate" class="demonstration">
          <el-date-picker v-model="ruleForm.hiredate" type="date" placeholder="Seleccione una fecha" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="Fecha de baja" prop="leaveDate">
          <el-date-picker v-model="ruleForm.leaveDate" type="date" placeholder="Seleccione una fecha" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="Formación" prop="education">
          <el-input v-model="ruleForm.education"></el-input>
        </el-form-item>
        </div>
      </section>
      <section class="departure-form-section">
        <h2>Tipo de baja</h2>
        <el-checkbox-group v-model="ruleForm.category" :min="1" :max="1" class="departure-type-options">
          <el-checkbox label="Dimisión"></el-checkbox>
          <el-checkbox label="Despido"></el-checkbox>
          <el-checkbox label="Expulsión"></el-checkbox>
          <el-checkbox label="Abandono voluntario"></el-checkbox>
          <el-checkbox label="Fin de contrato"></el-checkbox>
          <el-checkbox label="Otros"></el-checkbox>
        </el-checkbox-group>
      </section>
      <section class="departure-form-section">
        <h2>Datos de la baja</h2>
        <div class="departure-form-grid">
        <el-form-item label="Fecha solicitada de baja" prop="applicationTime" class="demonstration">
          <el-date-picker v-model="ruleForm.applicationTime" type="date" placeholder="Seleccione una fecha" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="Fecha aprobada de baja" prop="approvedTime">
          <el-date-picker v-model="ruleForm.approvedTime" type="date" placeholder="Seleccione una fecha" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="Motivo de la baja" prop="reason">
          <el-input v-model="ruleForm.reason"></el-input>
        </el-form-item>
        <p class="departure-declaration">
          Por voluntad propia rescindo la relación laboral con el Hospital Anyi; desde la fecha de firma ninguna de mis acciones guarda relación con el Hospital Anyi y asumo mi propia responsabilidad.
          <span>Firma: ______________________</span>
        </p>
        </div>
      </section>
      <section class="departure-form-section">
        <h2>Aprobación</h2>
        <div class="departure-form-grid">
        <el-form-item label="Firma del jefe de departamento" prop="departmentManager">
          <el-input v-model="ruleForm.departmentManager"></el-input>
        </el-form-item>
        <el-form-item label="Firma del director" prop="director">
          <el-input v-model="ruleForm.director"></el-input>
        </el-form-item>
        <p class="departure-note">Nota: este formulario se aprueba nivel por nivel según las competencias de RR. HH.</p>
        </div>
      </section>
      <div class="departure-form-actions">
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
        department: '',
        jobs: '',
        hiredate: '',
        leaveDate: '',
        organization: '',
        education: '',
        category: [],
        departments: '',
        applicationTime: '',
        approvedTime: '',
        reason: '',
        departmentManager: '',
        director: ''
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
      // let me = this;
      // this.$http.post(api.addPatient).then(function (response) {
      //   me.ruleForm = me.data.ruleForm;
      // }, function (response) {
      // });
    },
    offReset () {
      this.ruleForm = {
        name: '',
        department: '',
        jobs: '',
        hiredate: '',
        leaveDate: '',
        organization: '',
        education: '',
        category: [],
        departments: '',
        applicationTime: '',
        approvedTime: '',
        reason: '',
        departmentManager: '',
        director: ''
      };
    }

  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .departure
    max-width:100%

    .departure-form-title
      margin:0 0 24px
      color:#263b4d
      font-size:24px
      font-weight:600
      text-align:center

    .departure-form-section
      margin-bottom:24px

      h2
        margin:0 0 16px
        color:#34495e
        font-size:18px
        font-weight:600

    .departure-form-grid
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
      .el-date-editor
        width:100%

    .departure-type-options
      display:grid
      grid-template-columns:repeat(3, minmax(0, 1fr))
      gap:12px 18px

      .el-checkbox
        display:flex
        align-items:flex-start
        min-width:0
        margin:0
        white-space:normal

      .el-checkbox__label
        white-space:normal
        line-height:1.4

    .departure-declaration,
    .departure-note
      grid-column:1 / -1
      margin:0
      padding:14px 16px
      border-radius:8px
      background:#f5f8fa
      color:#526779
      line-height:1.55

    .departure-declaration span
      display:block
      margin-top:10px
      color:#34495e
      font-weight:600

    .departure-form-actions
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
    .departure
      .departure-form-grid,
      .departure-type-options
        grid-template-columns:repeat(2, minmax(0, 1fr))

  @media (max-width: 600px)
    .departure
      .departure-form-grid,
      .departure-type-options
        grid-template-columns:minmax(0, 1fr)

      .departure-form-actions .el-form-item__content
        flex-wrap:wrap
</style>